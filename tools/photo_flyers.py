"""Build marketing/alltech-photo-flyers.html: photo flyers from the owner's WhatsApp images
(crops in marketing/source/) and the WhatsApp Status animation.

    python3 tools/photo_flyers.py
    node tools/render_marketing.cjs marketing/alltech-photo-flyers.html   # stills -> marketing/png/
    node tools/render_status_video.cjs                                    # video -> marketing/alltech-status.mp4

Claims are limited to what the owner has confirmed: the three ECU services from his flyer,
parts from Ladipo tested before handover, price on request. Contact details come from hugo.toml;
SITE_URL (the Vercel setting) overrides the web address.
"""
import os
import pathlib
import tomllib

ROOT = pathlib.Path(__file__).resolve().parent.parent
cfg = tomllib.loads((ROOT / "hugo.toml").read_text())
c = cfg["params"]["contact"]
WA, EMAIL = c["whatsappDisplay"], c["email"]
SITE = os.environ.get("SITE_URL", cfg["baseURL"]).replace("https://", "").rstrip("/")

F = "../static/fonts"
SRC = "source"
LOGO = "../static/brand/icon-512.png"

# A hand-drawn arrow and underline: slightly wobbly paths, the way a pen draws them.
ARROW = '<svg class="arrow" viewBox="0 0 220 160" aria-hidden="true"><path d="M8 18c40-10 96 2 128 38 22 25 30 52 34 82" /><path d="M146 118l26 24 18-34" /></svg>'
SCRIBBLE = '<svg class="scribble" viewBox="0 0 600 30" preserveAspectRatio="none" aria-hidden="true"><path d="M4 20c80-12 170-14 260-8 90 6 200 4 330-10" /></svg>'
TAPE = '<span class="tape" aria-hidden="true"></span>'

