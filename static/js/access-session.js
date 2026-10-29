// Runs on locked pages after access is granted. Keeps the one-hour session alive while the
// page is open and visible; after an hour away the next check finds it expired and locks.
(function () {
  var HOUR = 60 * 60 * 1000, hiddenAt = null;
  function refresh() {
    fetch("/api/access/refresh", { method: "POST", credentials: "same-origin" })
      .then(function (r) { if (r.status === 401) location.reload(); }) // middleware sends the reader to /locked/
      .catch(function () {}); // offline: try again next time
  }
  setInterval(function () { if (!document.hidden) refresh(); }, 10 * 60 * 1000);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { hiddenAt = Date.now(); return; }
    if (hiddenAt && Date.now() - hiddenAt >= HOUR) location.reload();
    else refresh();
  });
})();
