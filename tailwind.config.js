const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      borderRadius: {
        xl: "15px"
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem"
      }
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")]
};
