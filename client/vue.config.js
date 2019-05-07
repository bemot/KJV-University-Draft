const path = require('path')
module.exports = {
	outputDir: path.resolve(__dirname, '../public'),
	devServer: {
		proxy: {
			'/graphql': {
				target: 'http://localhost:4000'
			}
		}
	}
}
