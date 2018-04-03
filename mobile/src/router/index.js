import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home')
const Newest = r => require.ensure([], () => r(require('@/pages/Newest')), 'Newest')

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
					component: Home
				},
				{
					path: 'newest',
					component: Newest
				}
			]
		}
	]
})
