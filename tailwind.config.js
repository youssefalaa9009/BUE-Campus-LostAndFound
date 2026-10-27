/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: require("./src/constants/colors"),            //~~youssef241784
        
    },
  },
  plugins: [],
};
