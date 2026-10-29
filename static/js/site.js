// Alltech Solutions: the only script on every page. Menu toggle and the NEPA bulb.
(function () {
  var root = document.documentElement;

  // Menu (small screens). Without JS the nav is always visible.
  var menuBtn = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") !== "true";
      menuBtn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        menuBtn.click();
        menuBtn.focus();
      }
    });
  }

  // NEPA bulb. Lights on = light mode. The storage key matches the inline script in head.html.
  var KEY = "alltech-theme";
  var bulb = document.querySelector(".bulb");
  var bubble = document.querySelector(".nepa-bubble");
  if (!bulb) return;

  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  function isLight() {
    var t = root.dataset.theme;
    return t ? t === "light" : !systemDark.matches;
  }
  function render() {
    var on = isLight();
    bulb.setAttribute("aria-pressed", String(on));
    bulb.querySelector(".visually-hidden").textContent = on ? "Lights on (light mode)" : "Lights off (dark mode)";
  }
  render();
  systemDark.addEventListener("change", render);

  var hideTimer;
  function say(text) {
    bubble.textContent = text;
    bubble.classList.add("is-on");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () { bubble.classList.remove("is-on"); }, 1800);
  }

  // Sound only ever follows a click on the bulb.
  function shout() {
    if (!("speechSynthesis" in window)) return;
    var u = new SpeechSynthesisUtterance("Up NEPA!");
    u.rate = 1.15; u.pitch = 1.4; u.volume = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
  function groan() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    var ctx = new Ctx(), osc = ctx.createOscillator(), gain = ctx.createGain(), t = ctx.currentTime;
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(190, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.9);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t); osc.stop(t + 1.05);
    osc.onended = function () { ctx.close(); };
  }

  bulb.addEventListener("click", function () {
    var next = isLight() ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch (e) {}
    render();
    bulb.classList.remove("is-swinging");
    void bulb.offsetWidth; // restart the swing animation
    bulb.classList.add("is-swinging");
    if (next === "light") { say("Up NEPA!"); shout(); } else { say("Ehhn…"); groan(); }
  });
})();

// "Copy link" buttons on blog posts. Does nothing where the clipboard API is unavailable.
document.addEventListener("click", function (e) {
  var b = e.target.closest && e.target.closest("[data-copy]");
  if (!b || !navigator.clipboard) return;
  navigator.clipboard.writeText(b.dataset.copy).then(function () {
    var was = b.textContent;
    b.textContent = "Link copied";
    setTimeout(function () { b.textContent = was; }, 1600);
  });
});
