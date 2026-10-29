"""Build marketing/alltech-marketing.html: Alltech flyers (1080x1080), two LinkedIn carousels
(1080x1350), and the logotype and monogram set.

    python3 tools/marketing.py          # writes the HTML
    node tools/render_marketing.cjs     # renders each artboard to marketing/png/

Every claim on these artboards comes from the site or the owner: services from the
original Alltech flyer, the Ladipo sourcing steps, price on request, no warranty.
Contact details are read from hugo.toml so they match the website.
"""
import pathlib
import re
import tomllib

ROOT = pathlib.Path(__file__).resolve().parent.parent
cfg = tomllib.loads((ROOT / "hugo.toml").read_text())
contact = cfg["params"]["contact"]
WA, EMAIL = contact["whatsappDisplay"], contact["email"]
SITE = cfg["baseURL"].replace("https://", "").rstrip("/")

scope = (ROOT / "layouts/partials/can-scope.html").read_text()
scope_svg = re.search(r"<svg class=\"scope-art\".*?</svg>", scope, re.S).group(0)

FONT = "../static/fonts"
CSS = f"""
@font-face {{ font-family: "Archivo"; font-weight: 400 800; font-stretch: 75% 100%; src: url("{FONT}/archivo-normal-latin.woff2"); }}
@font-face {{ font-family: "Pixelify Sans"; font-weight: 400 700; src: url("{FONT}/pixelify-sans-latin.woff2"); }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; background: transparent; display: grid; gap: 40px; padding: 40px; justify-content: center; font-family: "Archivo", sans-serif; }}
.board {{ position: relative; overflow: hidden; background: #0B1510; color: #E2F5E9; padding: 72px;
  background-image: repeating-linear-gradient(0deg, rgb(57 255 136 / .04) 0 2px, transparent 2px 8px), radial-gradient(rgb(57 255 136 / .12) 2px, transparent 2.6px);
  background-size: auto, 24px 24px; display: flex; flex-direction: column; }}
.sq {{ width: 1080px; height: 1080px; }}
.tall {{ width: 1080px; height: 1350px; }}
.light {{ background-color: #F0FDF4; color: #0F172A; background-image: radial-gradient(rgb(21 128 61 / .12) 2px, transparent 2.6px); background-size: 24px 24px; }}
.brand {{ display: flex; align-items: center; gap: 18px; }}
.brand img {{ width: 84px; height: 84px; border: 4px solid currentColor; }}
.brand b {{ font: 700 44px/1 "Pixelify Sans"; }}
.brand b span {{ background: #4ADE80; color: #0B1510; padding: 2px 10px; margin-left: 8px; }}
.light .brand b span {{ background: #15803D; color: #fff; }}
.sticker {{ display: inline-block; align-self: flex-start; background: #4ADE80; color: #0B1510; border: 4px solid #0B1510; font: 600 28px/1 "Pixelify Sans"; text-transform: uppercase; letter-spacing: .04em; padding: 12px 18px 10px; transform: rotate(-2deg); }}
.light .sticker {{ background: #15803D; color: #fff; }}
h1 {{ font: 500 104px/1.02 "Pixelify Sans"; margin: 40px 0 28px; }}
h1 em {{ font-style: normal; color: #39FF88; }}
.light h1 em {{ color: #15803D; }}
h2 {{ font: 500 76px/1.05 "Pixelify Sans"; margin: 32px 0 24px; }}
p.lead {{ font-size: 38px; line-height: 1.35; margin: 0 0 24px; max-width: 28ch; }}
.scope {{ border: 5px solid #4ADE80; background: #12211A; margin-top: auto; }}
.scope svg {{ display: block; width: 100%; height: auto; }}
.scope-text {{ font-family: ui-monospace, monospace; font-weight: 600; }}
.contact {{ margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; border-top: 4px solid #4ADE80; padding-top: 28px; font-size: 32px; }}
.light .contact {{ border-color: #15803D; }}
.contact b {{ font: 700 48px/1.1 "Archivo"; display: block; }}
.contact small {{ font-size: 28px; opacity: .85; }}
.services {{ display: grid; gap: 24px; margin: 8px 0 32px; }}
.svc {{ display: grid; grid-template-columns: 96px 1fr; gap: 28px; align-items: center; border: 5px solid currentColor; padding: 24px 28px; }}
.svc .ic {{ width: 96px; height: 96px; background: #4ADE80; display: grid; place-items: center; font: 700 52px/1 "Pixelify Sans"; color: #0B1510; }}
.light .svc .ic {{ background: #15803D; color: #fff; }}
.svc strong {{ display: block; font: 600 46px/1.1 "Pixelify Sans"; }}
.svc span {{ font-size: 30px; opacity: .85; }}
.steps {{ list-style: none; padding: 0; margin: 8px 0 32px; display: grid; gap: 22px; counter-reset: s; }}
.steps li {{ counter-increment: s; display: grid; grid-template-columns: 76px 1fr; gap: 24px; align-items: start; font-size: 32px; line-height: 1.3; }}
.steps li::before {{ content: counter(s); width: 72px; height: 72px; display: grid; place-items: center; background: #4ADE80; color: #0B1510; border: 4px solid #E2F5E9; font: 700 44px/1 "Pixelify Sans"; }}
.steps strong {{ display: block; font-size: 40px; }}
.car {{ position: absolute; left: 0; right: 0; bottom: 210px; opacity: .9; }}
.car img {{ width: 100%; display: block; }}
.bubble {{ position: relative; display: inline-block; align-self: flex-start; background: #F0FDF4; color: #0B1510; border: 5px solid #0B1510; padding: 14px 26px; font: 700 40px/1 "Pixelify Sans"; transform: rotate(-3deg); }}
.bubble::after {{ content: ""; position: absolute; left: 40px; bottom: -30px; border-style: solid; border-width: 30px 24px 0 0; border-color: #0B1510 transparent transparent; }}
.brands {{ display: flex; flex-wrap: wrap; gap: 16px; margin: 8px 0 32px; }}
.brands span {{ border: 5px solid currentColor; padding: 14px 22px; font: 800 40px/1 "Archivo"; }}
.searchbox {{ display: flex; border: 5px solid #0F172A; margin: 12px 0 32px; }}
.searchbox span {{ flex: 1; padding: 26px 28px; font-size: 40px; color: #475569; background: #fff; }}
.searchbox b {{ background: #15803D; color: #fff; padding: 26px 34px; font: 800 40px/1 "Archivo"; }}
.slide-n {{ position: absolute; top: 72px; right: 72px; font: 600 30px/1 ui-monospace, monospace; color: #86EFAC; }}
.light .slide-n {{ color: #15803D; }}
.wire {{ display: grid; gap: 24px; margin: 24px 0; }}
.wire div {{ display: grid; grid-template-columns: 220px 1fr; align-items: center; gap: 24px; font: 600 36px ui-monospace, monospace; }}
.wire svg {{ width: 100%; height: 90px; }}
.fields {{ display: flex; flex-wrap: wrap; gap: 0; margin: 32px 0; border: 5px solid #4ADE80; }}
.fields span {{ padding: 26px 20px; font: 600 32px/1.1 ui-monospace, monospace; border-right: 3px solid #1F3A2B; }}
.fields span:last-child {{ border-right: 0; }}
.fields .hot {{ background: #4ADE80; color: #0B1510; }}
.bytes {{ display: flex; gap: 16px; flex-wrap: wrap; margin: 24px 0 8px; }}
.bytes span {{ display: grid; justify-items: center; gap: 10px; border: 5px solid #4ADE80; padding: 22px 24px; font: 700 54px/1 ui-monospace, monospace; }}
.bytes small {{ font: 600 24px/1.2 "Archivo"; color: #A7B4C6; text-align: center; max-width: 9ch; }}
.bytes .pad {{ opacity: .45; }}

.logo-board {{ display: grid; place-items: center; padding: 0; }}
.lockup {{ display: flex; align-items: center; gap: 48px; }}
.lockup img {{ width: 260px; height: 260px; border: 10px solid currentColor; }}
.lockup b {{ font: 700 150px/1 "Pixelify Sans"; white-space: nowrap; }}
.lockup b span {{ background: #4ADE80; color: #0B1510; padding: 4px 26px; margin-left: 24px; }}
.light .lockup b span {{ background: #15803D; color: #fff; }}
.stack {{ display: grid; justify-items: center; gap: 44px; }}
.stack img {{ width: 360px; height: 360px; border: 12px solid currentColor; }}
.stack b {{ display: grid; justify-items: center; gap: 14px; font: 700 132px/1 "Pixelify Sans"; }}
.stack b span {{ background: #4ADE80; color: #0B1510; padding: 4px 26px; }}
.light .stack b span {{ background: #15803D; color: #fff; }}
.wordmark-only {{ font: 700 150px/1 "Pixelify Sans"; color: #0B1510; }}
.wordmark-only span {{ background: #15803D; color: #fff; padding: 4px 26px; margin-left: 24px; }}
.transparent {{ background: transparent !important; background-image: none !important; }}
.mono-as {{ width: 760px; height: 760px; background: #4ADE80; border: 28px solid #0B1510; display: grid; place-items: center; font: 700 420px/1 "Pixelify Sans"; color: #0B1510;
  clip-path: polygon(0 56px, 56px 56px, 56px 0, calc(100% - 56px) 0, calc(100% - 56px) 56px, 100% 56px, 100% calc(100% - 56px), calc(100% - 56px) calc(100% - 56px), calc(100% - 56px) 100%, 56px 100%, 56px calc(100% - 56px), 0 calc(100% - 56px)); }}
.mono-tile {{ width: 820px; height: 820px; border: 28px solid #E2F5E9; }}
.tip {{ border: 5px solid currentColor; padding: 28px 32px; font-size: 34px; line-height: 1.35; margin: 24px 0; }}
.tip b {{ display: block; font: 600 50px/1.1 "Pixelify Sans"; margin-bottom: 12px; color: #39FF88; }}
.light .tip b {{ color: #15803D; }}
.tip code {{ font: 600 34px ui-monospace, monospace; background: rgb(57 255 136 / .15); padding: 2px 8px; }}
"""

