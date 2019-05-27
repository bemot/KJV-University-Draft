import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { defaultClient as ApolloClient } from './main'
import {
	GET_BOOKS,
	GET_BOOK,
	SIGNIN_USER,
	GET_CURRENT_USER,
	SIGNUP_USER,
	GET_BOOKMARKS
} from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		books: '',
		book: '',
		bookmarks: null,
		user: null,
		loading: false,
		error: null,
		completed: null,
		authError: null,
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
		allBookmarks(state) {
			return state.bookmarks
		},
		loading(state) {
			return state.loading
		},
		getError(state) {
			return state.error
		},
		getAuthError(state) {
			return state.authError
		},
		isDark(state) {
			return state.dark
		},
		isCompleted(state) {
			return state.completed
		}
	},
	mutations: {
		setBooks(state, { getBooks }) {
			state.books = getBooks.sort((a, b) => a.id - b.id)
		},
		setOneBook(state, book) {
			state.book = book
		},
		setBookmarks(state, bookmarks) {
			state.bookmarks = bookmarks.getBookmarks
		},
		setLoading(state, status) {
			state.loading = status
		},
		setError(state, error) {
			state.error = error
		},
		setAuthError(state, error) {
			state.authError = error
		},
		invert(state) {
			state.dark = !state.dark
		},
		setUser(state, payload) {
			state.user = payload
		},
		clearUser: state => (state.user = null),
		setCompleted(state, payload) {
			return (state.completed = payload)
		}
	},
	actions: {
		async fetchBooks({ commit }) {
			try {
				const response = await ApolloClient.query({
					query: GET_BOOKS
				})
				const book = response.data
				commit('setBooks', book)
			} catch (err) {
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
		async fetchBookmarks({ commit }) {
			try {
				const token = localStorage.getItem('token')
				const response = await ApolloClient.query({
					query: GET_BOOKMARKS,
					variables: {
						token: token
					}
				})
				const bookmarks = response.data
				commit('setBookmarks', bookmarks)
			} catch (err) {
				commit('setError', err)
			}
		},
		async signInUser({ commit }, payload) {
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
				router.go()
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
		async signUpUser({ commit }, payload) {
			commit('setLoading', true)
			try {
				const response = await ApolloClient.mutate({
					mutation: SIGNUP_USER,
					variables: payload
				})
				const { token } = response.data.signUpUser

				localStorage.setItem('token', token)
				commit('setLoading', false)
				// reload the page after current user is fetched (getCurrentUser in main.js)
				router.push('login')
				router.go(1)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err)
			}
		},
		async getCurrentUser({ commit }) {
			try {
				const { data } = await ApolloClient.query({
					query: GET_CURRENT_USER
				})
				commit('setUser', data.getCurrentUser)
			} catch (err) {
				commit('setError', err)
			}
		}
	}
})
