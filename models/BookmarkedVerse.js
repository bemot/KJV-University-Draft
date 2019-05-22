const Sequelize = require('sequelize')
const db = require('./../config/database')

class BookmarkedVerse extends Sequelize.Model {}
BookmarkedVerse.init(
	{
		verse: {
			type: Sequelize.STRING
		},
		comment: Sequelize.STRING,
		color: Sequelize.STRING,
		dark: Sequelize.BOOLEAN,
		favorite: Sequelize.BOOLEAN
	},
	{ sequelize: db, modelName: 'bookmarked_verse' }
)

module.exports = BookmarkedVerse
