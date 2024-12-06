/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'loginPage': "url('./assets/background-login.png')",
        'background': "url('./assets/background.png')",
        'backg': "url('./assets/image.png')",
        'quotebg': "url('./assets/quotebg.png')",
      },
      fontFamily: {
        'head': ['Libre Baskerville', 'serif'],
        'body': ['Playfair Display', 'serif'],

      },
    },
  },
  plugins: [],
}