logo = '<div class="brand"><img src="../static/brand/icon-192.png" alt=""><b>Alltech<span>Solutions</span></b></div>'
contact_block = f'<div class="contact"><div><small>WhatsApp</small><b>{WA}</b></div><div style="text-align:right"><small>{EMAIL}</small><br><small>{SITE}</small></div></div>'

def wave(dominant_up, colour):
    pattern = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1]
    y_rec, y_dom = 45, (12 if dominant_up else 78)
    d, x, w = f"M0 {y_rec}", 0, 700 / len(pattern)
    prev = 1
    for b in pattern:
        y = y_rec if b else y_dom
        if b != prev:
            d += f"L{x} {y_rec if prev else y_dom}L{x + 3} {y}"
        x += w
        d += f"L{x} {y}"
        prev = b
    return f'<svg viewBox="0 0 700 90" preserveAspectRatio="none"><path d="{d}" fill="none" stroke="{colour}" stroke-width="6"/></svg>'

boards = {
"flyer-1-car-wont-start": f'''<section class="board sq">{logo}
<h1>Car won’t start? It might be <em>the computer.</em></h1>
<div class="scope">{scope_svg}</div>
{contact_block}</section>''',

"flyer-2-services": f'''<section class="board sq light">{logo}
<h2>ECU work, done in Lagos</h2>
<div class="services">
<div class="svc"><div class="ic">01</div><div><strong>ECU programming &amp; cloning</strong><span>Your old ECU’s data on a replacement, so the car starts.</span></div></div>
<div class="svc"><div class="ic">02</div><div><strong>ECU wiping / virginising</strong><span>A used ECU returned to blank, ready for your car.</span></div></div>
<div class="svc"><div class="ic">03</div><div><strong>Remapping &amp; calibration</strong><span>Engine software adjusted after a repair or part change.</span></div></div>
</div>
{contact_block}</section>''',

"flyer-3-ladipo-parts": f'''<section class="board sq">{logo}
<div style="margin-top:40px"><span class="bubble">Ladipo! Ladipo!</span></div>
<h2 style="color:#39FF88">Need a module from Ladipo?</h2>
<ol class="steps">
<li><span><strong>Send the part number</strong>or a clear photo of the old module’s label.</span></li>
<li><span><strong>Get photos and a price</strong>before you pay anything. Price on request.</span></li>
<li><span><strong>Tested before handover</strong>Collect in Lagos; ask about delivery.</span></li>
</ol>
{contact_block}</section>''',

"flyer-4-free-database": f'''<section class="board sq light">{logo}
<h2>The workshop database is free to read</h2>
<p class="lead">Pinouts, EEPROM locations and programming steps, written down after real jobs.</p>
<div class="searchbox"><span>2L86D, MS43, Camry 2016…</span><b>Search</b></div>
<div class="brands"><span>BMW</span><span>Toyota</span><span>Fiat</span><span>Opel</span><span>Jeep</span><span>Volvo</span><span>+ more</span></div>
{contact_block}</section>''',

"carousel-1": f'''<section class="board tall"><span class="slide-n">1 / 5</span>{logo}
<span class="sticker" style="margin-top:80px">CAN bus, explained</span>
<h1>What does a car’s <em>CAN bus</em> actually say?</h1>
<p class="lead">Every module in a modern car talks over two wires. Here is one real message, read off a scope.</p>
<p class="lead" style="margin-top:auto;color:#39FF88;font:600 40px 'Pixelify Sans'">Swipe ▸</p></section>''',

"carousel-2": f'''<section class="board tall"><span class="slide-n">2 / 5</span>{logo}
<h2 style="margin-top:80px">Two wires, mirrored</h2>
<p class="lead">CAN-H and CAN-L both rest at 2.5 V. For each “0” bit, CAN-H rises to 3.5 V and CAN-L falls to 1.5 V.</p>
<div class="wire"><div><span style="color:#39FF88">CAN-H</span>{wave(True, "#39FF88")}</div><div><span style="color:#FB923C">CAN-L</span>{wave(False, "#FB923C")}</div></div>
<p class="lead">The ECU reads the difference, so noise that hits both wires cancels out.</p></section>''',

"carousel-3": f'''<section class="board tall"><span class="slide-n">3 / 5</span>{logo}
<h2 style="margin-top:80px">One message, five parts</h2>
<div class="fields"><span>SOF</span><span class="hot">ID</span><span>CTRL</span><span class="hot">DATA</span><span>CRC</span><span>ACK</span><span>EOF</span></div>
<p class="lead"><b style="color:#39FF88">ID</b> says what the message is about, and who wins if two modules talk at once: the lower ID goes first.</p>
<p class="lead"><b style="color:#39FF88">DATA</b> carries up to 8 bytes. <b style="color:#39FF88">CRC</b> lets every module check nothing got scrambled.</p></section>''',

"carousel-4": f'''<section class="board tall"><span class="slide-n">4 / 5</span>{logo}
<h2 style="margin-top:80px">A scan tool asking for engine RPM</h2>
<p class="lead" style="font-family:ui-monospace,monospace">ID 7DF · 8 bytes</p>
<div class="bytes"><span>02<small>2 bytes follow</small></span><span>01<small>show current data</small></span><span>0C<small>engine RPM</small></span><span class="pad">00<small>padding</small></span><span class="pad">00</span><span class="pad">00</span><span class="pad">00</span><span class="pad">00</span></div>
<div class="scope" style="margin-top:40px">{scope_svg}</div></section>''',

"carousel-5": f'''<section class="board tall light"><span class="slide-n">5 / 5</span>{logo}
<h2 style="margin-top:80px">When modules stop talking, the car stops too</h2>
<p class="lead">A dead ECU, a mismatched immobiliser or a replacement module that hasn’t been programmed all look like “won’t start”.</p>
<p class="lead">Alltech Solutions programs, clones and virginises ECUs in Lagos, and writes the procedures up in a free database.</p>
{contact_block}</section>''',
}


