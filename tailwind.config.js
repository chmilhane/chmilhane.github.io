module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      green: {
        light: 'var(--color-green-light)',
        dark: 'var(--color-green-dark)'
      },
      gray: '#ACACAC',
      black: '#000000',
      white: '#FFF',
      background: '#F8F8F8'
    },
    borderWidth: {
      DEFAULT: '1px',
      '3': '3px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
