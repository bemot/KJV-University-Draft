const Sequelize = require('sequelize')

// MySQL Database Connection
module.exports = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.HOST,
		dialect: 'mysql'
	}
)
