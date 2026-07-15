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
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // Google & Bing Webmaster Verification 所有权验证标签占位
    ['meta', { name: 'google-site-verification', content: 'google_verification_placeholder' }],
    ['meta', { name: 'msvalidate.01', content: 'bing_verification_placeholder' }]
  ],

  // 动态构建 HTML Head (Canonical URLs, hreflang, Open Graph, Twitter Cards, Schema JSON-LD)
  async transformHead({ pageData }) {
    const head: any[] = []

    // 1. 规范链接 (Canonical URL) 规避重复内容分散权重
    let cleanPath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = `https://xtihc.com/${cleanPath}`
    head.push(['link', { rel: 'canonical', href: canonicalUrl }])

    // 2. 国际化交叉链接 (hreflang alternate) 辅助多语言 SEO 收录
    let basePath = cleanPath
    const isEn = basePath.startsWith('en/')
    const isJa = basePath.startsWith('ja/')
    if (isEn) basePath = basePath.substring(3)
    else if (isJa) basePath = basePath.substring(3)

    head.push(['link', { rel: 'alternate', hreflang: 'zh-CN', href: `https://xtihc.com/${basePath}` }])
    head.push(['link', { rel: 'alternate', hreflang: 'en-US', href: `https://xtihc.com/en/${basePath}` }])
    head.push(['link', { rel: 'alternate', hreflang: 'ja-JP', href: `https://xtihc.com/ja/${basePath}` }])
    head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: `https://xtihc.com/${basePath}` }])

    // 3. 社交分享元数据 (Open Graph & Twitter Cards)
    const title = pageData.frontmatter.title || 'xtihc'
    const description = pageData.frontmatter.description || '记录生活观察、社会批判、硬件技术、仪器改装与人生思考的个人独立博文随心录。'
    const ogImage = pageData.frontmatter.image ? `https://xtihc.com${pageData.frontmatter.image}` : 'https://xtihc.com/favicon.ico'

    head.push(['meta', { property: 'og:title', content: title }])
    head.push(['meta', { property: 'og:description', content: description }])
    head.push(['meta', { property: 'og:type', content: 'article' }])
    head.push(['meta', { property: 'og:url', content: canonicalUrl }])
    head.push(['meta', { property: 'og:image', content: ogImage }])

    head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    head.push(['meta', { name: 'twitter:title', content: title }])
    head.push(['meta', { name: 'twitter:description', content: description }])
    head.push(['meta', { name: 'twitter:image', content: ogImage }])

    // 4. Schema.org BlogPosting 结构化数据 (JSON-LD) 以展示富媒体搜索卡片
    if (pageData.relativePath.includes('/posts/') && !pageData.relativePath.endsWith('start.md')) {
      let datePublished = pageData.frontmatter.date
      if (!datePublished) {
        const pathParts = pageData.relativePath.split('/')
        const fileName = pathParts[pathParts.length - 1]
        const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/)
        datePublished = dateMatch ? `${dateMatch[1]}T00:00:00Z` : '2026-07-08T00:00:00Z'
      }

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': title,
        'description': description,
        'image': [ogImage],
        'datePublished': datePublished,
        'author': [{
          '@type': 'Person',
          'name': '张老三',
          'url': 'https://xtihc.com'
        }],
        'publisher': {
          '@type': 'Organization',
          'name': 'xtihc',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://xtihc.com/favicon.ico'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      }
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)])
    }

    return head
  },

  // 多语言（国际化 i18n）配置
  locales: {
    // 默认语言（中文）
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: "xtihc",
      description: "男女对立拳击手;反帝制急先锋;换命打法科普员。记录生活观察、社会批判、硬件技术、仪器改装与人生思考的个人独立博文随心录。",
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
                { text: '2026-07-15 慈善最怕只剩下“做过”：从一则知乎回答看基金会的信任困局', link: '/posts/2026-07/2026-07-15' },
                { text: '2026-07-14 被剩下的优质女', link: '/posts/2026-07/2026-07-14' },
                { text: '2026-07-10 刑不可知则威不可测：法度不确定性下的行为驯化', link: '/posts/2026-07/2026-07-10' },
                { text: '2026-07-09 折旧的生命：普通人从“奉献者”到“社会成本”的结构性死局', link: '/posts/2026-07/2026-07-09_1' },
                { text: '2026-07-09 天上只有一个太阳，以及那些容易被晒伤的“同志关系”', link: '/posts/2026-07/2026-07-09' },
                { text: '2026-07-08 槐树下的悄悄话：谁养肥了村里的“土皇帝”？', link: '/posts/2026-07/2026-07-08_3' },
                { text: '2026-07-08 把“朋友”搞得多多的，以及那张沉默的账单', link: '/posts/2026-07/2026-07-08_2' },
                { text: '2026-07-08 中国的“斩杀线”：为什么普通人都在拼命存钱？', link: '/posts/2026-07/2026-07-08_1' },
                { text: '2026-07-08 “关系”的分量，与城市的刻度', link: '/posts/2026-07/2026-07-08' },
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
      description: 'A personal blog of xtihc. Covering tech essays, hardware hacks, instrument repairs, social reflections, and observations of daily life.',
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
                { text: '2026-07-15 When Charity Is Reduced to “We Did Something”', link: '/en/posts/2026-07/2026-07-15' },
                { text: '2026-07-14 The Leftover Premium Women', link: '/en/posts/2026-07/2026-07-14' },
                { text: '2026-07-10 Punishment Unknown, Majesty Unmeasured: Behavioral Domestication under Legal Uncertainty', link: '/en/posts/2026-07/2026-07-10' },
                { text: '2026-07-09 Depreciating Lives: From Young Sacrifices to Aging Social Costs', link: '/en/posts/2026-07/2026-07-09_1' },
                { text: '2026-07-09 There Is Only One Sun: The Comedy of Socialist Bloc Relations', link: '/en/posts/2026-07/2026-07-09' },
                { text: '2026-07-08 Whispers under the Scholar Tree: Who Fed the "Local Emperors"?', link: '/en/posts/2026-07/2026-07-08_3' },
                { text: '2026-07-08 Making Friends Plentiful, and That Silent Bill', link: '/en/posts/2026-07/2026-07-08_2' },
                { text: '2026-07-08 China\'s "Execution Line": Why Do Ordinary People Save So Desperately?', link: '/en/posts/2026-07/2026-07-08_1' },
                { text: '2026-07-08 The Weight of "Guanxi" and the Barometer of a City', link: '/en/posts/2026-07/2026-07-08' },
                { text: '2026-07-03 Sacrifice the Few to Protect the Many: Is It Ever Justified?', link: '/en/posts/2026-07/2026-07-03' },
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
      description: '生活観察、社会批判、ハードウェア技術、測定器の修理・改造、そして人生についての思考を記録する、xtihcの多言語個人ブログです。',
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
                { text: '2026-07-15 慈善が「やった」で終わるとき：知乎の回答から見る基金会の信頼危機', link: '/ja/posts/2026-07/2026-07-15' },
                { text: '2026-07-14 売れ残りの優秀な女性', link: '/ja/posts/2026-07/2026-07-14' },
                { text: '2026-07-10 刑罰知らざれば威測り難し：法的不確実性下における行動の飼い慣らし', link: '/ja/posts/2026-07/2026-07-10' },
                { text: '2026-07-09 減価償却される生命：若き「貢献者」から老後の「社会的コスト」への構造的デッドロック', link: '/ja/posts/2026-07/2026-07-09_1' },
                { text: '2026-07-09 天に太陽は一つだけ：なぜ社会主義陣営の「同志」は衝突するのか？', link: '/ja/posts/2026-07/2026-07-09' },
                { text: '2026-07-08 槐の木の下での密談：誰が農村の「地元の皇帝」を肥え太らせたのか？', link: '/ja/posts/2026-07/2026-07-08_3' },
                { text: '2026-07-08 「友人を多くすること」と、沈黙のツケ', link: '/ja/posts/2026-07/2026-07-08_2' },
                { text: '2026-07-08 中国の「即死ライン」：なぜ一般庶民は必死に貯金するのか？', link: '/ja/posts/2026-07/2026-07-08_1' },
                { text: '2026-07-08 「コネ」の重みと、都市のポテンシャルを測る尺度', link: '/ja/posts/2026-07/2026-07-08' },
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
