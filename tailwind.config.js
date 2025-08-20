/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--background-primary)',
          dark: 'var(--background-dark)',
        },
        text: {
          primary: 'var(--text-color)',
          dark: 'var(--text-dark)',
        },
        accent: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          alternative: 'var(--accent-alternative)',
          dark: 'var(--accent-dark)',
        },
      },
      fontFamily: {
        metropolis: ['Metropolis', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif']
      },
    },
  },
  plugins: [],
}
