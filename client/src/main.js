import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

export const defaultClient = new ApolloClient({
	uri: '/graphql',
	// Include auth token w/ request made to backend
	fetchOptions: {
		credentials: 'include'
	},
	request: operation => {
		// If no token with key of 'token' in localstorage
		if (!localStorage.token) {
			localStorage.setItem('token', '')
		}
		// operation adds the token to an auth header, which is sent to backend
		operation.setContext({
			headers: {
				authorization: localStorage.getItem('token')
			}
		})
	},
	onError: ({ graphQLErrors, newtworkError }) => {
		if (newtworkError) {
			console.log('[networkError]', newtworkError)
		}

		if (graphQLErrors) {
			for (let err of graphQLErrors) {
				console.dir(err)
			}
		}
	}
})

const apolloProvider = new VueApollo({ defaultClient })

Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
	provide: apolloProvider.provide(),
	router,
	store,
	render: h => h(App),
	created() {
		// execute getCurrentUser query
		this.$store.dispatch('getCurrentUser')
	}
}).$mount('#app')
