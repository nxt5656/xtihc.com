import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  tags: string[]
}

declare const data: Post[]
export { data }

// 自动加载 docs/posts/ 文件夹及子文件夹下的所有 markdown 文章
export default createContentLoader('posts/**/*.md', {
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || '无标题',
        url,
        date: getPostDate(url, frontmatter.date),
        tags: frontmatter.tags || []
      }))
      .sort((a, b) => b.date.localeCompare(a.date)) // 按日期倒序排列
  }
})

function getPostDate(url: string, raw?: string | number | Date) {
  if (raw) return formatDate(raw)

  const matched = url.match(/\d{4}-\d{2}-\d{2}/)
  return matched?.[0] || ''
}

// 格式化时间的辅助函数
function formatDate(raw: string | number | Date) {
  const date = new Date(raw)
  return date.toISOString().slice(0, 10) // 格式化为 YYYY-MM-DD
}
