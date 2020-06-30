import Button from './Button'

Button.install = function (Vue) {
  Vue.component(Button.name, Button)
}

export default Button

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(Button.name, Button)
}
