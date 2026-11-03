/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4fbf7',
          100: '#e6f7ee',
          200: '#ceeedc',
          300: '#a3dfc0',
          400: '#6ec89f',
          500: '#43ab7e',
          600: '#2f8f67',
          700: '#267253',
          800: '#215b44',
          900: '#1c4b39',
          950: '#0e2a20',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
      }
    },
  },
  plugins: [],
}
