/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green": "#39DB4A",
        "red": "#FF6868",
        "secondary": "#555",
        "primaryBG": "#FCFCFC",
        "brand-gold": "#D4AF37",
        "brand-dark": "#0B0F19",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-bg": "rgba(15, 23, 42, 0.65)"
      },
    },
    fontFamily: {
      "primary": ['Inter', 'sans-serif']
    }
  },
  plugins: [require('daisyui')],
}