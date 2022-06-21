const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jex,ts,tsx}"],
  theme: {
    extend: {},
    // container: {
    //   center: true,
    // },
    colors: {
      blue: {
        100: "#D1FAFF",
        200: "#9BD1E5",
        300: "#6A8EAE",
        400: "#173753",
      },
      purple: "#D387AB",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      transparent: "transparent",
      red: colors.red,
    },
  },
  plugins: [],
};
