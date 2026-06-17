import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "xtihc",
  description: "记录技术、生活与思考的技术书屋",
  
  // 核心避坑：绑定自定义域名后，base 路径必须设为 '/' [15]
  base: '/',
  
  // 开启 cleanUrls 隐藏链接末尾的 .html [18]
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      //{ text: '博客', link: '/blog/start' }
    ],

    // 左侧侧边栏导航 [12]
    sidebar: {
      '//': [
        {
          text: '博客',
          items: [
            { text: '我回来了~', link: '/blog/start' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://xtihc.com' }
    ],

    // 启用极速离线本地搜索 [10]
    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present xtihc.com'
    }
  }
})
