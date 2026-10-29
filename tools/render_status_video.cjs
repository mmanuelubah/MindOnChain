// Renders marketing/alltech-status.html to marketing/alltech-status.mp4 (1080x1920, 9 s, 25 fps)
// and a still of the last frame to marketing/png/status-poster.png.
//   node tools/render_status_video.cjs
// Needs puppeteer-core, Chrome and ffmpeg. Set PUPPETEER_CORE / CHROME_PATH if they live elsewhere.
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");
const puppeteer = require(process.env.PUPPETEER_CORE || "puppeteer-core");

const FPS = 25, SECONDS = 9;

(async () => {
  const root = path.resolve(__dirname, "..");
  const frames = fs.mkdtempSync(path.join(require("os").tmpdir(), "alltech-frames-"));
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto("file://" + path.join(root, "marketing", "alltech-status.html"), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const board = await page.$("#status");
  // Pause every CSS animation and step the clock by hand, so each frame is exact.
  await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
  for (let i = 0; i < FPS * SECONDS; i++) {
    await page.evaluate((t) => document.getAnimations().forEach((a) => { a.currentTime = t; }), (i * 1000) / FPS);
    await board.screenshot({ path: path.join(frames, String(i).padStart(4, "0") + ".png") });
  }
  fs.mkdirSync(path.join(root, "marketing", "png"), { recursive: true });
  fs.copyFileSync(path.join(frames, String(FPS * SECONDS - 1).padStart(4, "0") + ".png"), path.join(root, "marketing", "png", "status-poster.png"));
  await browser.close();
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(frames, "%04d.png"),
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", path.join(root, "marketing", "alltech-status.mp4")]);
  fs.rmSync(frames, { recursive: true, force: true });
  console.log("wrote marketing/alltech-status.mp4 and marketing/png/status-poster.png");
})();
