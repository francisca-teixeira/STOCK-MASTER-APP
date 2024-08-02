/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary': '#FBD542',
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        },
        'black' : '#000000',
        'white' : '#FFFFFF',
        'offwhite' : '#F7F7F7',
      },
    },
  },
  plugins: [],
}
