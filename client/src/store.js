import Vue from 'vue'
import Vuex from 'vuex'
import { defaultClient as ApolloClient } from './main'
import { GET_BOOKS, GET_BOOK, SIGNIN_USER } from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		books: '',
		book: '',
		loading: false,
		error: false,
		dark: false
	},
	getters: {
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
		}
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
				commit('setLoading', true)
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
			try {
				const response = await ApolloClient.mutate({
					mutation: SIGNIN_USER,
					variables: payload
				})
				const { token } = response.data.signInUser

				localStorage.setItem('token', token)
			} catch (err) {
				// commit('setLoading', false)
				commit('setError', err)
			}
		}
	}
})
