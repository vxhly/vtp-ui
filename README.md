# vtp-ui

## Install

安装前注意：
因为是私有的组件库, npm 代理也是私有的, 所以需要在项目目录下创建 `.npmrc` 文件，里面添加以下内容

``` text.vuepress
registry=http://[ip]
```

``` bash
yarn add vtp-ui
# or
npm install vtp-ui
```

## Used

### 一键全局引入

``` javascript
import vtpUI from 'vtp-ui'
import Vue from 'vue'
import 'vtp-ui/lib/vtp-ui.css'

Vue.use(vtpUI)
```

### 按需引入

``` javascript
import {
    组件名
} from 'vtp-ui'

Vue.use(组件名)
```

安装 [`babel-plugin-component`](https://github.com/ElementUI/babel-plugin-component#readme) 插件


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
        'libDir': 'packages' // 这句话要写，否则识别不到组件目录
      },
      'vtp-ui' // 多个 UI 库下必须配置
    ],
    // ...
  ]
}

```

## 运行文档说明

``` bash
npm i -g vuepress
npm run docs:dev
# 编译文档可使用 npm run docs:build
```

## 强制使用

安装 `vtp-ui` 组件库专用的 cli 命令

``` bash
cd ./vtp-cli
npm link
```

强制使用已配置脚本命令 `vtp new` 来创建一个组件以及组件文档(已包含默认模板, 在此基础上修改即可), 使用命令 `vtp del` 来删除不需要的组件, 具体的使用方式查看 [vtp-cli](https://github.com/vxhly/vtp-ui/tree/master/vtp-cli)

## 使用 forever 开启私有服务

将 `BAT_SCRIPT` 目录拷贝至安装有 `Node.js` 服务的服务器的任意一个地方

``` bash
npm i -g forever verdaccio # 全局安装服务依赖
```
