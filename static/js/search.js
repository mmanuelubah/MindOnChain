// Site search over /search-index.json (built by Hugo, see layouts/index.searchindex.json).
(function () {
  var script = document.currentScript;
  var form = document.getElementById("search-form");
  var input = document.getElementById("q");
  var statusEl = document.getElementById("search-status");
  var results = document.getElementById("search-results");
  var empty = document.getElementById("search-empty");
  var failed = document.getElementById("search-failed");
  var GROUPS = ["Database", "Guides", "Parts", "Writing", "Books", "Pages"];
  var index = null;

  // Technicians type part numbers many ways: "ME7.5", "me 7.5", "ME75". Compare without spaces and punctuation.
  function compact(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function esc(s) { return s.replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }

  function score(item, words) {
    var title = compact(item.t), keys = compact(item.k), body = compact(item.s + " " + item.b);
    var total = 0;
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (title.indexOf(w) !== -1) total += 10;
      else if (keys.indexOf(w) !== -1) total += 6;
      else if (body.indexOf(w) !== -1) total += 1;
      else return 0; // every word must match somewhere
    }
    return total;
  }

  // Wrap each query word in <mark>, matching across spaces and dots inside the title.
  function highlight(text, words) {
    var html = esc(text);
    words.forEach(function (w) {
      if (w.length < 2) return;
      var pattern = w.split("").map(function (ch) { return ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("[\\s.\\-/]?");
      html = html.replace(new RegExp("(" + pattern + ")", "ig"), "<mark>$1</mark>");
    });
    return html;
  }

  function scope() {
    var checked = form.querySelector('input[name="in"]:checked');
    return checked ? checked.value : "All";
  }

  function run() {
    var q = input.value.trim();
    var where = scope();
    var url = new URL(location.href);
    if (q) url.searchParams.set("q", q); else url.searchParams.delete("q");
    if (where !== "All") url.searchParams.set("in", where); else url.searchParams.delete("in");
    history.replaceState(null, "", url);

    results.innerHTML = "";
    empty.hidden = true;
    if (!q) { statusEl.textContent = ""; return; }
    if (!index) { statusEl.textContent = "Loading…"; return; }

    var words = q.split(/\s+/).map(compact).filter(Boolean);
    var found = index
      .filter(function (it) { return where === "All" || it.g === where; })
      .map(function (it) { return { it: it, s: score(it, words) }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; });

    if (!found.length) {
      statusEl.textContent = "No results for “" + q + "”" + (where !== "All" ? " in " + where : "") + ".";
      empty.querySelector("[data-q]").textContent = q;
      empty.hidden = false;
      return;
    }
    statusEl.textContent = found.length + (found.length === 1 ? " result" : " results") + " for “" + q + "”" + (where !== "All" ? " in " + where : "") + ".";

    var html = "";
    GROUPS.forEach(function (g) {
      var inGroup = found.filter(function (r) { return r.it.g === g; }).slice(0, 25);
      if (!inGroup.length) return;
      html += '<section class="result-group"><h2>' + g + " (" + inGroup.length + ')</h2><ul class="rows">';
      inGroup.forEach(function (r) {
        html += '<li><a class="row-link" href="' + esc(r.it.u) + '"><span class="row-title">' + highlight(r.it.t, q.split(/\s+/)) +
          '</span><span class="row-meta">' + esc(r.it.s) + '</span><svg class="row-go" aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></a></li>';
      });
      html += "</ul></section>";
    });
    results.innerHTML = html;
  }

  var timer;
  input.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(run, 150); });
  form.addEventListener("change", function (e) { if (e.target.name === "in") run(); });
  form.addEventListener("submit", function (e) { e.preventDefault(); run(); });

  var params = new URLSearchParams(location.search);
  input.value = params.get("q") || "";
  var start = params.get("in");
  if (start) { var r = form.querySelector('input[name="in"][value="' + CSS.escape(start) + '"]'); if (r) r.checked = true; }
  if (!input.value) input.focus();

  fetch(script.dataset.index)
    .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(function (data) { index = data; run(); })
    .catch(function () { statusEl.textContent = ""; failed.hidden = false; });
})();
