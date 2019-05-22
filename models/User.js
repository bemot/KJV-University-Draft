const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
const md5 = require('md5')
const db = require('./../config/database')
const BookmarkedVerse = require('./BookmarkedVerse')

// Table Model
class User extends Sequelize.Model {}
User.init(
	{
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		avatar: Sequelize.STRING
	},
	{ sequelize: db, modelName: 'user' }
)

// Create and add avatar to user
User.beforeCreate(async (user, options) => {
	try {
		user.avatar = `http://gravatar.com/avatar/${md5(user.username)}?d=identicon`
	} catch (err) {
		console.log(err)
	}
})

// Hash password so it can not be seen w/ database access
User.beforeCreate(async (user, options) => {
	try {
		const hashedPassword = await bcrypt.hash(user.password, 12)
		user.password = hashedPassword
	} catch (err) {
		console.log(err)
	}
})

User.hasMany(BookmarkedVerse)

module.exports = User
