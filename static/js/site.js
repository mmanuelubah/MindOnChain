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

  // The motion graphic: a full-screen flash for "Up NEPA!", a flicker-out when the light goes.
  var status = document.querySelector(".nepa-status");
  var show = document.querySelector(".nepa-show");
  var showText = show && show.querySelector(".nepa-show-text");
  var showTimer;
  function play(on) {
    var text = on ? "Up NEPA!" : "Damn, they’ve taken the light.";
    status.textContent = text; // screen readers hear the line; the graphic itself is hidden from them
    if (!show) return;
    show.classList.remove("is-on", "is-off");
    void show.offsetWidth; // restart the animation
    showText.textContent = text;
    show.classList.add(on ? "is-on" : "is-off");
    clearTimeout(showTimer);
    showTimer = setTimeout(function () { show.classList.remove("is-on", "is-off"); }, 2400);
  }

  bulb.addEventListener("click", function () {
    var next = isLight() ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch (e) {}
    render();
    bulb.classList.remove("is-swinging");
    void bulb.offsetWidth; // restart the swing animation
    bulb.classList.add("is-swinging");
    play(next === "light");
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
