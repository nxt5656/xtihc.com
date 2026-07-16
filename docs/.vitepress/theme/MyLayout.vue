<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import RandomPosts from './components/RandomPosts.vue'
import BackgroundMusic from './components/BackgroundMusic.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-features-after>
      <RandomPosts v-if="frontmatter.layout === 'home'" />
    </template>
  </Layout>
  <BackgroundMusic />
</template>
