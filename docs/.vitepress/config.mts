import { defineConfig } from 'vitepress'

export default defineConfig({
  // 全局共享基础配置
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://xtihc.com',
    transformItems: (items) => {
      return items.map((item) => ({
        ...item,
        changefreq: 'daily',
        priority: item.url === '' ? 1.0 : 0.8
      }))
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // 多语言（国际化 i18n）配置
  locales: {
    // 默认语言（中文）
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: "xtihc",
      description: "男女对立拳击手;反帝制急先锋;换命打法科普员",
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
                { text: '2026-07-03 牺牲少部分人的利益，来保障大部分人的利益，是应当的吗？', link: '/posts/2026-07/2026-07-03' },
                { text: '2026-07-01 天上飞机,地上苏E', link: '/posts/2026-07/2026-07-01' },
                { text: '2026-06-30 为什么浙江杭州经济这么发达? 01', link: '/posts/2026-06/2026-06-30' },
                { text: '2026-06-24 自行车为什么不能站起来蹬?', link: '/posts/2026-06/2026-06-24_1' },
                { text: '2026-06-24 坏掉的鼠标', link: '/posts/2026-06/2026-06-24' },
                { text: '2026-06-17 我回来了~', link: '/posts/start' }
              ]
            }
          ]
        }
      }
    },

    // 英文版配置
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'xtihc',
      description: 'A personal blog and thought log',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Tags', link: '/en/tags' },
          { text: 'Blog', link: '/en/posts/start' }
        ],
        sidebar: {
          '/en/posts/': [
            {
              text: 'Articles',
              items: [
                { text: '2026-07-03 Is It Justified to Sacrifice the Interests of the Few to Protect the Many?', link: '/en/posts/2026-07/2026-07-03' },
                { text: '2026-07-01 Airplanes in the Sky, Su-E on the Ground', link: '/en/posts/2026-07/2026-07-01' },
                { text: '2026-06-30 Why Is Hangzhou, Zhejiang\'s Economy So Developed? 01', link: '/en/posts/2026-06/2026-06-30' },
                { text: '2026-06-24 Why Can\'t You Pedal a Bicycle Standing Up?', link: '/en/posts/2026-06/2026-06-24_1' },
                { text: '2026-06-24 The Broken Mouse', link: '/en/posts/2026-06/2026-06-24' },
                { text: '2026-06-17 I\'m back~', link: '/en/posts/start' }
              ]
            }
          ]
        }
      }
    },

    // 日文版配置
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      title: 'xtihc',
      description: '個人ブログと思考ログ',
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: 'タグ', link: '/ja/tags' },
          { text: 'ブログ', link: '/ja/posts/start' }
        ],
        sidebar: {
          '/ja/posts/': [
            {
              text: '記事一覧',
              items: [
                { text: '2026-07-03 少数の利益を犠牲にして多数の利益を守ることは、本当に正当なのだろうか？', link: '/ja/posts/2026-07/2026-07-03' },
                { text: '2026-07-01 空には飛行機、陸には蘇E（スーイー）', link: '/ja/posts/2026-07/2026-07-01' },
                { text: '2026-06-30 浙江省杭州の経済はなぜこれほど発展しているのか？ 01', link: '/ja/posts/2026-06/2026-06-30' },
                { text: '2026-06-24 自転車はなぜ立ち漕ぎしてはいけないのか？', link: '/ja/posts/2026-06/2026-06-24_1' },
                { text: '2026-06-24 壊れたマウス', link: '/ja/posts/2026-06/2026-06-24' },
                { text: '2026-06-17 戻ってきました~', link: '/ja/posts/start' }
              ]
            }
          ]
        }
      }
    }
  },

  // 共享主题配置
  themeConfig: {
    socialLinks: [
      { icon: 'gmail', link: 'mailto:nxt5656@gmail.com' }
    ],

    // 启用极速离线本地搜索
    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present xtihc.com'
    }
  }
})
