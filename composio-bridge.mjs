#!/usr/bin/env node
/**
 * Composio bridge — task-scoped, authenticated.
 *
 * IMPORTANT: COMPOSIO_API_KEY is NOT in your environment by design.
 * This script is the ONLY authorised path to Composio for this task.
 * Do NOT attempt to call Composio directly or search for an API key.
 *
 * Usage:
 *   node ./composio-bridge.mjs manifest
 *   node ./composio-bridge.mjs search "keyword"
 *   node ./composio-bridge.mjs schema TOOL_SLUG [TOOL_SLUG...]
 *   node ./composio-bridge.mjs execute TOOL_SLUG '{"key":"value"}'
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

function usage() {
  const name = path.basename(process.argv[1] || "composio-bridge.mjs");
  console.error([
    `Usage:`,
    `  ${name} manifest`,
    `  ${name} search <query>`,
    `  ${name} schema TOOL_SLUG [TOOL_SLUG...]`,
    `  ${name} execute TOOL_SLUG '{"key":"value"}'`,
  ].join("\n"));
  process.exit(2);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const command = args.shift();
  if (command !== "manifest" && command !== "search" && command !== "schema" && command !== "execute") usage();
  if (command === "manifest") return { command, values: [] };
  if (args.length === 0) usage();
  return { command, values: args };
}

function printJson(value) {
  process.stdout.write(JSON.stringify(value, null, 2) + "\n");
}

function fallbackManifest() {
  const hasTaskContext = Boolean(process.env.J5AF_BRIDGE_TASK_ID);
  const hasCliContext = Boolean(process.env.J5AF_BRIDGE_CLI_SESSION_ID && process.env.J5AF_BRIDGE_CLI_MESSAGE_ID);
  return {
    version: 1,
    available: process.env.COMPOSIO_BRIDGE_AVAILABLE === "1" && (hasTaskContext || hasCliContext),
    transport: "j5-composio-bridge",
    credentialPolicy: "j5-server-owned",
    connectedToolkits: [],
    scopedToolkits: [],
    commands: {
      manifest: "node ./composio-bridge.mjs manifest",
      search: "node ./composio-bridge.mjs search \"keyword phrase\"",
      schema: "node ./composio-bridge.mjs schema TOOL_SLUG [TOOL_SLUG...]",
      execute: "node ./composio-bridge.mjs execute TOOL_SLUG '{\"key\":\"value\"}'",
    },
    rules: [
      "Use manifest first, then search, then schema, then execute.",
      "Never call Composio directly and never look for COMPOSIO_API_KEY.",
      "J5 owns all Composio credentials and enforces user/account/service scope.",
    ],
  };
}

function readManifest() {
  const raw = process.env.COMPOSIO_BRIDGE_MANIFEST;
  if (!raw) return fallbackManifest();
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") throw new Error("manifest must be an object");
    return parsed;
  } catch (err) {
    return {
      ...fallbackManifest(),
      available: false,
      error: "Invalid COMPOSIO_BRIDGE_MANIFEST: " + err.message,
    };
  }
}

/** Cloud mode: HMAC-sign the request body with the run's callbackSecret. */
function cloudAuth(bridgeUrl, bridgeSecret, taskId, bodyObj) {
  const iat = Math.floor(Date.now() / 1000);
  const signedBody = JSON.stringify({ ...bodyObj, taskId, iat });
  const sig = crypto.createHmac("sha256", bridgeSecret).update(signedBody, "utf8").digest("hex");
  return {
    url: bridgeUrl.replace(/\/$/, "") + "/api/composio/bridge",
    headers: {
      "Content-Type": "application/json",
      "x-j5af-task-signature": sig,
    },
    body: signedBody,
  };
}

/** Local runner mode: read credential from ~/.j5af/service/config.json. */
function localAuth(bodyObj, context) {
  const configPath =
    process.env.J5AF_SERVICE_CONFIG ??
    path.join(os.homedir(), ".j5af", "service", "config.json");
  let cfg;
  try {
    cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch {
    throw new Error(
      "Composio bridge: no runner credential found at " + configPath + ".\n" +
      "If running on a self-hosted runner, ensure the runner is registered."
    );
  }
  if (!cfg.controlPlaneUrl || !cfg.credential) {
    throw new Error("Composio bridge: runner config missing controlPlaneUrl or credential.");
  }
  return {
    url: cfg.controlPlaneUrl.replace(/\/$/, "") + "/api/composio/bridge",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cfg.credential,
    },
    body: JSON.stringify({ ...bodyObj, ...context }),
  };
}

const FETCH_TIMEOUT_MS = 30_000;

async function callBridge(bodyObj) {
  const bridgeUrl = process.env.J5AF_BRIDGE_URL;
  const bridgeSecret = process.env.J5AF_BRIDGE_SECRET;
  const taskId = process.env.J5AF_BRIDGE_TASK_ID ? Number(process.env.J5AF_BRIDGE_TASK_ID) : null;
  const cliSessionId = process.env.J5AF_BRIDGE_CLI_SESSION_ID ? Number(process.env.J5AF_BRIDGE_CLI_SESSION_ID) : null;
  const cliMessageId = process.env.J5AF_BRIDGE_CLI_MESSAGE_ID ? Number(process.env.J5AF_BRIDGE_CLI_MESSAGE_ID) : null;

  const hasTaskContext = taskId && taskId > 0;
  const hasCliContext = cliSessionId && cliSessionId > 0 && cliMessageId && cliMessageId > 0;

  if (!hasTaskContext && !hasCliContext) {
    throw new Error("Composio bridge: no valid task or CLI session context is set.");
  }
  if (hasTaskContext && hasCliContext) {
    throw new Error("Composio bridge: task context and CLI session context cannot both be set.");
  }

  const { url, headers, body } =
    bridgeUrl && bridgeSecret
      ? cloudAuth(bridgeUrl, bridgeSecret, taskId, bodyObj)
      : localAuth(
          bodyObj,
          hasTaskContext
            ? { taskId }
            : { cliSessionId, cliMessageId },
        );

  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim();
  if (bypassSecret) headers["x-vercel-protection-bypass"] = bypassSecret;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let res;
  try {
    res = await fetch(url, { method: "POST", headers, body, signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Composio bridge request timed out after " + FETCH_TIMEOUT_MS + "ms.");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    let msg = "unknown error";
    try { msg = (await res.json()).error ?? msg; } catch { try { msg = await res.text() || msg; } catch {} }
    throw new Error("Composio bridge HTTP " + res.status + ": " + msg);
  }

  return res.json();
}

async function main() {
  const { command, values } = parseArgs(process.argv);

  if (command === "manifest") {
    printJson(readManifest());
    return;
  }

  if (command === "search") {
    printJson(await callBridge({ action: "search", query: values.join(" ") }));
    return;
  }

  if (command === "schema") {
    printJson(await callBridge({ action: "schema", slugs: values.slice(0, 20) }));
    return;
  }

  // execute
  const [toolSlug, rawJson] = values;
  if (!rawJson) usage();
  let args;
  try {
    args = JSON.parse(rawJson);
    if (!args || typeof args !== "object" || Array.isArray(args)) throw new Error("must be object");
  } catch (err) {
    throw new Error("Invalid JSON args: " + err.message);
  }
  printJson(await callBridge({ action: "execute", toolSlug, args }));
}

main().catch((err) => {
  console.error(err.message ?? String(err));
  process.exit(1);
});
