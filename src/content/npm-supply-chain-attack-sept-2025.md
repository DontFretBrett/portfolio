---
title: "The npm Supply Chain Exploit (Sept 2025): What Happened, How It Happened, and How to Respond"
date: "2025-09-10"
tags: ["Security", "npm", "Supply Chain", "Open Source", "Phishing", "MFA", "Node.js", "DevSecOps"]
excerpt: "A deep dive into this week’s npm supply chain exploit: the phishing playbook used against maintainers, how malicious packages were published, what was impacted, and a practical action plan to protect your projects."
description: "In-depth analysis of the September 2025 npm exploit, covering the phishing-led account takeovers, malicious package publication, crypto-stealing payloads, and concrete steps developers and teams should take right now."
keywords: ["npm exploit", "npm phishing", "open source supply chain", "package compromise", "2FA", "hardware keys", "provenance", "npm publish --provenance", "dependency security", "Node.js security"]
---

Over the past week, the npm ecosystem experienced a fresh, high‑impact supply chain attack. Maintainers were targeted by convincing “2FA reset” phishing emails impersonating official npm support, leading to account takeovers and the publication of malicious package versions. Once installed, these tainted releases attempted to exfiltrate sensitive data and, in some cases, intercept cryptocurrency activity.

This post breaks down what happened, how it happened, what the risks are, and what actions you should take immediately.

## What happened

- Attackers ran a phishing campaign against popular open‑source maintainers, posing as npm support and urging a two‑factor authentication reset under a deadline.
- At least one well‑known maintainer acknowledged falling for the phish, after which the attacker published modified package versions containing malicious code.
- Malicious payloads focused on data theft and crypto‑adjacent behavior (credential/token harvesting; monitoring or hijacking of cryptocurrency‑related activity), aligned with earlier 2025 npm attacks.
- The incident was detected and the compromised versions were pulled within hours, but the blast radius was non‑trivial given the widespread dependency chains in the Node.js ecosystem.

