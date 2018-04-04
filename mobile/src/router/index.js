import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home')
const Hot = r => require.ensure([], () => r(require('@/pages/Hot')), 'Hot')
const Newest = r => require.ensure([], () => r(require('@/pages/Newest')), 'Newest')
const Special = r => require.ensure([], () => r(require('@/pages/Special')), 'Special')
const Center = r => require.ensure([], () => r(require('@/pages/Center')), 'Center')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          redirect: '/home/hot',
        },
        {
          path: '/home',
          component: Home,
          redirect: '/home/hot',
          children: [
            {
              path: 'hot',
              component: Hot,
              meta: { index: 1 }
            },
            {
              path: 'newest',
              component: Newest,
              meta: { index: 2 }
            }
          ]
        },
        // {
        //   path: '/newest',
        //   component: Home
        // },
        // {
        //   path: '/special',
        //   component: Special
        // },
        // {
        //   path: '/center',
        //   component: Center
        // }
      ]
    }
  ]
})
