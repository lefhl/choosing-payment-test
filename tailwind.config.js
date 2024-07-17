/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
    screens: {
      sm: '320px',
      md: '576px',
      lg: '768px',
      xl: '990px',
      '2xl': '1260px',
      '3xl': '1400px',
      '4xl': '1600px'
    }
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}
