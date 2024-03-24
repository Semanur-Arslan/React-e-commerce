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

          secondary: "#d6d3d1",

          accent: "#272727",

          neutral: "#D9EDBF",

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
