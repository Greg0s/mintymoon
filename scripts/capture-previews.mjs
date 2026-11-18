// Captures the preview images shown on the hub cards.
// Usage: npm i -D playwright && npx playwright install chromium && node scripts/capture-previews.mjs
import { chromium } from "playwright";

const SITES = [
  { name: "whatweplay", url: "https://whatweplay.mintymoon.app/" },
  { name: "lyrix", url: "https://lyrix.mintymoon.app/", dismiss: "Non merci" },
  { name: "sncfwrapped", url: "https://sncfwrapped.mintymoon.app/" },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  colorScheme: "dark",
});

for (const site of SITES) {
  const page = await context.newPage();
  await page.goto(site.url, { waitUntil: "networkidle", timeout: 60_000 });
  if (site.dismiss) {
    // Close the first-visit onboarding so the preview shows the game itself
    await page.getByText(site.dismiss).first().click({ timeout: 5000 }).catch(() => {});
  }
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `assets/previews/${site.name}.jpg`, type: "jpeg", quality: 82 });
  console.log(`captured ${site.name}`);
  await page.close();
}

await browser.close();
