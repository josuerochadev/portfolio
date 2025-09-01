import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
		  colors: {
			beige: '#F5F0E8',
			lime: '#B5FF00',
			orange: '#FF7A00',
			violet: '#6900FF',
			'violet-dark': '#5500CC', // Better contrast for text on light backgrounds
		  },
		  fontFamily: {
			sans: ['Rubik', 'sans-serif'],
			serif: ['Fraunces', 'serif'],
			display: ['Fraunces', 'serif'],
		  },
		}
	  },
	plugins: [],
};

export default config;
