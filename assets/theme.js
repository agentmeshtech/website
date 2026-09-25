// Agent Mesh: theme toggle and gentle reveal-on-scroll. The site works fully without this file.
(function () {
  var root = document.documentElement;
  root.classList.add("theme-ready");
  var button = document.querySelector("[data-theme-toggle]");

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (button) button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    try { localStorage.setItem("am-theme", theme); } catch (e) { /* storage blocked: keep for this page only */ }
  }

  if (button) {
    button.setAttribute("aria-pressed", root.getAttribute("data-theme") === "light" ? "true" : "false");
    button.addEventListener("click", function () {
      apply(root.getAttribute("data-theme") === "light" ? "dark" : "light");
    });
  }

  var items = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!items.length || reduce || !("IntersectionObserver" in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach(function (el) { observer.observe(el); });
  root.classList.add("reveal-ready");
})();
