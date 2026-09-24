/* ============================================================
 * 数据文件：个人信息与项目列表（来源：js/profile.md）
 * 扩展方式：向 PROJECTS 数组追加一个对象即可，页面自动渲染。
 * 可选 layout 值：
 *   feature —— 通栏大图（大版式）
 *   split   —— 左图右文 / 右图左文（自动交替）
 *   compact —— 小图紧凑条目
 * 可选 image 字段：提供图片 URL 时展示照片，缺省时渲染排版式文字封面。
 * ============================================================ */

const PROFILE = {
  name: "小蔡",
  email: "xiaocai@example.com",
  github: "https://github.com/xiaocai-dev",
  homepage: "https://xiaocai.dev",
  wechat: "xiaocai",
  location: "中国 · 广州",
  skills: [
    { name: "Python", desc: "课语通 · 大语言模型课程问答助手", tags: ["FastAPI", "RAG", "Streamlit"] },
    { name: "Java", desc: "拾光集市 · 校园二手交易平台", tags: ["Spring Boot", "MySQL"] },
    { name: "TypeScript", desc: "轻记账 / 拾光集市 / 城市脉搏", tags: ["微信小程序", "Vue", "ECharts"] },
    { name: "HTML / CSS", desc: "城市脉搏 · 数据可视化大屏", tags: ["Canvas", "SVG"] },
  ],
};

const PROJECTS = [
  {
    layout: "feature",
    category: "移动应用",
    date: "2025.04",
    name: "轻记账",
    summary:
      "面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
    tech: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
  },
  {
    layout: "split",
    category: "Web 应用",
    date: "2025.09",
    name: "拾光集市",
    summary:
      "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    tech: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
  },
  {
    layout: "split",
    category: "数据可视化",
    date: "2026.03",
    name: "城市脉搏",
    summary:
      "城市实时交通与天气数据可视化大屏，集中展示交通、天气和城市运行信息。通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。",
    tech: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
  },
  {
    layout: "feature",
    category: "AI 应用",
    date: "2026.07",
    name: "课语通",
    summary:
      "基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    tech: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
  },
];
