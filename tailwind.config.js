/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // UI colors
      colors: {
        black: '#0E0C19',
        red: {
          normal: '#E40B3C',
          light: '#EC1142'
        },
        white: '#FEFEFE'
      },
      height: {
        22: '5.5rem' // You can adjust the value as needed
      }
    }
  },
  plugins: []
};
