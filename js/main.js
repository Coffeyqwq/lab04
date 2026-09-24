/* ============================================================
 * 页面渲染与交互
 *  1. 根据 data.js 渲染项目列表（三种杂志版式交替）
 *  2. 渲染技能列表与联系方式
 *  3. 导航交互：移动端菜单、滚动高亮、滚动时头部描边
 *  4. 项目区块进入视口时的轻微浮现动画
 * ============================================================ */

(function () {
  "use strict";

  /* ---------- 工具 ---------- */

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));

  const pad2 = (n) => String(n).padStart(2, "0");

  /* 类别 -> 配色钩子（新增类别时在 CSS 中补一个 .cat--xxx 即可） */
  const CAT_CLASS = {
    "移动应用": "miniapp",
    "Web 应用": "web",
    "数据可视化": "data",
    "AI 应用": "ai",
  };

  /* ---------- 项目渲染 ---------- */

  function metaHTML(p) {
    return `
      <li class="proj-date">${esc(p.date)}</li>
      <li class="proj-tech">${p.tech.map(esc).join(" / ")}</li>`;
  }

  function mediaHTML(p, no) {
    if (p.image) {
      return `
      <figure class="proj-media">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">
      </figure>`;
    }
    return `
      <figure class="proj-media">
        <div class="proj-cover cover--${CAT_CLASS[p.category] || "default"}">
          <span class="cover-meta">${esc(p.category)} · ${esc(p.date)}</span>
          <span class="cover-no" aria-hidden="true">${no}</span>
          <span class="cover-name">${esc(p.name)}</span>
        </div>
      </figure>`;
  }

  function featureHTML(p, no) {
    return `
      <article class="proj proj--feature reveal">
        <div class="proj-top">
          <span class="proj-no">${no}</span>
          <h3 class="proj-name">${esc(p.name)}</h3>
          <span class="proj-cat cat--${CAT_CLASS[p.category] || "default"}">${esc(p.category)}</span>
        </div>
        ${mediaHTML(p, no)}
        <div class="proj-info">
          <p class="proj-summary">${esc(p.summary)}</p>
          <ul class="proj-meta">${metaHTML(p)}</ul>
        </div>
      </article>`;
  }

  function splitHTML(p, no, flip) {
    return `
      <article class="proj proj--split${flip ? " flip" : ""} reveal">
        ${mediaHTML(p, no)}
        <div class="proj-text">
          <div class="proj-top">
            <span class="proj-no">${no}</span>
            <span class="proj-cat cat--${CAT_CLASS[p.category] || "default"}">${esc(p.category)}</span>
          </div>
          <h3 class="proj-name">${esc(p.name)}</h3>
          <p class="proj-summary">${esc(p.summary)}</p>
          <ul class="proj-meta">${metaHTML(p)}</ul>
        </div>
      </article>`;
  }

  function compactHTML(p, no) {
    return `
      <article class="proj proj--compact reveal">
        ${mediaHTML(p, no)}
        <div class="proj-text">
          <div class="proj-top">
            <span class="proj-no">${no}</span>
            <h3 class="proj-name">${esc(p.name)}</h3>
            <span class="proj-cat cat--${CAT_CLASS[p.category] || "default"}">${esc(p.category)}</span>
          </div>
          <p class="proj-summary">${esc(p.summary)}</p>
          <ul class="proj-meta">${metaHTML(p)}</ul>
        </div>
      </article>`;
  }

  function renderProjects() {
    const list = document.getElementById("project-list");
    if (!list) return;

    let flip = false; // split 版式左右交替
    list.innerHTML = PROJECTS.map((p, i) => {
      const no = pad2(i + 1);
      let html;
      if (p.layout === "split") {
        html = splitHTML(p, no, flip);
        flip = !flip;
      } else if (p.layout === "compact") {
        html = compactHTML(p, no);
      } else {
        html = featureHTML(p, no);
      }
      return html;
    }).join("");

    const count = document.getElementById("works-count");
    if (count) count.textContent = pad2(PROJECTS.length);
  }

  /* ---------- 技能与联系方式 ---------- */

  function renderSkills() {
    const list = document.getElementById("skill-list");
    if (!list) return;
    list.innerHTML = PROFILE.skills
      .map(
        (s) => `
        <li class="skill-item">
          <span class="skill-name">${esc(s.name)}</span>
          <span class="skill-desc">${esc(s.desc)}</span>
          <span class="skill-tags">${s.tags.map(esc).join(" · ")}</span>
        </li>`
      )
      .join("");
  }

  function renderContact() {
    const mail = document.getElementById("contact-mail");
    if (mail) {
      mail.href = "mailto:" + PROFILE.email;
      mail.textContent = PROFILE.email;
    }

    const list = document.getElementById("contact-list");
    if (!list) return;
    const items = [
      { label: "GitHub", text: "xiaocai-dev", href: PROFILE.github },
      { label: "个人主页", text: "xiaocai.dev", href: PROFILE.homepage },
      { label: "微信", text: PROFILE.wechat },
      { label: "坐标", text: PROFILE.location },
    ];
    list.innerHTML = items
      .map(({ label, text, href }) => {
        const inner = `<span class="label">${esc(label)}</span>${esc(text)}`;
        return `<li>${href ? `<a href="${esc(href)}" target="_blank" rel="noopener">${inner}</a>` : inner}</li>`;
      })
      .join("");
  }

  /* ---------- 导航交互 ---------- */

  function setupNav() {
    const header = document.getElementById("site-header");
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("site-nav");

    // 滚动后给头部加描边
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 移动端菜单开合
    const closeMenu = () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "打开菜单");
    };
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });
    nav.querySelectorAll(".nav-link").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // 滚动高亮当前区块
    const links = [...nav.querySelectorAll(".nav-link")];
    const setActive = (id) =>
      links.forEach((a) => a.classList.toggle("is-active", a.dataset.section === id));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ["works", "about", "contact"].forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) observer.observe(sec);
    });
  }

  /* ---------- 项目浮现动画 ---------- */

  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- 启动 ---------- */

  document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    renderSkills();
    renderContact();
    setupNav();
    setupReveal();
  });
})();
