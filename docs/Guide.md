
# 指南

## 介绍

::: tip
开箱即用的 Vue 组件库, 二次封装 Element-UI 自定义组件库, 收集或者改进其他 UI 框架中的实用的组件
:::

## Install

::: danger
安装前注意：
因为是私有的组件库, npm 代理也是私有的, 所以需要在项目目录下创建 `.npmrc` 文件，里面添加以下内容

``` text
registry=http://[ip]
```
:::

``` bash
yarn add vtp-ui
```

## Used

### 一键全局引入

``` js
import EhUI from 'vtp-ui'
import Vue from 'vue'
import 'vtp-ui/lib/vtp-ui.css'

Vue.use(EhUI)
```

### 按需引入

::: tip
安装 [`babel-plugin-component`](https://github.com/ElementUI/babel-plugin-component#readme) 插件
:::

``` bash
npm i -d babel-plugin-component 
```

配置 `babel.config.js`

``` js
module.exports = {
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      },
      'element-ui' // 多个 UI 库下必须配置 
    ],
    [
      'component',
      {
        'libraryName': 'vtp-ui',
        'styleLibraryName': 'theme-chalk',
        'libDir': 'packages' // 这句话要写, 否则识别不到组件目录
      },
      'vtp-ui' // 多个 UI 库下必须配置
    ],
    // ...
  ]
}

```

到此您就可以按需引入你的组件了

``` js
import {
    // 组件名
} from 'vtp-ui' // 将会自动导入 css 文件

// Vue.use(组件名)
```
