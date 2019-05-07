import Vue from 'vue'
import Vuex from 'vuex'
import { defaultClient as ApolloClient } from './main'
import { GET_BOOKS, GET_BOOK } from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		books: '',
		book: '',
		loading: false,
		error: false
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
		}
	}
})
