const Sequelize = require('sequelize')
const db = require('../config/database')
const Verse = require('./Verse')

// Table Model
class Chapter extends Sequelize.Model {}
Chapter.init(
	{
		book_name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		chapter_number: Sequelize.INTEGER,
		total_verse_count: Sequelize.STRING,
		total_word_count: Sequelize.INTEGER,
		total_letter_count: Sequelize.INTEGER,
		total_character_count: Sequelize.INTEGER
	},
	{ underscored: true, sequelize: db, modelName: 'chapter' }
)

Chapter.hasMany(Verse)

module.exports = Chapter
