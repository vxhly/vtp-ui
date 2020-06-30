const inquirer = require('inquirer')
const fs = require('fs')

const PACKAGES_DIR = `${process.cwd()}/packages`

const questions = [

  {
    name: 'delPackageName',
    type: 'list',
    pageSize: 10,
    choices: () => {
      const excludes = [
        'theme-chalk',
        'mixins',
        'utils'
      ] // 排除的目录
      const packages = fs
        .readdirSync(PACKAGES_DIR)
        .filter(item => excludes.indexOf(item) === -1) // 组件目录

      return packages
    },
    message: '你要删除的组件是什么?\n  (PS: 一次只能删除一个组件.)'
  },
  {
    name: 'isDel',
    type: 'confirm',
    default: false,
    message: '你确定要删除这个组件所有相关的目录文件?\n  (PS: 请再一次的确认.)'
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
