import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { defaultClient as ApolloClient } from './main'
import { GET_BOOKS, GET_BOOK, SIGNIN_USER, GET_CURRENT_USER } from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		books: '',
		book: '',
		user: null,
		loading: false,
		error: null,
		dark: false
	},
	getters: {
		user(state) {
			return state.user
		},
		allBooks(state) {
			return state.books
		},
		oneBook(state) {
			return state.book
		},
		loading(state) {
			return state.loading
		},
		getError(state) {
			return state.error
		},
		isDark(state) {
			return state.dark
		}
	},
	mutations: {
		setBooks(state, { getBooks }) {
			state.books = getBooks.sort((a, b) => a.bookNumber - b.bookNumber)
		},
		setOneBook(state, book) {
			state.book = book
		},
		setLoading(state, status) {
			state.loading = status
		},
		setError(state, error) {
			state.error = error
		},
		invert(state) {
			state.dark = !state.dark
		},
		setUser(state, payload) {
			state.user = payload
		},
		clearUser: state => (state.user = null)
	},
	actions: {
		async fetchBooks({ commit }) {
			commit('setLoading', true)
			try {
				const response = await ApolloClient.query({
					query: GET_BOOKS
				})
				const book = response.data
				commit('setBooks', book)
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err)
			}
		},
		async fetchOneBook({ commit }, name) {
			commit('setLoading', true)

			try {
				const response = await ApolloClient.query({
					query: GET_BOOK,
					variables: {
						name: name
					}
				})
				const book = response.data
				commit('setOneBook', book)
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err)
			}
		},
		async signInUser({ commit }, payload) {
			localStorage.setItem('token', '')
			commit('setLoading', true)
			try {
				const response = await ApolloClient.mutate({
					mutation: SIGNIN_USER,
					variables: payload
				})
				const { token } = response.data.signInUser

				localStorage.setItem('token', token)
				// reload the page after current user is fetched (getCurrentUser in main.js)
				commit('setLoading', false)
				router.go('/')
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err)
			}
		},
		async signOutUser({ commit }) {
			try {
				// Clear user in state
				commit('clearUser')
				// Remove token from localstorage
				localStorage.setItem('token', '')
				// End session
				await ApolloClient.resetStore()
				router.push('/')
			} catch (err) {
				commit('setError', err)
			}
		},
		async getCurrentUser({ commit }) {
			try {
				commit('setLoading', true)
				const { data } = await ApolloClient.query({
					query: GET_CURRENT_USER
				})
				commit('setLoading', false)
				commit('setUser', data.getCurrentUser)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err)
			}
		}
	}
})
