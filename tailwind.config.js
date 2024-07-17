module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-blue": "var(--color-primary-blue)",
        "primary-red": "var(--color-primary-red)",
        "primary-yellow": "var(--color-primary-yellow)",
        "dark-black": "var(--color-dark-black)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
      },
      backgroundColor: {
        dark: "#111111",
      },
    },
  },
  plugins: [],
};
