module.exports = {
  purge: {
    enabled: false,
    mode: 'all',
    preserveHtmlElements: true,
    content: [
      './src/**/*.{js,jsx,ts,tsx}', 
      './public/index.html'
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark1': '#121212',
        'dark2': '#272727',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
