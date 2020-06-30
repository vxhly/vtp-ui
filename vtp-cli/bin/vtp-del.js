#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const uppercamelcase = require('uppercamelcase')

const delHandleInquirer = require('./inquirer/del-inquirer.js')
const copyFile = require('./utils/file')

const PACKAGES_DIR = `${process.cwd()}/packages`
const DOCS_DIR = 'docs'
const CSS_DIRECTORY = `${PACKAGES_DIR}/theme-chalk`

const removePromise = (dir) => {
  return new Promise(function (resolve, reject) {
    // 先读文件夹
    fs.stat(dir, function (_err, stat) {
      if (stat.isDirectory()) {
        fs.readdir(dir, function (_err, files) {
          files = files.map(file => path.join(dir, file)) // a/b  a/m
          files = files.map(file => removePromise(file)) // 这时候变成了promise
          Promise.all(files).then(function () {
            fs.rmdir(dir, resolve)
          })
        })
      } else {
        fs.unlink(dir, resolve)
      }
    })
  })
}

const delPackage = () => {
  delHandleInquirer()
    .then((choices) => {
      const {
        delPackageName,
        isDel
      } = choices

      if (isDel) {
        const PACKAGE_DIR = `${PACKAGES_DIR}/${delPackageName}`
        const SCSS_NAME = `${CSS_DIRECTORY}/${delPackageName}.scss`
        const CSS_NAME = `${CSS_DIRECTORY}/${delPackageName}.css`
        // const CSS_MIN_NAME = `${CSS_DIRECTORY}/${delPackageName}.min.css`
        const BASE_DOCS = `${DOCS_DIR}/base/${uppercamelcase(delPackageName)}.md`
        const BUSINESS_DOCS = `${DOCS_DIR}/business/${uppercamelcase(delPackageName)}.md`

        removePromise(PACKAGE_DIR)
        console.log(chalk.green(`The package directory ${PACKAGES_DIR}/${delPackageName} was deleted successfully.`))

        const delFiles = [
          SCSS_NAME,
          CSS_NAME,
          // CSS_MIN_NAME,
          BASE_DOCS,
          BUSINESS_DOCS
        ]
        delFiles.map(item => {
          fs.unlink(item, err => {
            if (!err) {
              console.log(chalk.green(`Delete file ${item} successfully.`))
            }
          })
        })
        copyFile(path.join(__dirname, '/tmp'), PACKAGES_DIR, 'export.js.tmp', 'index.js', choices)
      } else {
        console.log(chalk.gray('已经为你取消当前的删除操作.'))
      }
    })
}

module.exports = delPackage
