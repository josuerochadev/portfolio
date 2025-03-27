import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        violet: '#6900FF',
        orange: '#FF7A00',
        beige: '#DBDBDB',
        lime: '#B5FF00',
        darkgray: '#343434',
        // variantes utiles
        'violet-light': '#A675FF',
        'orange-light': '#FFAA55',
        'lime-dark': '#9CD900',
        'gray-soft': '#dcdcdc',
      },
      fontFamily: {
        sans: ['Rubik', 'ui-sans-serif', 'system-ui'],
        serif: ['Fraunces', 'ui-serif', 'Georgia'],
      },
    },
  },
  plugins: [],
};

export default config;