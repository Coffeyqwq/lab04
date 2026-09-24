# 小蔡 · 个人作品集

一个使用原生 HTML / CSS / JavaScript 手工搭建的个人作品集网站，采用杂志编辑式排版，无需任何框架、构建工具或第三方依赖。

## 功能特性

- **杂志式首屏**：大字号衬线标题、刊头信息条与个人简介，呈现封面式视觉
- **项目展示**：由 JavaScript 根据 [js/data.js](js/data.js) 数据自动渲染，三种杂志版式交替排布
  - `feature` —— 通栏大图版式
  - `split` —— 左图右文 / 右图左文（自动左右交替）
  - `compact` —— 小图紧凑条目
- **文字封面兜底**：项目未提供图片时，自动生成带类别配色的排版式文字封面
- **深浅色主题切换**：导航栏右侧按钮一键切换，选择通过 `localStorage` 记忆，刷新不丢失
- **滚动交互**：导航高亮当前区块、滚动浮现动画、移动端全屏折叠菜单
- **响应式适配**：桌面端与移动端均可正常浏览

## 项目结构

```
lab04/
├── index.html          # 页面结构（首屏 / 作品 / 关于我 / 联系方式）
├── css/
│   └── style.css       # 全部样式：设计变量 → 版式 → 动画 → 响应式
├── js/
│   ├── data.js         # 数据文件：个人信息 PROFILE 与项目列表 PROJECTS
│   └── main.js         # 渲染与交互：项目渲染、主题切换、导航、动画
├── images/             # 项目图片目录（可放入截图，在 data.js 中引用）
└── .gitignore
```

## 本地运行

无需安装依赖，任选其一：

```bash
# 方式一：直接双击打开
index.html

# 方式二：启动本地静态服务器（推荐）
python -m http.server 8080
# 然后访问 http://localhost:8080
```

## 如何更新内容

所有展示内容集中在 [js/data.js](js/data.js) 中维护，无需改动页面代码：

- **新增项目**：向 `PROJECTS` 数组追加一个对象，指定 `layout`、`category`、`date`、`name`、`summary`、`tech` 字段，页面自动渲染并更新作品计数
- **可选配图**：为项目对象增加 `image` 字段（如 `images/xxx.png`）即显示图片，缺省时使用文字封面
- **修改技能 / 联系方式**：编辑 `PROFILE` 对象的 `skills`、`email`、`github` 等字段

## 技术说明

- 纯原生 HTML / CSS / JS，零依赖、零构建
- 主题色、字体、间距均通过 CSS 自定义属性（设计令牌）管理，深色主题通过变量覆盖实现
- 使用 `IntersectionObserver` 实现滚动高亮与浮现动画
- 对所有动态渲染的内容做了 HTML 转义，防止注入

## 作者

小蔡 · 广州软件学院软件工程在读

- Email：xiaocai@example.com
- GitHub：[xiaocai-dev](https://github.com/xiaocai-dev)
