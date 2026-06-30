import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "xtihc",
  description: "男女对立拳击手;反帝制急先锋;换命打法科普员",
  base: '/',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://xtihc.com'
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '标签分类', link: '/tags' },
      { text: '博客', link: '/posts/start' }
    ],
    sidebar: {
      '/posts/': [
        {
          text: '文章',
          items: [
            { text: '2026-06-30 为什么浙江杭州经济这么发达? 01', link: '/posts/2026-06/2026-06-30' },
            { text: '2026-06-24 自行车为什么不能站起来蹬?', link: '/posts/2026-06/2026-06-24_1' },
            { text: '2026-06-24 坏掉的鼠标', link: '/posts/2026-06/2026-06-24' },
            { text: '2026-06-17 我回来了~', link: '/posts/start' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'gmail', link: 'mailto:nxt5656@example.com' }
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
