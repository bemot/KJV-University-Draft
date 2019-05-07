const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const VerseSchema = mongoose.Schema({
	bookName: {
		type: String,
		required: true
	},
	chapterNumber: {
		type: Number,
		required: true
	},
	verseNumber: {
		type: Number,
		required: true
	},
	verseText: {
		type: String,
		required: true
	},
	wordCount: Number,
	letterCount: Number,
	characterCount: Number
})

VerseSchema.plugin(timestamp)

module.exports.Verse = mongoose.model('verses', VerseSchema)

const ChapterSchema = mongoose.Schema({
	bookName: {
		type: String,
		required: true
	},
	chapterNumber: {
		type: Number,
		required: true
	},
	verses: {
		type: [VerseSchema],
		required: true
	},
	totalVerseCount: Number,
	totalWordCount: Number,
	totalLetterCount: Number,
	totalCharacterCount: Number
})

ChapterSchema.plugin(timestamp)

module.exports.Chapter = mongoose.model('chapters', ChapterSchema)

const BookSchema = new mongoose.Schema({
	bookTitle: String,
	bookName: {
		type: String,
		required: true
	},
	bookNumber: Number,
	chapters: {
		type: [ChapterSchema],
		required: true
	},
	chapterCount: Number,
	totalBookVerses: Number,
	totalBookWords: Number,
	totalBookLetters: Number,
	totalBookCharacters: Number
})

BookSchema.plugin(timestamp)

module.exports.Book = mongoose.model('Book', BookSchema)
