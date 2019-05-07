const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

// Importing Mongoose Models
const Book = require('./models/Book')

// Import typeDefs and Resolvers
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers.js')

// Connecting to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.error(err))

// Creating Apollo/GraphQL server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		Book
	}
})

// Start server on default port: 4000
server
	.listen()
	.then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`)
	})
	.catch(err => console.log(err))
