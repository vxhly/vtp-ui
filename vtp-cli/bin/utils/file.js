const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const uppercamelcase = require('uppercamelcase')
const config = require('../../config')

const excludes = [
  'index.js',
  'theme-chalk',
  'mixins',
  'utils',
  '.DS_Store',
  'assets'
]
const dirs = fs.readdirSync(path.resolve(process.cwd(), 'packages'))
let Components = dirs.filter(dirName => excludes.indexOf(dirName) === -1)

function readFile (path, filename, func) {
  fs.readFile(path + '/' + filename, 'utf-8', function (err, data) {
    if (err) {
      console.log(chalk.red(`Failed to read file ${filename}.`))
    } else {
      func(data)
    }
  })
}

function writeFile (path, data, filename) {
  fs.writeFile(path + '/' + filename.split('.')[0] + '.' + filename.split('.')[1], data, function (error) {
    if (error) {
      throw error
    } else {
      console.log(chalk.green(`The file ${path}/${filename} was created/updated successfully.`))
    }
  })
}

function tmpReplace (data, replaceOption) {
  const {
    compoenntName,
    docsTitle,
    isDel,
    delPackageName,
    compoenntType
  } = replaceOption

  if (!isDel) {
    // 模版字符串替换
    data = data.replace(/{compoenntName}/ig, compoenntName)
    data = data.replace(/{docsTitle}/ig, docsTitle)
    data = data.replace(/{upperCompoenntName}/ig, uppercamelcase(compoenntName))
    data = data.replace(/{prefix}/ig, config.prefix)
    data = data.replace(/{upperPrefix}/ig, uppercamelcase(config.prefix))
    data = data.replace(/{orgPrefix}/ig, config.orgPrefix)
    data = data.replace(/{librarieName}/ig, config.name)
    if (compoenntType === 'base') data = data.replace(/{packageType}/ig, '普通组件')
    if (compoenntType === 'business') data = data.replace(/{packageType}/ig, '业务组件')

    Components.push(compoenntName)
    Components = [...new Set(Components)]
    const importList = Components.sort().map(
      name => `import ${uppercamelcase(name)} from './${name}'`
    )
    const exportList = Components.map(name => `${uppercamelcase(name)}`)

    data = data.replace(/{packages}/ig, `${importList.join('\n')}`)
    data = data.replace(/{packageList}/ig, `${exportList.join(',\n  ')}`)
  } else {
    Components = Components.filter(item => item !== delPackageName)
    Components = [...new Set(Components)]
    const importList = Components.sort().map(
      name => `import ${uppercamelcase(name)} from './${name}'`
    )
    const exportList = Components.map(name => `${uppercamelcase(name)}`)

    data = data.replace(/{packages}/ig, `${importList.join('\n')}`)
    data = data.replace(/{packageList}/ig, `${exportList.join(',\n  ')}`)
  }

  return data
}

module.exports = function copyFile (resPath, desPath, filename, desFileName, replaceOption) {
  readFile(resPath, filename, function (data) {
    writeFile(desPath, replaceOption ? tmpReplace(data, replaceOption) : data, desFileName || filename)
  })
}
