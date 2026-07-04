<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'
import { data as allPosts } from '../posts.data.ts' // 引入刚才生成的编译时数据 [9]

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

// UI 文本的多语言字典
const i18n = {
  '/en/': {
    readingWithTag: 'Reading articles containing',
    allPosts: 'All Articles',
    postsCount: 'posts'
  },
  '/ja/': {
    readingWithTag: 'タグを含む記事を閲覧中',
    allPosts: 'すべての記事',
    postsCount: '件'
  },
  '/': {
    readingWithTag: '正在阅读含有',
    allPosts: '全部文章',
    postsCount: '篇'
  }
}

// 1. 自动提取所有文章中出现的、不重复的标签
const allTags = computed(() => {
  const tagsSet = new Set()
  langFilteredPosts.value.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagsSet.add(tag))
    }
  })
  return Array.from(tagsSet)
})

// 2. 记录当前选中的标签（若为 null 则展示全部文章）
const selectedTag = ref(null)

// 3. 点击标签时的切换逻辑
const toggleTag = (tag) => {
  if (selectedTag.value === tag) {
    selectedTag.value = null // 再次点击已选中的标签，取消筛选
  } else {
    selectedTag.value = tag
  }
}

// 4. 根据当前选中的标签过滤出文章列表
const filteredPosts = computed(() => {
  if (!selectedTag.value) return langFilteredPosts.value
  return langFilteredPosts.value.filter(post => post.tags.includes(selectedTag.value))
})
</script>

<template>
  <div class="tags-container">
    <!-- 标签云区 -->
    <div class="tag-cloud">
      <span 
        v-for="tag in allTags" 
        :key="tag"
        :class="['tag-item', { active: selectedTag === tag }]"
        @click="toggleTag(tag)"
      >
        # {{ tag }}
      </span>
    </div>

    <hr class="divider"/>

    <!-- 文章列表展示区 -->
    <h3 class="list-title">
      {{ selectedTag ? `${i18n[currentLangPrefix].readingWithTag} #${selectedTag}` : i18n[currentLangPrefix].allPosts }} 
      ({{ filteredPosts.length }}{{ i18n[currentLangPrefix].postsCount }})
    </h3>

    <ul class="post-list">
      <li v-for="post in filteredPosts" :key="post.url" class="post-item">
        <span class="post-date">{{ post.date }}</span>
        <a :href="post.url" class="post-link">{{ post.title }}</a>
        <div class="post-tags">
          <span v-for="t in post.tags" :key="t" class="mini-tag">#{{ t }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tags-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.tag-item {
  padding: 6px 12px;
  border-radius: 20px;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 0.9rem;
}
.tag-item:hover, .tag-item.active {
  background-color: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}
.divider {
  border: 0;
  border-top: 1px solid var(--vp-c-divider);
  margin: 30px 0;
}
.list-title {
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}
.post-list {
  list-style: none;
  padding: 0;
}
.post-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.post-date {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  min-width: 90px;
}
.post-link {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  flex-grow: 1;
}
.post-link:hover {
  text-decoration: underline;
}
.post-tags {
  display: flex;
  gap: 6px;
}
.mini-tag {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  background-color: var(--vp-c-bg-alt);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>