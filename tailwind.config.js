/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        accent: '#b8975a',
        light: '#f9f7f4',
        muted: '#6b6b6b',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
