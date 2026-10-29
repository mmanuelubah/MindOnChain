// The /locked/ page: send an access request, then exchange the emailed code for a session.
(function () {
  var next = new URLSearchParams(location.search).get("next") || "/blog/";
  if (!/^\/[A-Za-z0-9._~\-\/]*$/.test(next) || next.indexOf("//") === 0) next = "/blog/"; // same-site paths only

  function setError(form, field, message) {
    form.querySelectorAll(".field-err").forEach(function (p) { p.textContent = ""; });
    form.querySelectorAll("[aria-invalid]").forEach(function (i) { i.removeAttribute("aria-invalid"); });
    if (!field) return;
    var input = form.querySelector('[name="' + field + '"]');
    var err = input && document.getElementById(input.getAttribute("aria-describedby").split(" ").pop());
    if (input && err) { input.setAttribute("aria-invalid", "true"); err.textContent = message; input.focus(); }
  }

  function send(form, url, payload, onOk) {
    var status = form.querySelector(".form-status");
    var button = form.querySelector("button[type=submit]");
    if (button.disabled) return; // one request at a time
    button.disabled = true;
    status.textContent = "Sending…";
    setError(form);
    fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload), credentials: "same-origin" })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (r) {
        if (r.ok) { onOk(r.data, status); return; }
        status.textContent = r.data.field ? "" : (r.data.error || "Something didn't work. Please try again.");
        if (r.data.field) setError(form, r.data.field, r.data.error);
      })
      .catch(function () { status.textContent = "No connection. Check your data and try again."; })
      .then(function () { button.disabled = false; });
  }

  var req = document.getElementById("access-request");
  req.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = new FormData(req);
    send(req, "/api/access/request", { name: f.get("name"), email: f.get("email"), reason: f.get("reason"), next: next }, function (_, status) {
      status.textContent = "Request sent. If Emmanuel approves, the code will reach " + f.get("email") + ". Keep this page open, or come back to it on this device.";
      document.getElementById("ac-code").focus();
    });
  });

  var codeForm = document.getElementById("access-code");
  codeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    send(codeForm, "/api/access/verify", { code: new FormData(codeForm).get("code") }, function (data, status) {
      status.textContent = "Unlocked. Opening…";
      location.href = data.next || next;
    });
  });
})();
