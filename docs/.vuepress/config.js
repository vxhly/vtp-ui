const fs = require('fs')
const path = require('path')
const baseDir = fs.readdirSync(path.resolve(__dirname, '../base'))
const businessDir = fs.readdirSync(path.resolve(__dirname, '../business'))

const config = {
  dest: 'public',
  plugins: [
    'vue-demo',
    require('./plugins/clipboard-copy')
  ],
  serviceWorker: true,
  themeConfig: {
    sidebar: [
      ['/Guide', '指南'],
      {
        title: '普通组件',
        collapsable: false,
        children: [
          ...baseDir.map(item=> `/base/${item.replace('.md','')}`)
        ]
      },
      {
        title: '业务组件',
        collapsable: false,
        children: [
          ...businessDir.map(item=> `/business/${item.replace('.md','')}`)
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      // 使用 markdown-it-vuese 自动生成组件
      md.use(require('markdown-it-vuese'), {
        vueseRe: /<\[vuese-h3\]\((.+)\)/i,
        ruleName: 'vuese-h3',
        useRender: (vueseRender) => {
          const renderRes = vueseRender.render()
          const genMd = key => `### ${key}\n${renderRes[key]}\n`

          return Object.keys(renderRes).map(genMd).join('')
        },
      })
    }
  },
  title: 'vtp-ui',
  base: '/vtp-ui',
  chainWebpack: config => {
   
  }
}

module.exports = config
