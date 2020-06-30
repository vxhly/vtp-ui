/* eslint-disable node/no-deprecated-api */
const fs = require('fs')
const path = require('path')

// 递归创建文件夹
module.exports = function mkdirs (dirname, callback) {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback()
    } else {
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback)
      })
    }
  })
}
