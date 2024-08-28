/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      textColor: ['responsive', 'hover', 'focus', 'active'],
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#56B280",

          secondary: "#D9EDBF",

          accent: "#272727",

          neutral: "#d6d3d1", 

          info: "#f3f4f6",

          success: "#16a34a",

          warning: "#F9E897",

          error: "#dc2626",

          extend: {
            colors: {
              primary: "#56B280",
              info: "#f3f4f6",
            },
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
  


};
