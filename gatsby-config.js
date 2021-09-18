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
				name: 'Gatsby + Node.js (TypeScript) API',
				short_name: 'Gatsby + Node.js (TypeScript)',
				start_url: '/',
				icon: 'src/images/gatsby-icon.png',
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
				},
				extensions: []
			}
		}
	],
};
