/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'primary': '#291F39',
      },
      backgroundImage: {
        'banner-login': "url(src/assets/background-image/banner-login.jpg)"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
      },
      screens: {
        'xs': '475px',
        // => @media (min-width: 475px) { ... }
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      backgroundColor: {
        'dark-purple': '#291F39',
        'grey-purple': '#605B72',
        'purple': '#4F4472',
        'semi-white': '#F8FAFD',
        'light-purple': '#F0ECFF',


        'primary': '#2B2738',
        'button-purple': '#4F4472',
        'semilight-purple': '#605B72',
        'light-purple': '#F0ECFF',
        'field': '#403D4C',
        'main': '#F8FAFD',
        'active-field': '#67627E'
      },
    },
  },
  plugins: [],
}