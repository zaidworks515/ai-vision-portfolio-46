/* Applies the colour theme before first paint, so there is no flash.
   Bright mode is the default; dark mode only when the visitor chose it. */
(function () {
  var root = document.documentElement;
  var theme = "light";
  try {
    if (localStorage.getItem("theme") === "dark") theme = "dark";
  } catch (e) {
    /* storage unavailable, so keep light */
  }
  root.setAttribute("data-theme", theme);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#171a21" : "#ffffff");
})();
