/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: [`var(--font-cairo)`],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