CSS = f"""
@font-face {{ font-family: "Archivo"; font-weight: 400 800; font-stretch: 75% 100%; src: url("{F}/archivo-normal-latin.woff2"); }}
@font-face {{ font-family: "Pixelify Sans"; font-weight: 400 700; src: url("{F}/pixelify-sans-latin.woff2"); }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; background: transparent; display: grid; gap: 40px; padding: 40px; justify-content: center; font-family: "Archivo", sans-serif; }}
.board {{ position: relative; overflow: hidden; background: #0B1510; color: #E2F5E9; }}
.brand {{ display: flex; align-items: center; gap: 16px; }}
.brand img {{ width: 76px; height: 76px; border: 4px solid #E2F5E9; }}
.brand b {{ font: 700 40px/1 "Pixelify Sans"; color: #E2F5E9; }}
.brand b span {{ background: #4ADE80; color: #0B1510; padding: 2px 10px; margin-left: 8px; }}
.px {{ font-family: "Pixelify Sans"; }}
.sticker {{ display: inline-block; background: #4ADE80; color: #0B1510; border: 4px solid #0B1510; font: 600 30px/1 "Pixelify Sans"; text-transform: uppercase; padding: 12px 18px 10px; }}
.tape {{ position: absolute; width: 150px; height: 42px; background: rgb(220 252 231 / .72); transform: rotate(-8deg); box-shadow: none; }}
.arrow, .scribble {{ position: absolute; fill: none; stroke: #39FF88; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
.scanlines {{ position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgb(0 0 0 / .18) 0 2px, transparent 2px 6px); pointer-events: none; }}
.wa {{ display: inline-flex; align-items: center; gap: 18px; background: #4ADE80; color: #0B1510; border: 5px solid #0B1510; padding: 16px 26px; font: 800 56px/1 "Archivo"; }}
.wa svg {{ width: 52px; height: 52px; fill: none; stroke: currentColor; stroke-width: 2.4; }}
.small {{ font-size: 28px; color: #A7B4C6; }}

/* Portrait poster */
.portrait {{ width: 1080px; height: 1350px; }}
.portrait .photo {{ position: absolute; inset: 0 0 auto 0; height: 760px; background: url("{SRC}/sports-car-duotone.jpg") center 55% / cover; clip-path: polygon(0 0, 100% 0, 100% 82%, 0 100%); }}
.portrait .brand {{ position: absolute; top: 56px; left: 60px; }}
.portrait .sticker.where {{ position: absolute; top: 70px; right: 70px; transform: rotate(6deg); }}
.portrait .sticker.where + .tape {{ top: 50px; right: 36px; width: 110px; height: 36px; transform: rotate(28deg); }}
.portrait .copy {{ position: absolute; left: 60px; right: 60px; top: 735px; }}
.portrait h1 {{ font: 600 72px/1.02 "Pixelify Sans"; margin: 0 0 22px; max-width: 13ch; }}
.portrait h1 em {{ font-style: normal; color: #39FF88; }}
.portrait p.lead {{ font-size: 32px; line-height: 1.35; margin: 0 0 22px; max-width: 30ch; }}
.portrait .chips {{ display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; }}
.portrait .chips span {{ border: 3px solid #4ADE80; padding: 10px 16px; font: 700 26px/1 "Archivo"; }}
.portrait .arrow {{ width: 120px; left: 625px; top: 1175px; transform: scaleX(-1) rotate(-14deg); }}
.portrait .contact {{ display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }}

/* Square checklist */
.square {{ width: 1080px; height: 1080px; background: #F0FDF4; color: #0F172A; }}
.square .band {{ position: absolute; inset: 0 0 auto 0; height: 330px; background: url("{SRC}/engine-bay-duotone.jpg") center / cover; }}
.square .torn {{ position: absolute; left: 0; right: 0; top: 300px; height: 60px; }}
.square .brand {{ position: absolute; top: 50px; left: 56px; }}
.square .bubble {{ position: absolute; right: 60px; top: 58px; background: #F0FDF4; color: #0B1510; border: 5px solid #0B1510; padding: 14px 24px; font: 700 40px/1 "Pixelify Sans"; transform: rotate(-4deg); }}
.square .bubble::after {{ content: ""; position: absolute; right: 44px; bottom: -32px; border-style: solid; border-width: 32px 0 0 26px; border-color: #0B1510 transparent transparent; }}
.square .copy {{ position: absolute; left: 70px; right: 70px; top: 380px; }}
.square h2 {{ font: 600 70px/1.05 "Pixelify Sans"; margin: 0 0 8px; }}
.square .scribble {{ width: 520px; height: 26px; left: 66px; top: 455px; stroke: #15803D; }}
.square ul {{ list-style: none; padding: 0; margin: 40px 0 0; display: grid; gap: 16px; }}
.square li {{ display: grid; grid-template-columns: 58px 1fr; gap: 22px; align-items: center; font: 700 40px/1.15 "Archivo"; }}
.square li i {{ width: 52px; height: 52px; border: 5px solid #0F172A; display: grid; place-items: center; }}
.square li i::after {{ content: ""; width: 26px; height: 14px; border: solid #15803D; border-width: 0 0 7px 7px; transform: rotate(-45deg) translate(3px, -3px); }}
.square li small {{ display: block; font: 500 26px/1.3 "Archivo"; color: #475569; }}
.square .tag {{ position: absolute; right: 56px; bottom: 40px; transform: rotate(-3deg); background: #0B1510; color: #E2F5E9; padding: 26px 30px 24px; border: 5px solid #0B1510; }}
.square .tag .tape {{ top: -22px; left: 50%; margin-left: -75px; transform: rotate(3deg); }}
.square .tag b {{ display: block; font: 800 52px/1 "Archivo"; color: #4ADE80; margin-top: 6px; }}
.square .site {{ position: absolute; left: 70px; bottom: 50px; font: 600 28px/1.3 "Archivo"; color: #475569; }}

/* Status poster (still of the video's last frame) and the animated version */
.status {{ width: 1080px; height: 1920px; }}
"""

WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 9.5c.5 2 2 3.6 4.4 4.6l1.2-1.1 1.9.9-.4 1.7c-3.6.2-7.5-3.4-7.7-7l1.7-.4.9 1.9z"/></svg>'

portrait = f'''<section id="photo-flyer-portrait" class="board portrait">
  <div class="photo"></div><div class="scanlines" style="height:760px"></div>
  <div class="brand"><img src="{LOGO}" alt=""><b>Alltech<span>Solutions</span></b></div>
  <span class="sticker where">Lagos</span>{TAPE}
  <div class="copy">
    <h1>Swapped the ECU and it <em>still won’t start?</em></h1>
    <p class="lead">A replacement ECU has to be programmed to your car. That’s our job.</p>
    <div class="chips"><span>ECU programming &amp; cloning</span><span>Wiping / virginising</span><span>Remapping</span></div>
    <div class="contact"><span class="wa">{WA_ICON}{WA}</span><span class="small">{SITE}</span></div>
  </div>
  {ARROW}
</section>'''

