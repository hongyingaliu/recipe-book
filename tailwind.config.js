/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdf8f0',
          100: '#faf0dc',
          200: '#f5e0b8',
        },
        terracotta: {
          400: '#c1694f',
          500: '#a85540',
          600: '#8d4232',
        },
        sage: {
          300: '#a8b89a',
          400: '#8fa882',
          500: '#6d8a5e',
        },
        warm: {
          brown: '#6b4c35',
          dark: '#3d2b1f',
        },
      },
      fontFamily: {
        handwritten: ['"Playpen Sans"', 'cursive'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
