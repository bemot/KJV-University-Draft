const { Book } = require('./models/Book')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
	const { username, email } = user
	// Sign JWT with secret & expiration date
	return jwt.sign({ username, email }, secret, { expiresIn })
}

module.exports = {
	Query: {
		getBooks: async (parent, args, context) => {
			return await Book.find()
		},
		getOneBook: async (parent, args, context) => {
			const book = await Book.findOne({ bookName: args.name })
			return book
		},
		getUser: async (parent, { id }, context) => {
			const user = await User.findById({ _id: id })
			return user
		},
		getCurrentUser: async (parent, args, { currentUser }) => {
			if (!currentUser) {
				return null
			}
			const user = await User.findOne({
				username: currentUser.username
			})
				.populate('bookedmarked')
				.populate('favorites')
			return user
		}
	},
	Mutation: {
		signInUser: async (parent, { username, password }, conext) => {
			// See if user exist
			const user = await User.findOne({ username })
			if (!user) {
				throw new Error('User not found')
			}
			// Else compare passwords to see if it's valid
			const isValidPassword = await bcrypt.compare(password, user.password)
			if (!isValidPassword) {
				throw new Error('Invalid password')
			}
			// Else return object with token and expiration date
			return { token: createToken(user, process.env.SECRET, '1hr') }
		},
		signUpUser: async (parent, { username, email, password }, context) => {
			// See if user exist
			const user = await User.findOne({ username })
			if (user) {
				throw new Error('User already exists')
			}
			// Else create new user
			const newUser = new User({
				username,
				email,
				password
			}).save()
			return { token: createToken(newUser, process.env.SECRET, '1hr') }
		}
	}
}