logos = {
"logo-horizontal-dark": '<section class="board logo-board" style="width:1800px;height:600px"><div class="lockup"><img src="../static/brand/icon-512.png" alt=""><b>Alltech<span>Solutions</span></b></div></section>',
"logo-horizontal-light": '<section class="board logo-board light" style="width:1800px;height:600px"><div class="lockup"><img src="../static/brand/icon-512.png" alt=""><b>Alltech<span>Solutions</span></b></div></section>',
"logo-stacked-dark": '<section class="board logo-board" style="width:1200px;height:1200px"><div class="stack"><img src="../static/brand/icon-512.png" alt=""><b>Alltech<span>Solutions</span></b></div></section>',
"logo-stacked-light": '<section class="board logo-board light" style="width:1200px;height:1200px"><div class="stack"><img src="../static/brand/icon-512.png" alt=""><b>Alltech<span>Solutions</span></b></div></section>',
"logotype-transparent": '<section class="board logo-board transparent" data-transparent style="width:1600px;height:400px"><div class="wordmark-only">Alltech<span>Solutions</span></div></section>',
"monogram-as": '<section class="board logo-board" style="width:1000px;height:1000px"><div class="mono-as">AS</div></section>',
"monogram-mark": '<section class="board logo-board" style="width:1000px;height:1000px"><img class="mono-tile" src="../static/brand/icon-512.png" alt=""></section>',
}
ladipo = {
"ladipo-carousel-1": f'''<section class="board tall"><span class="slide-n">1 / 5</span>{logo}
<span class="sticker" style="margin-top:80px">Buying an ECU</span>
<h1>Buying an ECU at Ladipo? <em>Send these first.</em></h1>
<p class="lead">ECUs that look the same often aren’t. These five checks decide whether a module will work in your car.</p>
<p class="lead" style="margin-top:auto;color:#39FF88;font:600 40px 'Pixelify Sans'">Swipe ▸</p></section>''',
"ladipo-carousel-2": f'''<section class="board tall"><span class="slide-n">2 / 5</span>{logo}
<h2 style="margin-top:80px">1. The number on the label</h2>
<div class="tip"><b>Not the shape. The number.</b>Two ECUs from the same car can differ by one digit, and only one will match. Send a clear photo of the label, for example <code>Bosch 0 261 209 012</code>.</div></section>''',
"ladipo-carousel-3": f'''<section class="board tall"><span class="slide-n">3 / 5</span>{logo}
<h2 style="margin-top:80px">2. Your car, exactly</h2>
<div class="tip"><b>Make, model, year, engine</b>“BMW” isn’t enough. <code>E46 330i, 2003, M54B30</code> is. The engine code is on the engine and in your papers.</div>
<h2>3. The connector</h2>
<div class="tip"><b>Count the plugs</b>A photo of the plugs shows the connector type, like <code>88-pin + 40-pin</code> on a Siemens MS43.</div></section>''',
"ladipo-carousel-4": f'''<section class="board tall"><span class="slide-n">4 / 5</span>{logo}
<h2 style="margin-top:80px">4. Photos before you pay</h2>
<div class="tip"><b>See the exact part</b>Ask for photos of the module you will get, not a picture of a similar one.</div>
<h2>5. Tested before handover</h2>
<div class="tip"><b>Then programmed to your car</b>A used ECU usually has to be cloned or virginised and aligned to your immobiliser before the car will start.</div></section>''',
"ladipo-carousel-5": f'''<section class="board tall light"><span class="slide-n">5 / 5</span>{logo}
<h2 style="margin-top:80px">Send it all on WhatsApp</h2>
<p class="lead">Alltech Solutions finds the part at Ladipo, sends photos and a price before you pay, tests it, and programs it to your car.</p>
<p class="lead">Price on request. Collect in Lagos; ask about delivery.</p>
{contact_block}</section>''',
}
boards.update(ladipo)
boards.update(logos)

out = ROOT / "marketing"
out.mkdir(exist_ok=True)
html = "<!doctype html><html lang='en'><meta charset='utf-8'><title>Alltech marketing artboards</title><style>" + CSS + "</style><body>\n"
html += "<!-- Generated by tools/marketing.py. Edit the script, then run it again. -->\n"
for name, board in boards.items():
    html += board.replace('<section class="board', f'<section id="{name}" class="board', 1) + "\n"
html += "</body></html>\n"
(out / "alltech-marketing.html").write_text(html)
print("wrote", out / "alltech-marketing.html", len(boards), "artboards")
