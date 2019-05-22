const Sequelize = require('sequelize')
const db = require('./../config/database')

// Table Model
const Song = db.define('song', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	author: {
		type: Sequelize.STRING,
		defaultValue: 'Unknown'
	},
	songNumber: Sequelize.INTEGER,
	stanzas: Sequelize.STRING,
	chorus: Sequelize.STRING
})

module.exports = Song
