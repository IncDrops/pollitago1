/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Point to your frontend source files
    "./src/**/*.{js,jsx,ts,tsx}",
    // Point to your frontend public HTML file if it's separate
    "./public/index.html", // Assuming index.html is in the public folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}