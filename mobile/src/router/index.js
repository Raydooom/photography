import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home')
const Hot = r => require.ensure([], () => r(require('@/pages/Hot')), 'Hot')
const Newest = r => require.ensure([], () => r(require('@/pages/Newest')), 'Newest')
const Special = r => require.ensure([], () => r(require('@/pages/Special')), 'Special')
const SpecialDetail = r => require.ensure([], () => r(require('@/pages/SpecialDetail')), 'SpecialDetail')
const Center = r => require.ensure([], () => r(require('@/pages/Center')), 'Center')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: Home,
        },
        {
          path: 'special',
          component: Special,
          children: [{
            path: 'specialDetail',
            component: SpecialDetail,
            name: 'specialDetail'
          }]
        },
        {
          path: 'center',
          component: Center
        }
      ]
    }
  ]
})
