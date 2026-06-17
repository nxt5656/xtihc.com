import DefaultTheme from 'vitepress/theme'
import TagsPage from './components/TagsPage.vue'
import './custom.css' // 可以保留你原有的样式配置

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册组件，这样在任何 Markdown 页面都能直接通过 <TagsPage /> 引用！
    app.component('TagsPage', TagsPage)
  }
}