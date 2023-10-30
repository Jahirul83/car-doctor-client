/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // light mode
  /**********************/
  daisyui: {
    themes: ["light"],
  },
  // light mode
  /**********************/

  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

