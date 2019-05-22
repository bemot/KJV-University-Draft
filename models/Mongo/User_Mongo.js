const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema

const md5 = require('md5')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: String,
	bookedmarked: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
		ref: 'BookmarkedVerse'
	}
})

// Create and add avatar to user
UserSchema.pre('save', function(next) {
	this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`
	next()
})

// Hash password so it can not be seen w/ database access
UserSchema.pre('save', async function(next) {
	try {
		if (!this.isModified('password')) {
			return next()
		}
		const salt = await bcrypt.genSalt(12)
		const hash = await bcrypt.hash(this.password, salt)
		this.password = hash
		next()
	} catch (err) {
		next(err)
	}
})

UserSchema.plugin(timestamps, { createdAt: 'joinDate' })

module.exports = mongoose.model('User', UserSchema)
