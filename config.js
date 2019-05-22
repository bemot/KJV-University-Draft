const Sequelize = require('sequelize')

// Database Connection
const sequelize = new Sequelize('kjvudb', 'lijah', 'VarPS887713$', {
	host: 'kjv-university.cgjh3om0jcdn.us-east-2.rds.amazonaws.com',
	dialect: 'mysql'
})

// Table Model
const Song = sequelize.define('song', {
	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	author: {
		type: Sequelize.STRING,
		defaultValue: 'Unknown'
	}
})

// Check Database Connection
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.')
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})

// Sync ALL Models to Database
sequelize
	.sync({
		logging: console.log
	})
	.then(() => {
		return Song.create({
			title: 'Hello World',
			author: 'Johnny Bob'
		})
	})
	.catch(err => console.log(err))
