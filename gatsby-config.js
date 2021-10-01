const path = require('path')

module.exports = {
	siteMetadata: {
		title: 'Gatsby + Node.js (TypeScript) API',
	},
	plugins: [
		`gatsby-plugin-postcss`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'Malik Zubayer Ul Haider',
				short_name: 'Malik Zubayer Ul Haider',
				start_url: '/',
				icon: 'src/images/xm-logo.svg',
			},
		},
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: {
					"@components": path.resolve(__dirname, 'src/components'),
					"@layouts": path.resolve(__dirname, 'src/layouts'),
					"@images": path.resolve(__dirname, 'src/images'),
					"@utils": path.resolve(__dirname, 'src/utils'),
					"@hooks": path.resolve(__dirname, 'src/hooks'),
					"@data": path.resolve(__dirname, 'src/data'),
				},
				extensions: []
			}
		}
	],
};
