import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home')
const Hot = r => require.ensure([], () => r(require('@/pages/Hot')), 'Hot')
const Newest = r => require.ensure([], () => r(require('@/pages/Newest')), 'Newest')
const Publish = r => require.ensure([], () => r(require('@/pages/Publish')), 'Publish')
const Special = r => require.ensure([], () => r(require('@/pages/Special')), 'Special')
const SpecialDetail = r => require.ensure([], () => r(require('@/pages/SpecialDetail')), 'SpecialDetail')
const Center = r => require.ensure([], () => r(require('@/pages/Center')), 'Center')
const Login = r => require.ensure([], () => r(require('@/pages/Login')), 'Login')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: App,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: Home,
        }, {
          path: 'newest',
          component: Newest,
        },
        {
          path: 'publish',
          component: Publish,
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
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
