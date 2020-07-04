---
home: true
heroText: vtp-ui
tagline: Vue 驱动的静态网站生成器
actionText: 快速上手 →
actionLink: /Guide
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: Copyright © 2020
---

## 像数 1, 2, 3 一样容易

### 修改 .npmrc 文件

``` text
registry=http://[ip]:[port]
```

### 安装

``` bash
# 安装组件库
yarn add vtp-ui
```

### 使用

``` bash
import EhUI from '@xl/eh-ui'
import Vue from 'vue'
import '@xl/eh-ui/lib/eh-ui.css'

Vue.use(EhUI)
```