square = f'''<section id="photo-flyer-square" class="board square">
  <div class="band"></div>
  <svg class="torn" viewBox="0 0 1080 60" preserveAspectRatio="none" aria-hidden="true"><path fill="#F0FDF4" d="M0 34 L40 22 L78 38 L120 18 L170 36 L214 24 L262 40 L318 20 L360 34 L412 16 L466 38 L520 22 L566 36 L620 18 L668 34 L720 20 L772 40 L830 22 L880 36 L936 18 L984 34 L1040 22 L1080 32 L1080 60 L0 60 Z"/></svg>
  <div class="brand"><img src="{LOGO}" alt=""><b>Alltech<span>Solutions</span></b></div>
  <span class="bubble">Ladipo! Ladipo!</span>
  <div class="copy">
    <h2>What we do on the bench</h2>
    <ul>
      <li><i></i><span>ECU programming &amp; cloning<small>Your old ECU’s data on a replacement</small></span></li>
      <li><i></i><span>ECU wiping / virginising<small>A used ECU made ready for your car</small></span></li>
      <li><i></i><span>Remapping &amp; calibration<small>After a repair or a part change</small></span></li>
      <li><i></i><span>Modules from Ladipo<small>Tested before handover · price on request</small></span></li>
    </ul>
  </div>
  {SCRIBBLE}
  <div class="tag">{TAPE}<span class="px" style="font-size:28px">WhatsApp</span><b>{WA}</b></div>
  <div class="site">{EMAIL}<br>{SITE}</div>
</section>'''

out = ROOT / "marketing"
html = ("<!doctype html><html lang='en'><meta charset='utf-8'><title>Alltech photo flyers</title><style>" + CSS + "</style><body>\n"
        "<!-- Generated by tools/photo_flyers.py. Edit the script, then run it again. -->\n" + portrait + "\n" + square + "\n</body></html>\n")
(out / "alltech-photo-flyers.html").write_text(html)

# ── WhatsApp Status animation: 9 seconds, 1080x1920. Every animation is time-based so the
#    renderer can step through it frame by frame (tools/render_status_video.cjs).
wave_bits = [1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]
def wave(y_rec, y_dom, w=960):
    step, d, x, prev = w / len(wave_bits), f"M0 {y_rec}", 0, 1
    for b in wave_bits:
        y = y_rec if b else y_dom
        if b != prev:
            d += f"L{x:.0f} {y_rec if prev else y_dom}L{x + 4:.0f} {y}"
        x += step; d += f"L{x:.0f} {y}"; prev = b
    return d

