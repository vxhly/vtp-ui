import './theme-chalk/base.css'
import './utils/index'

// 引入组件
import Button from './button'

const version = require('../package.json').version
const components = [
  Button
]

// 导出、安装组件
const install = Vue => {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

export {
  install,
  version,
  Button
}

export default {
  install,
  version
}
