import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AuthGuard from './AuthGuard'

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
			path: '/profile',
			name: 'profile',
			component: () => import('./views/Profile.vue'),
			beforeEnter: AuthGuard
		},
		{
			path: '/favorites',
			name: 'favorites',
			component: () => import('./views/Favorites.vue'),
			beforeEnter: AuthGuard
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./views/SignIn.vue')
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
