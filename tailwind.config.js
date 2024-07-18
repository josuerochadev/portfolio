module.exports = {
  content: ["./**/*.{html,js}", "styles/custom.css"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-blue": "#0077ff",
        "secondary-blue": "#0066cc", // Couleur pour l'effet hover
        "primary-red": "#ff3d00",
        "secondary-red": "#e60000", // Couleur pour l'effet hover
        "primary-yellow": "#ffd600",
        "secondary-yellow": "#ffb300", // Couleur pour l'effet hover
        "dark-black": "#1a1a1a",
        "custom-gray": {
          100: "#f7f7f7",
          200: "#e6e6e6",
          300: "#d5d5d5",
          400: "#b3b3b3",
          500: "#8c8c8c",
          600: "#737373",
          700: "#595959",
          800: "#404040",
          900: "#262626",
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
        'serif': ['Bitter', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      backgroundColor: {
        dark: "#111111",
      },
    },
  },
  plugins: [],
};