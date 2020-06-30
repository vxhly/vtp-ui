#! /usr/bin/env node

const path = require('path')
const uppercamelcase = require('uppercamelcase')

const mkdirs = require('./utils/mkdirs')
const copyFile = require('./utils/file')
const newHandleInquirer = require('./inquirer/new-inquier')

const PACKAGES_DIR = `${process.cwd()}/packages`
const CSS_DIR = `${PACKAGES_DIR}/theme-chalk`
const DOCS_DIR = 'docs'

const initPackage = () => {
  newHandleInquirer()
    .then((choices) => {
      const {
        compoenntName,
        compoenntType
      } = choices
      const PACKAGE_DIR = `${PACKAGES_DIR}/${compoenntName}`
      const PACKAGE_DOCS_DIR = `${DOCS_DIR}/${compoenntType}`

      mkdirs(PACKAGE_DIR, () => {
        copyFile(path.join(__dirname, '/tmp'), PACKAGE_DIR, 'entry.js.tmp', 'index.js', choices)
        copyFile(path.join(__dirname, '/tmp'), PACKAGE_DIR, 'entry.vue.tmp', `${uppercamelcase(compoenntName)}.vue`, choices)
        copyFile(path.join(__dirname, '/tmp'), PACKAGE_DOCS_DIR, 'entry.md.tmp', `${uppercamelcase(compoenntName)}.md`, choices)
        copyFile(path.join(__dirname, '/tmp'), CSS_DIR, 'entry.scss.tmp', `${compoenntName}.scss`, choices)
        copyFile(path.join(__dirname, '/tmp'), CSS_DIR, 'entry.css.tmp', `${compoenntName}.css`, choices)
        // copyFile(path.join(__dirname, '/tmp'), CSS_DIR, 'entry.min.css.tmp', `${compoenntName}.min.css`, choices)
        copyFile(path.join(__dirname, '/tmp'), PACKAGES_DIR, 'export.js.tmp', 'index.js', choices)
      })
    })
}

module.exports = initPackage
