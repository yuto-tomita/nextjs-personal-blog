/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: {'max': '560px'},
      md: {'max': '768px'},
      tb: {'max': '960px'}
    },
  },
  plugins: [],
}
