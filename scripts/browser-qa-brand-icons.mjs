/**
 * Visual + interaction QA for SimpleBrandIcon (GitHub, LinkedIn, X) on home, resume, and AI pages.
 *
 * Requires: `pnpm add -D playwright` (or install Playwright in a temp dir) and `npx playwright install chromium`.
 * Run with dev server up: `pnpm dev` then `node scripts/browser-qa-brand-icons.mjs`
 *
 * Env: BASE_URL (default http://localhost:5173), OUT_DIR (default ./browser-qa-artifacts)
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const OUT = process.env.OUT_DIR ?? path.join(process.cwd(), 'browser-qa-artifacts');

fs.mkdirSync(OUT, { recursive: true });

const report = {
  environment: {
    baseUrl: BASE,
    viewportDesktop: { width: 1280, height: 900 },
    viewportMobile: { width: 390, height: 844 },
    browser: 'Chromium (Playwright)',
  },
  pages: [],
  consoleErrors: [],
  failedRequests: [],
};

function record(pageName, checks) {
  report.pages.push({ page: pageName, checks });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();

context.on('page', (page) => {
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      report.consoleErrors.push({ page: page.url(), text: msg.text() });
    }
  });
  page.on('requestfailed', (req) => {
    report.failedRequests.push({
      url: req.url(),
      failure: req.failure()?.errorText,
    });
  });
});

async function assertSocialLinks(page, { expectCompactHeaderIcons }) {
  const checks = [];

  const github = page.getByRole('link', { name: /GitHub/i }).first();
  const linkedin = page.getByRole('link', { name: /LinkedIn/i }).first();

  checks.push({
    assert: 'GitHub link visible',
    pass: await github.isVisible(),
  });
  checks.push({
    assert: 'LinkedIn link visible',
    pass: await linkedin.isVisible(),
  });

  const ghHref = await github.getAttribute('href');
  const liHref = await linkedin.getAttribute('href');

  checks.push({
    assert: 'GitHub href',
    pass: ghHref === 'https://github.com/DontFretBrett',
    value: ghHref,
  });
  checks.push({
    assert: 'LinkedIn href',
    pass: liHref === 'https://www.linkedin.com/in/imbrett/',
    value: liHref,
  });

  const xByText = page.getByRole('link', { name: 'X', exact: true });
  const xCount = await xByText.count();
  if (xCount > 0) {
    const xHref = await xByText.first().getAttribute('href');
    checks.push({
      assert: 'X href',
      pass: xHref === 'https://x.com/WontFretBrett',
      value: xHref,
    });
  }

  const brandPaths = page.locator('main svg path[fill="currentColor"], header svg path[fill="currentColor"]');
  const n = await brandPaths.count();
  const lengths = [];
  for (let i = 0; i < Math.min(n, 24); i++) {
    const d = await brandPaths.nth(i).getAttribute('d');
    lengths.push(d?.length ?? 0);
  }
  const substantial = lengths.filter((l) => l > 10).length;
  checks.push({
    assert: 'Multiple brand SVG paths with non-trivial d',
    pass: substantial >= 2,
    detail: { pathElements: n, substantialPaths: substantial, sampleLengths: lengths.slice(0, 6) },
  });

  if (expectCompactHeaderIcons) {
    const iconLink = page.locator('header a[aria-label="GitHub"] svg');
    const cnt = await iconLink.count();
    checks.push({
      assert: 'Compact header GitHub icon (aria-label link contains svg)',
      pass: cnt >= 1,
      detail: { svgInHeaderGithubLink: cnt },
    });
  }

  return checks;
}

// Desktop: Home (full Header)
{
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('header', { state: 'visible' });
  await page.locator('#main-content').waitFor({ state: 'visible' });
  await page.screenshot({ path: path.join(OUT, '01-home-desktop-header.png') });

  const checks = await assertSocialLinks(page, { expectCompactHeaderIcons: false });
  record('Home / (desktop)', checks);

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: /GitHub/i }).first().click(),
  ]);
  const popupUrl = popup.url();
  await popup.close();
  record('Home GitHub link opens new tab', [
    {
      assert: 'Popup URL is GitHub profile',
      pass: popupUrl.startsWith('https://github.com/DontFretBrett'),
      value: popupUrl,
    },
  ]);

  await page.close();
}

// Desktop: Resume
{
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${BASE}/resume`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('header', { state: 'visible' });
  await page.getByText('Connect on LinkedIn', { exact: false }).first().scrollIntoViewIfNeeded();
  await sleep(200);
  await page.screenshot({ path: path.join(OUT, '02-resume-connect-links.png'), fullPage: false });

  const checks = await assertSocialLinks(page, { expectCompactHeaderIcons: true });
  record('Resume /resume (desktop)', checks);
  await page.close();
}

// Desktop: AI Experience
{
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${BASE}/ai`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('header', { state: 'visible' });
  await page.getByText('Connect on LinkedIn', { exact: false }).first().scrollIntoViewIfNeeded();
  await sleep(200);
  await page.screenshot({ path: path.join(OUT, '03-ai-connect-links.png'), fullPage: false });

  const checks = await assertSocialLinks(page, { expectCompactHeaderIcons: true });
  record('AI /ai (desktop)', checks);
  await page.close();
}

// Mobile: Home
{
  const page = await context.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('header', { state: 'visible' });
  await page.screenshot({ path: path.join(OUT, '04-home-mobile-header.png') });
  const gh = page.getByRole('link', { name: /GitHub/i }).first();
  record('Home / (mobile)', [
    {
      assert: 'GitHub link visible (hero)',
      pass: await gh.isVisible(),
    },
  ]);
  await page.close();
}

// Hover: LinkedIn in compact header on /resume (wait for lazy page — avoid Suspense spinner)
{
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle' });
  await page.getByText('Connect on LinkedIn', { exact: false }).first().waitFor({ state: 'visible' });
  const li = page.locator('header a[aria-label="LinkedIn"]');
  await li.hover();
  await sleep(200);
  await page.screenshot({ path: path.join(OUT, '05-resume-linkedin-hover.png') });
  record('Resume hover LinkedIn (compact header)', [{ assert: 'Hover screenshot after CTA visible', pass: true }]);
  await page.close();
}

await browser.close();

const summaryPath = path.join(OUT, 'report.json');
fs.writeFileSync(summaryPath, JSON.stringify(report, null, 2));

let failed = 0;
for (const p of report.pages) {
  for (const c of p.checks) {
    if (c.pass === false) failed++;
  }
}

console.log(JSON.stringify({ outDir: OUT, failedAssertions: failed, report: summaryPath }, null, 2));
if (failed > 0) process.exit(1);
