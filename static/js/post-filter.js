// Title search and tag filter for /posts/. Without JS the full list shows and the controls stay hidden.
(function () {
  var box = document.querySelector("[data-post-filter]");
  if (!box) return;
  box.hidden = false;
  var input = document.getElementById("post-q");
  var buttons = box.querySelectorAll(".tag-btn");
  var items = Array.prototype.slice.call(document.querySelectorAll("#post-years .post-item"));
  var years = document.querySelectorAll(".post-year");
  var count = box.querySelector("[data-count]");
  var none = document.querySelector("[data-none]");
  var tag = "";

  function visible() { return items.filter(function (li) { return !li.hidden; }); }

  function apply() {
    var q = input.value.trim().toLowerCase();
    items.forEach(function (li) {
      var okTitle = !q || li.dataset.title.indexOf(q) !== -1;
      var okTag = !tag || (" " + li.dataset.tags + " ").indexOf(" " + tag + " ") !== -1;
      li.hidden = !(okTitle && okTag);
    });
    years.forEach(function (y) { y.hidden = !y.querySelector(".post-item:not([hidden])"); });
    var n = visible().length;
    none.hidden = n > 0;
    count.textContent = (q || tag) ? n + (n === 1 ? " post" : " posts") : "";
  }

  input.addEventListener("input", apply);
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      tag = b.dataset.tag;
      buttons.forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
      apply();
    });
  });

  // Arrow keys move from the search box through the visible results.
  function links() { return visible().map(function (li) { return li.querySelector("a"); }); }
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { var l = links(); if (l[0]) { e.preventDefault(); l[0].focus(); } }
    if (e.key === "Enter") { var f = links()[0]; if (f && input.value.trim()) { e.preventDefault(); location.href = f.href; } }
  });
  document.getElementById("post-years").addEventListener("keydown", function (e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    var l = links(), i = l.indexOf(document.activeElement);
    if (i === -1) return;
    e.preventDefault();
    if (e.key === "ArrowDown" && l[i + 1]) l[i + 1].focus();
    if (e.key === "ArrowUp") (l[i - 1] || input).focus();
  });
})();
