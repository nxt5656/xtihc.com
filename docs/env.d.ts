// docs/env.d.ts

// 1. 解决 ts(2307): 让 TypeScript 认识并理解 .vue 文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 声明 Vue 组件的通用类型
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 2. 解决 ts(2882): 让 TypeScript 允许直接 import 导入 CSS 副作用
declare module '*.css' {
  const content: any
  export default content
}