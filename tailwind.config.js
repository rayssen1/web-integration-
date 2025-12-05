/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
   theme: {
    extend: {
      colors: {
        'primary-violet': '#667EEA',
        'gradient-purple': '#764BA2',
        'dark-text': '#1D1D1B',
        'teal-accent': '#38B2AC',
        'gray-outline': '#E2E8F0',
        'method-gray': '#E2E8F0', // <-- AJOUT
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      spacing: {
        '70': '70px',
        '20': '20px',
      },
      borderRadius: {
        'material': '8px',
      },
      fontSize: {
        'h1-material': ['16px', { lineHeight: '1.2', fontWeight: '700' }],
        'paragraph-material': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      boxShadow: {
        'material': '0px 4px 12px rgba(0, 0, 0, 0.1)',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

