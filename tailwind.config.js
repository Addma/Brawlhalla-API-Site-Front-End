/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      animation: {
        'spin-ease-out': 'spin 1s ease-out infinite reverse'
      },
      keyframes: {
        spinEaseOut: {
          '0%': {transform: 'rotate(0deg)'},
          '70%': {transform: 'rotate(360deg)'},
          '100%': {transform: 'rotate(360deg)'}
        }
      }
    },
  },
  plugins: [],
}
