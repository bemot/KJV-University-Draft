import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/:bookName',
			name: 'book',
			component: () => import('./views/Book.vue')
		},
		{
			path: '*',
			name: '404',
			component: Home
		}
	]
})