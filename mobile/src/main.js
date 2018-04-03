// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'

Vue.config.productionTip = false

// 屏幕适配
document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 18.75 + 'px'
window.onresize = function () {
  document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 18.75 + 'px'
}

router.beforeEach((to, from, next) => {

  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
})
