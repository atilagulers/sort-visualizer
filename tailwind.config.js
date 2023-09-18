/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7F5283',
        secondary: '#A6D1E6',
        dark: '#3D3C42',
        light: '#FEFBF6',
      },
    },
  },
  plugins: [],
};
