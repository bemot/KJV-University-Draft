const { Book } = require('./models/Book')

module.exports = {
	Query: {
		getBooks: async (parent, args, context) => {
			return await Book.find()
		},
		getOneBook: async (parent, args, context) => {
			const book = await Book.findOne({ bookName: args.name })
			return book
		}
	}
}
