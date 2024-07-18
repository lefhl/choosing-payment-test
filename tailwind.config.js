/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      spacing: {
        '15px': '15px',
        '30px': '30px'
      }
    },
    screens: {
      sm: '320px',
      md: '576px',
      lg: '768px',
      xl: '990px',
      '2xl': '1260px',
      '3xl': '1400px',
      '4xl': '1600px'
    },
    fontSize: {
      xs: '0.6875rem' /* 11px */,
      '2xs': '0.75rem' /* 12px */,
      '3xs': '0.8125rem' /* 13px */,
      sm: '0.875rem' /* 14px */,
      base: '1rem' /* 16px */,
      xl: '1.125rem' /* 18px */,
      '2xl': '1.25rem' /* 20px */,
      '3xl': '1.5rem' /* 24px */,
      '4xl': '1.875rem' /* 30px */,
      '5xl': '2.25rem' /* 36px */
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem' /* 2px */,
      DEFAULT: '0.25rem' /* 4px */,
      md: '0.375rem' /* 6px */,
      lg: '0.5rem' /* 8px */,
      xl: '0.625rem' /* 10px */,
      full: '9999px',
      large: '12px'
    }
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}
