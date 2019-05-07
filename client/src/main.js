import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

export const defaultClient = new ApolloClient({
	uri: '/graphql'
})

const apolloProvider = new VueApollo({ defaultClient })

Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
	provide: apolloProvider.provide(),
	router,
	store,
	render: h => h(App)
}).$mount('#app')
