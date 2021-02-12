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
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
