/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundColor: {
      primary: "#1A171E",
      primaryLight: '#F0FFF0',
      cardsBg: '#333333',
      navbar: "#0D0D0F",
      navbarlight: '#f1faee',
      bgWhite: "#ffffff",
      hoverbg: "#443d4d",
    },
    colors: {
      PrimaryTextClr: "#F6F6F6",
      primaryTextLight: "#333333",
      SecondaryTextClr: "#2C2B32",
      logoText: "#E50712",
    },
    boxShadow: {
      "3xl": "rgba(229, 7, 18, 1) 0px 2px 7px",
      "4xl": 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      customShadow: "0 8px 12px -6px #2C2B32",
      namesShadow: '0px -4px 20px -1px rgba(0,0,0,1.90)',
    },
    screens: {
      sm: "640px",
      md: "768px",
      "md-lg": "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      Montserrat: [`Montserrat, sans-serif`],
      NotoSans: [`Noto Sans, sans-serif`],
    },
    girdTemplateColumns: {
      'custom': "repeat(5, minmax(0, 500px))",
    }, 
  },
  plugins: [],
};