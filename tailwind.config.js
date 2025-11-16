/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}", // Tells Tailwind to scan all React and HTML files for classes
  ],
  darkMode: 'class', // Enables dark mode based on the 'dark' class on the HTML tag
  theme: {
    extend: {},
  },
  plugins: [],
}