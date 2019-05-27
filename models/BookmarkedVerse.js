const Sequelize = require('sequelize')
const db = require('./../config/database')
const Verse = require('./Verse')

class BookmarkedVerse extends Sequelize.Model {}
BookmarkedVerse.init(
	{
		comment: Sequelize.STRING,
		color: Sequelize.STRING,
		dark: Sequelize.BOOLEAN,
		favorite: Sequelize.BOOLEAN
	},
	{ sequelize: db, modelName: 'bookmarked_verse' }
)

BookmarkedVerse.belongsTo(Verse)

module.exports = BookmarkedVerse
