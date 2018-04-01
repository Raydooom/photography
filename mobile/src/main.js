// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

// 屏幕适配
document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 18.75 + 'px'
window.onresize = function () {
  document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 18.75 + 'px'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
