/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "green": "#39DB4A",
      "red": "#FF6868",
      "secondary": "#555",
      "primaryBG": "#FCFCFC",
      'white': '#ffffff',
      'rose-500': 'rgb(244 63 94)',
      'black': '#020617',
      'indigo': 'rgb(99 102 241)',
      'orange': 'rgb(249 115 22)'
    },
    extend: {
      

    },
    fontFamily: {
      "primary" : ['Inter','sans-serif']
    }
  },
  plugins: [require('daisyui')],
}