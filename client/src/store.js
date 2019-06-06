import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { defaultClient as ApolloClient } from './main'
import {
	GET_BOOKS,
	GET_CHAPTERS,
	GET_VERSES,
	SIGNIN_USER,
	GET_CURRENT_USER,
	SIGNUP_USER,
	GET_BOOKMARKS,
	CREATE_BOOKMARK,
	UPDATE_BOOKMARK
} from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		books: '',
		chapters: '',
		verses: [],
		bookmarks: [],
		createdBookmark: false,
		user: null,
		loading: false,
		error: null,
		completed: null,
		authError: null,
		dark: false,
		refreshId: 1
	},
	getters: {
		user(state) {
			return state.user
		},
		allBooks(state) {
			return state.books
		},
		chapters(state) {
			return state.chapters
		},
		verses(state) {
			return state.verses
		},
		getBookmarks(state) {
			return state.bookmarks
		},
		createdBookmarkAlert(state) {
			return state.createdBookmark
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
		},
		getRefresh(state) {
			return state.refreshId
		}
	},
	mutations: {
		setBooks(state, { getBooks }) {
			state.books = getBooks.sort((a, b) => a.id - b.id)
		},
		setChapters(state, chapters) {
			state.chapters = chapters
		},
		setVerses(state, verses) {
			state.verses.push(verses)
		},
		clearVersesState(state) {
			state.verses = []
		},
		setBookmarks(state, bookmarks) {
			state.bookmarks = bookmarks.getBookmarks
		},
		bookmarkAlert(state, status) {
			state.createdBookmark = status
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
		},
		refreshID: state => (state.refreshId += 1)
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
		async fetchChapter({ commit }, name) {
			commit('setLoading', true)

			try {
				const response = await ApolloClient.query({
					query: GET_CHAPTERS,
					variables: {
						name: name
					}
				})
				const chapters = response.data
				commit('setChapters', chapters)
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err)
			}
		},
		async fetchVerses({ commit }, payload) {
			commit('setLoading', true)
			try {
				const response = await ApolloClient.query({
					query: GET_VERSES,
					variables: {
						name: payload.name,
						chapter: payload.chapter
					}
				})
				const verses = response.data
				commit('setVerses', verses)
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err)
			}
		},
		async clearVerses({ commit }) {
			commit('setLoading', true)
			try {
				commit('clearVersesState')
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				commit('setError', err)
			}
		},
		async fetchBookmarks({ commit }, payload) {
			try {
				const token = localStorage.getItem('token')
				const response = await ApolloClient.query({
					query: GET_BOOKMARKS,
					variables: {
						token: token,
						book: payload.name,
						chapterNum: payload.chapter
					}
				})
				const bookmarks = response.data
				console.log(bookmarks)
				commit('setBookmarks', bookmarks)
			} catch (err) {
				commit('setError', err)
			}
		},
		async createBookmark({ commit }, payload) {
			try {
				const token = localStorage.getItem('token')
				const response = await ApolloClient.mutate({
					mutation: CREATE_BOOKMARK,
					variables: {
						token: token,
						verseId: payload.verseId,
						comment: payload.comment,
						color: payload.color,
						dark: payload.dark,
						favorite: payload.favorite
					}
				})
				const status = response.data
				console.log(status)
			} catch (err) {
				commit('setError', err)
			}
		},
		async updateBookmark({ commit }, payload) {
			try {
				console.log('incoming data => ', payload)
				const token = localStorage.getItem('token')
				const response = await ApolloClient.mutate({
					mutation: UPDATE_BOOKMARK,
					variables: {
						id: payload.id,
						update: payload.update,
						token: token
					}
				})
				const status = response.data
				console.log(status)
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
