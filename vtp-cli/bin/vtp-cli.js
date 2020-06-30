#! /usr/bin/env node

const fs = require('fs')
const {
  version
} = require('../package.json')
const chalk = require('chalk')
const program = require('commander')
const initPackage = require('./vtp-new')
const delPackage = require('./vtp-del')

const VUPRESS_DIR = 'docs/.vuepress'

const isProject = fs.existsSync(VUPRESS_DIR)

if (isProject) {
  program
    .version(version)
    .usage('[options]')
    .description('运行命令来为你的组件库新增或者删除组件。')

  program
    .command('new')
    .description('创建一个组件')
    .action(initPackage)

  program
    .command('del')
    .description('删除一个组件')
    .action(delPackage)
  program.parse(process.argv)
} else {
  console.log(chalk.red('非常抱歉！当前的项目目录非组件库目录。'))
}
