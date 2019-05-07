const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema

const BookmarkedVerseSchema = new Schema({
	verse: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
		ref: 'Verse'
	},
	comment: String,
	color: String,
	favorite: Boolean
})

BookmarkedVerseSchema.plugin(timestamps)

module.exports = mongoose.model('BookmarkedVerse', BookmarkedVerseSchema)
