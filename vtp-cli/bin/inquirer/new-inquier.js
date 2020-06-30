const fs = require('fs')
const inquirer = require('inquirer')
const PACKAGES_DIR = `${process.cwd()}/packages`

const questions = [

  {
    name: 'compoenntName',
    type: 'input',
    message: '为你生成的组件名是什么?\n  (PS: 使用英文小写, 形如 demo-test.)',
    validate: val => {
      const reg = /^[a-z' '-]*$/g
      if (val) {
        if (reg.test(val)) {
          const caseName = val.trim().replace(/ /g, '-')
          const isPackageDir = fs.existsSync(`${PACKAGES_DIR}/${caseName}`)
          return !isPackageDir ? true : '组件已存在换一个名字吧！'
        } else {
          return '请使用小写字母的组件名'
        }
      } else {
        return '组件名必填！'
      }
    },
    filter: val => {
      return val.trim().replace(/ /g, '-')
    }
  },
  {
    name: 'docsTitle',
    type: 'input',
    message: '为你生成的组件文档标题是什么?\n  (PS: 简洁明了, 一般为组件的中文名.)'
  },
  {
    name: 'compoenntType',
    type: 'list',
    message: '为你生成的组件类型是什么?\n  (PS: 分为普通组件和业务组件.)',
    choices: [
      'base',
      'business'
    ]
  }

]

module.exports = function handleInquirer () {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(questions)
      .then((answers) => {
        resolve(answers)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
