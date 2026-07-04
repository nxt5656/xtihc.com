# Project Guidelines & Conventions

## 🌐 多语言支持与同步规范（强规则）

本项目是一个基于 VitePress 的多语言（简体中文、英语、日语）博客站点。为了保证多语言内容的同步性与用户体验，特制定以下**强规则**，所有开发人员、编辑人员及 AI 助手必须严格遵守：

### 🚨 核心强规则（强制要求）

1. **同步新增原则：**
   每次在 `docs/posts/` 目录下新增一篇中文文章时，**必须同时**在 `docs/en/posts/`（英文）和 `docs/ja/posts/`（日文）目录下同步生成该文章的对应语言翻译版本。不允许出现某一语种文章缺失的情况。
   
2. **侧边栏同步更新：**
   新增文章后，必须同步修改 `docs/.vitepress/config.mts` 配置文件，在 `locales` 下的 `root`、`en` 和 `ja` 各自的 `sidebar` 配置中添加新文章的链接与对应语种的标题。

3. **Frontmatter 元数据规范：**
   每篇新建文章头部的 Frontmatter 必须包含以下字段：
   - `title`: 对应语种的标题。
   - `lang`: 该语种的标识符（中文为 `zh-CN`，英文为 `en-US`，日文为 `ja-JP`）。
   - `tags`: 该语种对应的标签数组。

### 🏗️ 技术架构约定

- **文章抓取数据源 (`posts.data.ts`)：** 
  使用 `createContentLoader('**/posts/**/*.md')` 全局扫描所有语言目录下的文章。
  
- **组件语言过滤 (`TagsPage.vue` & `RandomPosts.vue`)：**
  自定义组件均已实现了根据当前页面路由前缀（`/`、`/en/`、`/ja/`）进行自动语言过滤的机制。开发新组件或修改现有组件时，必须确保其读取 `useData()` 的 `page.value.relativePath` 并只展示与当前前缀匹配的文章，严禁将不同语言的文章混杂在一起。

- **站点地图 (`sitemap.xml`)：**
  VitePress 会自动为每篇文章生成多语言交叉互链（`rel="alternate" hreflang="..."`），修改配置时切勿破坏 `locales` 的映射关系。
