/* Applies the saved (or system) colour theme before first paint, so there is no flash. */
(function () {
  var root = document.documentElement;
  var theme = "light";
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") theme = saved;
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) theme = "dark";
  } catch (e) {
    /* storage unavailable, so keep light */
  }
  root.setAttribute("data-theme", theme);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0a101a" : "#ffffff");
})();
