/* 原型公共脚本：页面间共享状态（sessionStorage，失败时退回内存）、Toast、跳转。
   全部为模拟数据，不调用任何接口。 */
(function () {
  var mem = {};
  var KEY = "rl-proto-v2.2";
  function load() { try { return JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch (e) { return mem; } }
  function save(s) { mem = s; try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var defaults = {
    platform: "H5",          // H5 / iOS / Flutter
    captchaType: 1,          // 1 = Cloudflare，2 = 腾讯滑块，0 = 数字图形码
    termsDefault: true,      // 条款默认勾选（后台开关）
    viaInvite: false,        // 是否通过邀请链接进入
    phone: "",
    registered: true,        // 该手机号是否已注册
    lastMethod: "otp",
    lastAccount: "",
    lastLogin: 0,
    pwdFails: 0,
    otpTries: 5,
    otpEnd: 0,
    otpPurpose: "login",     // login / bind / forgot
    captchaMode: "otp",      // otp / risk
    sso: "",
    phoneBound: true,
    longInactive: false,
    status: "normal",        // normal / frozen / deactivated
    bioAsked: false
  };
  var P = window.P = {
    get: function (k) { var s = load(); return k in s ? s[k] : defaults[k]; },
    set: function (k, v) { var s = load(); s[k] = v; save(s); },
    reset: function () { save({}); },
    toast: function (msg, ms) {
      var t = document.getElementById("toast");
      if (!t) return;
      t.textContent = msg; t.hidden = false;
      clearTimeout(P._t); P._t = setTimeout(function () { t.hidden = true; }, ms || 2200);
    },
    go: function (page, delay) {
      if (delay) setTimeout(function () { location.href = page; }, delay);
      else location.href = page;
    },
    mask: function (p) { return p && p.length === 11 ? "+63 " + p.slice(1, 4) + " *** " + p.slice(-4) : "+63 9xx *** xxxx"; },
    phoneErr: function (v) {
      if (!v) return "This field is required";
      if (!/^09/.test(v)) return "Please enter a mobile number starting with 09.";
      if (!/^09\d{9}$/.test(v)) return "Please enter an 11-digit mobile number";
      return "";
    },
    /* 手机号输入框：获得焦点时自动填 0；输入 009… 时去掉多余的 0；只保留数字；x 清空后立即提示必填 */
    bindPhone: function (input, box, err, clearBtn) {
      input.addEventListener("focus", function () { if (!input.value) input.value = "0"; });
      input.addEventListener("input", function () {
        var v = input.value.replace(/\D/g, "");
        if (/^009/.test(v)) v = v.slice(1);
        input.value = v.slice(0, 11);
        if (err.textContent) { err.textContent = ""; box.classList.remove("bad"); }
      });
      if (clearBtn) clearBtn.addEventListener("click", function () {
        input.value = ""; err.textContent = "This field is required"; box.classList.add("bad");
      });
    },
    check: function (input, box, err) {
      var m = P.phoneErr(input.value.trim());
      err.textContent = m; box.classList.toggle("bad", !!m);
      return !m;
    }
  };
})();
