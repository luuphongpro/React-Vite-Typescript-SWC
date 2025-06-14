/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // hoặc 'media' hoặc 'selector'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors cho dark mode
        background: 'blue',
        foreground: 'var(--color-text)',
      }
    },
  },
  plugins: [],
}