/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "orange-fyr":"#EE9322",
        "oragne-secondary-fyr":"#cd7c18",
        "black-100": "#2B2C35",
      },
      backgroundImage: {
        'hero-bg': "url('/hero-bg.png')"
      }
    },
  },
  plugins: [],
}