Authoritative coverage and analysis:
- Axios on the phishing wave targeting npm maintainers (2FA reset impersonation) — see "AI on Defense" newsletter: [Axios coverage](https://www.axios.com/newsletters/axios-future-of-cybersecurity-ce276b50-890f-11f0-8a1b-6325a9e95b5e)
- Context: August 2025 attack on Nx packages (infostealer uploaded to npm), reported by Wiz and covered here: [TechRadar summary](https://www.techradar.com/pro/security/npm-packages-from-nx-targeted-in-latest-software-supply-chain-attack)
- Broader 2025 series of npm infostealer campaigns: [BleepingComputer report](https://www.bleepingcomputer.com/news/security/infostealer-campaign-compromises-10-npm-packages-targets-devs/)

## How it happened

While each incident differs in details, the kill chain for this week’s exploit mirrors a now‑familiar sequence:

1. Phishing pretext and delivery
   - Maintainers received emails spoofing npm support requesting a 2FA reset “to prevent lockout,” often with urgency and a deadline.
   - Links sent victims to convincing credential‑harvesting pages that proxied logins and captured one‑time codes.

2. Account takeover and token harvesting
   - Once a maintainer authenticated on the phishing site, attackers captured credentials and/or session tokens.
   - In related 2025 campaigns, infostealers targeted developer machines to extract npm/GitHub tokens, SSH keys, and wallets, enabling rapid lateral movement and persistence.

3. Malicious package publication
   - With maintainer access, attackers published new versions under trusted names.
   - Payloads commonly included one or more of the following:
     - postinstall/preinstall scripts that run automatically
     - obfuscated JavaScript with dynamic eval/base64
     - outbound exfiltration to attacker‑controlled domains (HTTPS, DNS, or covert channels)
     - environment variable scraping (tokens, keys, registry credentials)

4. Propagation via dependency graphs
   - Downstream consumers pinning loose ranges (e.g., ^ or ~) were at higher risk of auto‑upgrading to tainted versions.
   - CI systems using `npm install` instead of `npm ci` with a vetted lockfile increased exposure.

### Red flags and IoCs you can check for

- Unexpected new `preinstall`/`postinstall` scripts in `package.json`
- Obfuscated code in newly released minor/patch versions
- References to unusual network endpoints or clipboard/crypto‑related modules
- Suspicious publication times (e.g., clusters of releases late night UTC) and out‑of‑character maintainers in `npm view <pkg> maintainers`

Example of a risky install hook to review during triage:

```json
{
  "scripts": {
    "preinstall": "node install.js"
  }
}
```

Legitimate projects use install hooks too, but unexpected additions in a hotfix patch should trigger review.

## Who is affected

- Any project or CI pipeline that installed the compromised versions during the exposure window
- Developers whose local environments executed the malicious postinstall hooks
- Organizations reusing the same registry auth tokens across multiple projects

Given the transitive nature of npm, even indirect dependencies can bring in compromised versions.

## What to do right now (priority checklist)

1. Inventory and freeze
   - Use your lockfile as the source of truth. Prefer `npm ci` in CI.
   - Temporarily turn off automatic dependency update bots until triage is complete.

2. Identify potential exposure windows
   - Pull install logs from CI for the last 7–14 days and match timestamps to known incident windows.
   - Query your artifact cache/registry mirror for the exact versions fetched.

3. Hunt for IoCs
   - Search code and node_modules for suspicious `preinstall`/`postinstall` hooks, eval/base64 blobs, and unexpected network calls.
   - Check recent package diffs: `npm diff <pkg>@<good> <pkg>@<suspect>`

4. Rotate secrets
   - Immediately rotate npm tokens, GitHub PATs, SSH keys used in CI, and any environment secrets that may have been exfiltrated.

5. Rebuild from clean state
   - Wipe node_modules and caches on developer machines and CI runners.
   - Rebuild images/artefacts from clean base images with verified locks.

6. Strengthen publishing and consumption posture
   - Enforce exact version pinning for critical dependencies, especially in production.
   - Require `npm ci` in CI with verified `package-lock.json` integrity fields.
   - Monitor for new versions of critical deps before adopting; stage in canaries.

## Hardening your accounts and pipelines

- Use phishing‑resistant MFA
  - Prefer hardware security keys (WebAuthn/FIDO2) for npm/GitHub over OTP apps or SMS.
  - npm 2FA guidance: [npm 2FA documentation](https://docs.npmjs.com/about-two-factor-authentication)

- Require provenance on publish
  - Use GitHub‑backed provenance to bind packages to source and CI: `npm publish --provenance`.
  - Docs: [npm publish with provenance](https://docs.npmjs.com/cli/v9/commands/npm-publish#provenance) and [GitHub package provenance](https://docs.github.com/actions/security-guides/using-package-signing-and-provenance)

- Least‑privilege tokens
  - Create scoped, time‑limited tokens for CI and avoid reusing personal tokens.
  - Store secrets only in your CI vault; never on developer laptops.

- Policy controls
  - Enforce branch protection, required reviews, and mandatory status checks for release branches.
  - Require security review for any change that modifies `scripts` in `package.json`.

- Consumption controls
  - Deploy an allowlist for critical dependencies and registries.
  - Mirror npm with malware scanning and blocklisted IoCs.

## Lessons learned (and how this differs from prior waves)

- Social engineering is the top vector. Well‑crafted phishing can bypass even experienced maintainers.
- 2FA helps but is not equal: hardware‑backed WebAuthn resists credential phishing far better than OTP codes.
- Speed matters. Four‑hour windows (as seen in the August Nx incident) can be enough for widespread exposure when ranges auto‑upgrade.
- Provenance and attestation reduce trust surface area. Tie packages to builds, repos, and identities.

## Further reading and sources

- Phishing and 2FA‑reset pretext hitting npm maintainers: [Axios newsletter – Future of Cybersecurity](https://www.axios.com/newsletters/axios-future-of-cybersecurity-ce276b50-890f-11f0-8a1b-6325a9e95b5e)
- August 2025 Nx malicious uploads (infostealer via npm): [TechRadar coverage](https://www.techradar.com/pro/security/npm-packages-from-nx-targeted-in-latest-software-supply-chain-attack)
- Broader 2025 npm infostealer campaigns: [BleepingComputer analysis](https://www.bleepingcomputer.com/news/security/infostealer-campaign-compromises-10-npm-packages-targets-devs/)
- Publishing with provenance (npm): [npm docs](https://docs.npmjs.com/cli/v9/commands/npm-publish#provenance)
- About npm 2FA and protecting your account: [npm 2FA guide](https://docs.npmjs.com/about-two-factor-authentication)

---

If you run a production workload on Node.js, treat this week’s event as a rehearsal for your incident response plan. Run the checklist above today, and consider staging a game‑day that drills a dependency compromise—from detection through full credential rotation and rebuild. Defense is a program, not a point‑in‑time task.


## Related posts

- Implementing 2025 Web Development Best Practices: [Read the post](/blog/implementing-2025-web-development-best-practices)
- Adding Google Analytics 4 to a React Portfolio: [Read the post](/blog/implementing-google-analytics-4-react-portfolio)


