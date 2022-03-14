const colors = require('tailwindcss/colors')

module.exports = {
	content: [],
	theme: {
		extend: {
			colors: {
				green: colors.emerald,
				yellow: colors.amber,
				purple: colors.violet,
				'xm-black': '#150c21',
				'xm-black-dark': '#16161F',
				'xm-purple': '#562FFF',
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
				montserrat: ['Montserrat', 'serif'],
				archivo: ['Archivo', 'sans-serif'],
			},
			cursor: {
				none: 'none'
			},
			letterSpacing: {
				widester: '6px'
			},
			padding: {

			}
		},
	},
	plugins: [],
}
