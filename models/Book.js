const Sequelize = require('sequelize')
const db = require('./../config/database')
const Chapter = require('./Chapter')

// Table Model
class Book extends Sequelize.Model {}
Book.init(
	{
		book_title: Sequelize.STRING,
		book_title_2: Sequelize.STRING,
		book_name: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		chapter_count: Sequelize.INTEGER,
		total_book_verses: Sequelize.INTEGER,
		total_book_words: Sequelize.INTEGER,
		total_book_letters: Sequelize.INTEGER,
		total_book_characters: Sequelize.INTEGER
	},
	{ underscored: true, sequelize: db, modelName: 'book' }
)

Book.hasMany(Chapter)

module.exports = Book
