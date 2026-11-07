// Tells Bing (and Yandex, Seznam, Naver via the shared IndexNow API) which pages changed, so new
// posts show up in Bing and Copilot answers within hours instead of weeks.
//   node tools/indexnow.mjs            submit pages changed in the last 7 days (reads the live sitemap)
//   node tools/indexnow.mjs --days 30  a longer window
//   node tools/indexnow.mjs --dry-run  print what would be sent, send nothing
// The key is public by design: Bing checks that https://<site>/<key>.txt contains it.
import { readFileSync } from "node:fs";

const KEY = "6b0982830a322416dc00b5fca7188f57";
const args = process.argv.slice(2);
const days = Number(args[args.indexOf("--days") + 1]) || 7;
const dry = args.includes("--dry-run");
const base = (process.env.SITE_URL || readFileSync(new URL("../hugo.toml", import.meta.url), "utf8").match(/^baseURL\s*=\s*"([^"]+)"/m)[1]).replace(/\/?$/, "/");
const host = new URL(base).host;

const sitemap = process.env.SITEMAP_FILE ? readFileSync(process.env.SITEMAP_FILE, "utf8") : await (await fetch(base + "sitemap.xml")).text();
const since = Date.now() - days * 864e5;
const urls = [...sitemap.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)]
  .filter(([, , lastmod]) => !lastmod || Date.parse(lastmod) >= since)
  .map(([, loc]) => loc);
urls.unshift(base); // the home page always lists the newest work

if (!urls.length) { console.log("nothing changed in the last", days, "days"); process.exit(0); }
const body = { host, key: KEY, keyLocation: base + KEY + ".txt", urlList: [...new Set(urls)].slice(0, 10000) };
if (dry) { console.log(JSON.stringify(body, null, 2)); process.exit(0); }
const res = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
console.log("IndexNow:", res.status, res.statusText, "-", body.urlList.length, "URLs");
// 200 or 202 = accepted. 403 = the key file is not live yet. 422 = a URL is not on this host.
if (res.status >= 400) process.exit(1);
