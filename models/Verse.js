const Sequelize = require('sequelize')
const db = require('./../config/database')

// Table Model
class Verse extends Sequelize.Model {}
Verse.init(
	{
		book_name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		chapter_number: Sequelize.INTEGER,
		verse_number: Sequelize.INTEGER,
		verse_text: Sequelize.STRING,
		word_count: Sequelize.INTEGER,
		letter_count: Sequelize.INTEGER,
		character_count: Sequelize.INTEGER
	},
	{ underscored: true, sequelize: db, modelName: 'verse' }
)

module.exports = Verse
