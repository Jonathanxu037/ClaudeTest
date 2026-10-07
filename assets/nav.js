/* 左侧四级目录栏：读取 window.NAV_DATA，在每个页面生成。
   每个页面在引入本文件前设置 window.NAV_ROOT（到包根目录的相对路径，如 "../../"）。 */
(function () {
  var ROOT = window.NAV_ROOT || "";
  var DATA = window.NAV_DATA;
  if (!DATA) return;

  function norm(p) { p = decodeURIComponent(p); return /\/$/.test(p) ? p + "index.html" : p; }
  function absPath(href) { return norm(new URL(ROOT + href.split("#")[0], location.href).pathname); }
  var here = norm(location.pathname);

  var all = [];
  function walk(node, level, parent) {
    node.level = level; node.parent = parent; all.push(node);
    (node.children || []).forEach(function (c) { walk(c, level + 1, node); });
  }
  walk(DATA, 1, null);

  // 当前页面：路径相同、且没有 hash 的最深节点
  var current = null;
  all.forEach(function (n) {
    if (n.href && n.href.indexOf("#") < 0 && absPath(n.href) === here) {
      if (!current || n.level > current.level) current = n;
    }
  });
  var open = {};
  function openBranch(n) { while (n) { open[all.indexOf(n)] = true; n = n.parent; } }
  if (current) openBranch(current);
  open[0] = true;

  var aside = document.createElement("aside");
  aside.className = "sidenav";
  aside.setAttribute("aria-label", "目录");
  var btn = document.createElement("button");
  btn.className = "navbtn"; btn.type = "button"; btn.setAttribute("aria-label", "打开目录"); btn.textContent = "☰";
  var mask = document.createElement("div"); mask.className = "navmask";
  btn.onclick = function () { document.body.classList.toggle("nav-open"); };
  mask.onclick = function () { document.body.classList.remove("nav-open"); };

  function build(n) {
    var li = document.createElement("li");
    var idx = all.indexOf(n);
    li.className = "l" + n.level + (n.children && !open[idx] ? " closed" : "");
    li.dataset.idx = idx;
    var row = document.createElement("div"); row.className = "row";
    var tw = document.createElement("button"); tw.type = "button";
    tw.className = "tw" + (n.children ? "" : " leaf");
    tw.setAttribute("aria-label", "展开或收起");
    tw.textContent = n.children ? (open[idx] ? "▼" : "▶") : "";
    tw.onclick = function () { setOpen(li, li.classList.contains("closed")); };
    row.appendChild(tw);
    var a = document.createElement("a");
    a.textContent = n.title;
    if (n.href) a.href = ROOT + n.href;
    if (n === current) { a.className = "cur"; a.setAttribute("aria-current", "page"); }
    a.onclick = function () {
      if (n.children) setOpen(li, true);
      var samePage = n.href && absPath(n.href) === here;
      if (samePage) document.body.classList.remove("nav-open");
    };
    n.el = a;
    row.appendChild(a);
    li.appendChild(row);
    if (n.children) {
      var ul = document.createElement("ul");
      n.children.forEach(function (c) { ul.appendChild(build(c)); });
      li.appendChild(ul);
    }
    return li;
  }
  function setOpen(li, on) {
    li.classList.toggle("closed", !on);
    var tw = li.querySelector(":scope > .row > .tw");
    if (tw && !tw.classList.contains("leaf")) tw.textContent = on ? "▼" : "▶";
  }

  var ul = document.createElement("ul");
  ul.appendChild(build(DATA));
  aside.appendChild(ul);

  function mount() {
    document.body.insertBefore(mask, document.body.firstChild);
    document.body.insertBefore(aside, document.body.firstChild);
    document.body.insertBefore(btn, document.body.firstChild);
    var cur = aside.querySelector("a.cur");
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "center" });
    trackSections();
  }

  // 同一页面内的章节（带 #）：按滚动位置高亮
  function trackSections() {
    var secs = all.filter(function (n) { return n.href && n.href.indexOf("#") > 0 && absPath(n.href) === here; });
    if (!secs.length) return;
    function update() {
      var y = window.scrollY + 110, hit = null;
      secs.forEach(function (n) {
        var el = document.getElementById(n.href.split("#")[1]);
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) hit = n;
      });
      secs.forEach(function (n) { n.el.classList.toggle("cur-sec", n === hit); });
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    update();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
