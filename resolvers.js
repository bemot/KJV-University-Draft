const { Book } = require('./models/Book')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
	const { username, email } = user
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
		}
	},
	Mutation: {
		signinUser: async (parent, { username, password }, conext) => {
			const user = await User.findOne({ username })
			if (!user) {
				throw new Error('User not found')
			}
			const isValidPassword = await bcrypt.compare(password, user.password)
			if (!isValidPassword) {
				throw new Error('Invalid password')
			}
			return { token: createToken(user, process.env.SECRET, '1hr') }
		},
		signupUser: async (parent, { username, email, password }, context) => {
			const user = await User.findOne({ username })
			if (user) {
				throw new Error('User already exists')
			}
			const newUser = new User({
				username,
				email,
				password
			}).save()
			return { token: createToken(newUser, process.env.SECRET, '1hr') }
		}
	}
}
