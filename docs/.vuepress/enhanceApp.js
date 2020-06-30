import UI from '../../packages'
import 'element-ui/lib/theme-chalk/index.css'
import './style/docs.css'

import ClipboardJS from 'clipboard'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(UI)

  Vue.directive('icon-copy', {
    inserted(el, binding) {
      const elm = binding.expression.replace(/'/g, '')
      const clipboard = new ClipboardJS(`.${elm}`, {
        text: function (trigger) {
          return `name="${trigger.innerText}"`
        }
      })

      clipboard.on('success', (e) => {
        Message({
          message: `复制成功, ${e.text}`,
          type: 'success'
        })
      })
    }
  })
}
