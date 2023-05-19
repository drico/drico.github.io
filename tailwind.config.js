/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./app/**/*.{js,ts,jsx,tsx}",
    // "./pages/**/*.{js,ts,jsx,tsx}",
    // "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#37474F",
        text: "#374649",
        darkest: "#263238",
        light: "#8FA5AE",
      },
      fontFamily: {
        sans: ["Roboto"],
        headers: ["Nunito"],
        arial: ["Arial"],
      },
      fontSize: {
        xxs: 9,
      },
    },
  },
  plugins: [],
};