ANIM_CSS = CSS + f"""
body {{ padding: 0; display: block; }}
.status {{ background: #0B1510; background-image: repeating-linear-gradient(0deg, rgb(57 255 136 / .05) 0 2px, transparent 2px 8px), radial-gradient(rgb(57 255 136 / .14) 2px, transparent 2.6px); background-size: auto, 24px 24px; }}
.status .brand {{ position: absolute; top: 90px; left: 70px; }}
.scope {{ position: absolute; left: 60px; right: 60px; top: 240px; height: 420px; border: 6px solid #4ADE80; background: #06110B; }}
.scope svg {{ width: 100%; height: 100%; }}
.trace {{ fill: none; stroke-width: 7; stroke-linejoin: round; stroke-dasharray: 2200; stroke-dashoffset: 2200; animation: draw 1.6s .2s linear forwards; filter: drop-shadow(0 0 6px currentColor); }}
.h1a {{ position: absolute; left: 70px; right: 70px; top: 730px; font: 600 118px/1 "Pixelify Sans"; margin: 0; opacity: 0; animation: pop .5s .9s cubic-bezier(.2,1.6,.4,1) forwards; }}
.h1b {{ position: absolute; left: 70px; right: 70px; top: 990px; font: 600 104px/1.02 "Pixelify Sans"; margin: 0; color: #39FF88; opacity: 0; animation: glitch .7s 2s steps(1) forwards; }}
.cards {{ position: absolute; left: 70px; right: 70px; top: 1290px; display: grid; gap: 22px; }}
.cards span {{ display: block; background: #4ADE80; color: #0B1510; border: 5px solid #0B1510; outline: 4px solid #4ADE80; padding: 22px 28px; font: 700 50px/1 "Archivo"; opacity: 0; }}
.cards span:nth-child(1) {{ transform: rotate(-2deg); animation: drop .45s 3.4s cubic-bezier(.2,1.5,.5,1) forwards; }}
.cards span:nth-child(2) {{ transform: rotate(1.5deg); animation: drop .45s 3.9s cubic-bezier(.2,1.5,.5,1) forwards; }}
.cards span:nth-child(3) {{ transform: rotate(-1deg); animation: drop .45s 4.4s cubic-bezier(.2,1.5,.5,1) forwards; }}
.ticker {{ position: absolute; left: 0; right: 0; bottom: 70px; border-block: 5px solid #4ADE80; padding: 18px 0; overflow: hidden; white-space: nowrap; }}
.ticker div {{ display: flex; width: max-content; gap: 36px; font: 600 46px/1 "Pixelify Sans"; color: #4ADE80; animation: slide 9s linear forwards; }}
@keyframes slide {{ to {{ transform: translateX(-50%); }} }}
.final {{ position: absolute; inset: 0; background: #0B1510; opacity: 0; animation: fadein .5s 6s forwards; }}
.final .photo {{ position: absolute; inset: 0 0 auto 0; height: 860px; background: url("{SRC}/sports-car-duotone.jpg") center / cover; clip-path: polygon(0 0, 100% 0, 100% 86%, 0 100%); }}
.final .brand {{ top: 90px; }}
.final h2 {{ position: absolute; left: 70px; right: 70px; top: 930px; font: 600 96px/1.04 "Pixelify Sans"; margin: 0; }}
.final p {{ position: absolute; left: 70px; right: 70px; top: 1270px; font: 500 44px/1.35 "Archivo"; margin: 0; color: #E2F5E9; }}
.final .wa {{ position: absolute; left: 70px; top: 1470px; font-size: 76px; padding: 24px 34px; animation: pulse 1s 7s ease-in-out 2; }}
.final .wa svg {{ width: 70px; height: 70px; }}
.final .small {{ position: absolute; left: 70px; top: 1680px; font-size: 36px; }}
@keyframes draw {{ to {{ stroke-dashoffset: 0; }} }}
@keyframes pop {{ 0% {{ opacity: 0; transform: scale(.4) rotate(-6deg); }} 100% {{ opacity: 1; transform: scale(1) rotate(0); }} }}
@keyframes glitch {{ 0% {{ opacity: 1; transform: translateX(-30px); }} 15% {{ transform: translateX(22px); color: #FB923C; }} 30% {{ transform: translateX(-10px); color: #39FF88; }} 45% {{ transform: translateX(6px); }} 60%, 100% {{ opacity: 1; transform: none; }} }}
@keyframes drop {{ 0% {{ opacity: 0; translate: 0 -120px; }} 100% {{ opacity: 1; translate: 0 0; }} }}
@keyframes fadein {{ to {{ opacity: 1; }} }}
@keyframes pulse {{ 50% {{ transform: scale(1.06); }} }}
"""
status = f'''<section id="status" class="board status">
  <div class="brand"><img src="{LOGO}" alt=""><b>Alltech<span>Solutions</span></b></div>
  <div class="scope"><svg viewBox="0 0 960 400" preserveAspectRatio="none" aria-hidden="true">
    <path class="trace" style="color:#39FF88;stroke:#39FF88" d="{wave(150, 70)}"/>
    <path class="trace" style="color:#FB923C;stroke:#FB923C" d="{wave(250, 330)}"/></svg></div>
  <h1 class="h1a">Car won’t start?</h1>
  <p class="h1b">It might be the computer.</p>
  <div class="cards"><span>ECU programming &amp; cloning</span><span>ECU wiping / virginising</span><span>Remapping &amp; calibration</span></div>
  <div class="ticker" aria-hidden="true"><div><span>ECU PROGRAMMING</span><span>·</span><span>CLONING</span><span>·</span><span>VIRGINISING</span><span>·</span><span>REMAPPING</span><span>·</span><span>LADIPO MARKET</span><span>·</span><span>LAGOS</span><span>·</span><span>ECU PROGRAMMING</span><span>·</span><span>CLONING</span><span>·</span><span>VIRGINISING</span><span>·</span><span>REMAPPING</span><span>·</span><span>LADIPO MARKET</span><span>·</span><span>LAGOS</span><span>·</span><span>ECU PROGRAMMING</span><span>·</span><span>CLONING</span><span>·</span><span>VIRGINISING</span><span>·</span><span>REMAPPING</span><span>·</span><span>LADIPO MARKET</span><span>·</span><span>LAGOS</span><span>·</span><span>ECU PROGRAMMING</span><span>·</span><span>CLONING</span><span>·</span><span>VIRGINISING</span><span>·</span><span>REMAPPING</span><span>·</span><span>LADIPO MARKET</span><span>·</span><span>LAGOS</span><span>·</span></div></div>
  <div class="final">
    <div class="photo"></div>
    <div class="brand"><img src="{LOGO}" alt=""><b>Alltech<span>Solutions</span></b></div>
    <h2>Send the part number. We’ll sort the rest.</h2>
    <p>Programming, cloning and parts from Ladipo, in Lagos. Price on request.</p>
    <span class="wa">{WA_ICON}{WA}</span>
    <span class="small">{EMAIL} · {SITE}</span>
  </div>
</section>'''
(out / "alltech-status.html").write_text("<!doctype html><html lang='en'><meta charset='utf-8'><title>Alltech WhatsApp Status</title><style>" + ANIM_CSS + "</style><body>\n<!-- Generated by tools/photo_flyers.py -->\n" + status + "\n</body></html>\n")
print("wrote alltech-photo-flyers.html (2 flyers) and alltech-status.html")
