/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Stickey_BGC: '#1F1F31',
        Stickey_GREEN: '#2CDCB2'
      }
    },
  },
  plugins: [],
}