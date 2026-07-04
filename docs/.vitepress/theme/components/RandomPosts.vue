<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import { data as allPosts } from '../posts.data.ts'

const { page } = useData()

// 识别当前语言前缀
const currentLangPrefix = computed(() => {
  const path = page.value.relativePath
  if (path.startsWith('en/')) return '/en/'
  if (path.startsWith('ja/')) return '/ja/'
  return '/'
})

// 根据语言过滤文章列表
const langFilteredPosts = computed(() => {
  const prefix = currentLangPrefix.value
  return allPosts.filter(post => {
    if (prefix === '/en/') {
      return post.url.startsWith('/en/')
    } else if (prefix === '/ja/') {
      return post.url.startsWith('/ja/')
    } else {
      return !post.url.startsWith('/en/') && !post.url.startsWith('/ja/')
    }
  })
})

// UI 标题多语言字典
const i18n = {
  '/en/': 'Recommended Reading',
  '/ja/': 'おすすめの記事',
  '/': '随机推荐阅读'
}

const randomPosts = ref([])

onMounted(() => {
  const posts = langFilteredPosts.value
  if (posts && posts.length > 0) {
    // Fisher-Yates shuffle
    const shuffled = [...posts].sort(() => 0.5 - Math.random())
    randomPosts.value = shuffled.slice(0, 3)
  }
})
</script>

<template>
  <div v-if="randomPosts.length > 0" class="random-posts-section">
    <div class="container">
      <h2 class="title">{{ i18n[currentLangPrefix] }}</h2>
      <div class="items">
        <div v-for="post in randomPosts" :key="post.url" class="item-wrapper">
          <a :href="post.url" class="item-link">
            <article class="item-card">
              <div class="item-date">{{ post.date }}</div>
              <h3 class="item-title">{{ post.title }}</h3>
              <div v-if="post.tags && post.tags.length" class="item-tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
              </div>
            </article>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.random-posts-section {
  padding: 0 24px;
  margin-top: 48px;
  margin-bottom: 48px;
}

@media (min-width: 640px) {
  .random-posts-section {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .random-posts-section {
    padding: 0 64px;
  }
}

.random-posts-section .container {
  margin: 0 auto;
  max-width: 1152px;
}

.random-posts-section .title {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
  color: var(--vp-c-text-1);
}

.random-posts-section .items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .random-posts-section .items {
    grid-template-columns: repeat(3, 1fr);
  }
}

.item-wrapper {
  display: flex;
}

.item-link {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  width: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s, transform 0.25s;
  text-decoration: none;
}

.item-link:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft-hover);
  transform: translateY(-2px);
}

.item-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.item-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.item-title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-tags {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.item-tags .tag {
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
