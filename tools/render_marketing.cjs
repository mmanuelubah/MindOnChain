// Renders every artboard in an artboard page (default marketing/alltech-marketing.html) to marketing/png/<id>.png.
//   node tools/render_marketing.cjs [page.html]
// Needs puppeteer-core and Chrome. Set PUPPETEER_CORE and CHROME_PATH if they live elsewhere.
const path = require("path");
const fs = require("fs");
const puppeteer = require(process.env.PUPPETEER_CORE || "puppeteer-core");

(async () => {
  const root = path.resolve(__dirname, "..");
  const outDir = path.join(root, "marketing", "png");
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1900, height: 1500, deviceScaleFactor: 1 });
  const source = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, "marketing", "alltech-marketing.html");
  await page.goto("file://" + source, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  for (const board of await page.$$("section.board")) {
    const id = await board.evaluate((el) => el.id);
    const transparent = await board.evaluate((el) => el.hasAttribute("data-transparent"));
    await board.screenshot({ path: path.join(outDir, id + ".png"), omitBackground: transparent });
    console.log("rendered", id);
  }
  await browser.close();
})();
