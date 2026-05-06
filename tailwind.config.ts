import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: 'class',
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
		  colors: {
			beige: '#F5F0E8',
			lime: '#B5FF00',
			orange: '#FF7A00',
			'orange-dark': '#C56200',
			violet: '#6900FF',
			'violet-dark': '#5500CC', // Better contrast for text on light backgrounds
			// Dark mode surface colors
			'dark-bg': '#0F0A1A',
			'dark-surface': '#1A1230',
		  },
		  boxShadow: {
			'glow-lime': '0 4px 18px -2px rgba(181, 255, 0, 0.35)',
			'glow-lime-lg': '0 8px 30px -3px rgba(181, 255, 0, 0.5)',
			'glow-orange': '0 4px 18px -2px rgba(255, 122, 0, 0.4)',
			'glow-orange-lg': '0 8px 30px -3px rgba(255, 122, 0, 0.55)',
			'glow-violet': '0 4px 18px -2px rgba(105, 0, 255, 0.35)',
			'glow-violet-lg': '0 8px 30px -3px rgba(105, 0, 255, 0.5)',
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
