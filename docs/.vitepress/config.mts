import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "xtihc",
  description: "男女对立拳击手;反帝制急先锋;换命打法科普员",
  base: '/',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/start' }
    ],
    sidebar: {
      '/blog/': [
        {
          text: '记录',
          items: [
            { text: '2026-06-17 我回来了~', link: '/blog/start' }
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
