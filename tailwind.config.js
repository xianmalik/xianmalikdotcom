module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'xm-black': '#150c21',
				'xm-black-dark': '#16161F',
				'xm-purple': '#562FFF',
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
			},
			cursor: {
				none: 'none'
			},
			letterSpacing: {
				widester: '6px'
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
