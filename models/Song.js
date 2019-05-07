const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema

const SongSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	author: {
		type: String,
		default: true
	},
	verses: {
		type: Array,
		required: true
	},
	chorus: {
		type: Array,
		required: true
	},
	songNumber: {
		type: Number,
		required: true
	}
})

SongSchema.plugin(timestamps)

module.exports = mongoose.model('Song', SongSchema)
