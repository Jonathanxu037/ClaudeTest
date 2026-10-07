/* 目录数据只维护这一份；路径相对于包根目录。不要改成 JSON + fetch（本地双击打开会被拦截）。 */
window.NAV_DATA = {
  title: "注册登录（v2.2）",
  href: "index.html",
  children: [
    {
      title: "原型页面",
      href: "prototype/front/age-gate.html",
      children: [
        {
          title: "前台页面",
          href: "prototype/front/age-gate.html",
          children: [
            { title: "21 岁确认弹窗", href: "prototype/front/age-gate.html" },
            { title: "登录注册页", href: "prototype/front/login.html" },
            { title: "人机验证", href: "prototype/front/captcha.html" },
            { title: "短信验证码", href: "prototype/front/otp.html" },
            { title: "新用户设置密码", href: "prototype/front/set-password.html" },
            { title: "三方登录绑定手机号", href: "prototype/front/bind-phone.html" },
            { title: "找回密码", href: "prototype/front/forgot-password.html" },
            { title: "登录成功", href: "prototype/front/home.html" }
          ]
        }
      ]
    },
    {
      title: "文档资料",
      href: "docs/prd.html",
      children: [
        {
          title: "需求开发PRD文档",
          href: "docs/prd.html",
          children: [
            { title: "版本与目录", href: "docs/prd.html#ver" },
            { title: "1. 背景与目标", href: "docs/prd.html#s1" },
            { title: "2. 范围", href: "docs/prd.html#s2" },
            { title: "3. 业务规则", href: "docs/prd.html#s3" },
            { title: "4. 多端差异", href: "docs/prd.html#s4" },
            { title: "5. 后台配置", href: "docs/prd.html#s5" },
            { title: "6. 数据与报表", href: "docs/prd.html#s6" },
            { title: "7. 验收标准", href: "docs/prd.html#s7" },
            { title: "8. 上线方式", href: "docs/prd.html#s8" },
            { title: "9. 风险与依赖", href: "docs/prd.html#s9" },
            { title: "10. 未决问题", href: "docs/prd.html#s10" },
            { title: "11. 与现有资料的冲突", href: "docs/prd.html#s11" },
            { title: "附录 A：评审清单核对", href: "docs/prd.html#apx-a" },
            { title: "附录 B：原型对照", href: "docs/prd.html#apx-b" }
          ]
        },
        { title: "功能自查清单", href: "docs/checklist.html" }
      ]
    }
  ]
};
