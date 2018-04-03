import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home')
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
          redirect: '/home',
				},
        {
          path: '/home',
          component: Home
        },
        {
          path: '/newest',
          component: Newest
        },
        {
          path: '/special',
          component: Special
        },
        {
          path: '/center',
          component: Center
        }
			]
		}
	]
})
