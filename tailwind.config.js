/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#F0A500',
        secondary: '#232931',
        darkPrimary: '#000',
        darkSecondary: '#232931',
        lightPrimary: '#F8F0E5',
        lightSecondary: '#FFF6E0',
      },
    },
  },
  plugins: [],
};
