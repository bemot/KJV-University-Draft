const { ApolloServer, AuthenticationError } = require('apollo-server')
const db = require('./config/database')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

// Importing Mongoose Models
const Book = require('./models/Book')
const Song = require('./models/Song')

// Import typeDefs and Resolvers
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers.js')

// Check Database Connection
db.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.')
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})

// Connecting to MongoDB
// mongoose
// 	.connect(process.env.MONGO_URI, {
// 		useNewUrlParser: true,
// 		useCreateIndex: true
// 	})
// 	.then(() => console.log('MongoDB Connected...'))
// 	.catch(err => console.error(err))

// Verify JWT Token passed from client
const getUser = async token => {
	if (token) {
		try {
			return await jwt.verify(token, process.env.SECRET)
		} catch (error) {
			throw new AuthenticationError(
				'Your session has ended. Please sign in again.'
			)
		}
	}
}

// Creating Apollo/GraphQL server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	formatError: error => ({
		name: error.name,
		message: error.message.replace('Context creation failed:', '')
	}),
	context: async ({ req }) => {
		const token = req.headers.authorization
		return { Book, currentUser: await getUser(token) }
	}
})

// Start server on default port: 4000
server
	.listen()
	.then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`)
	})
	.catch(err => console.log(err))
