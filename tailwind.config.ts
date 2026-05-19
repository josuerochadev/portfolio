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
			'orange-dark': '#E06800',
			violet: '#6900FF',
			'violet-dark': '#5500CC', // Better contrast for text on light backgrounds
			// Dark mode surface colors
			'dark-bg': '#0F0A1A',
			'dark-surface': '#1A1230',
			// Surface Citron tokens (D02)
			'surface-citron-fg': '#5500CC',
			'surface-citron-muted': 'rgba(85, 0, 204, 0.60)',
			'surface-citron-border': 'rgba(85, 0, 204, 0.15)',
			// Surface Nuit tokens (D02)
			'surface-nuit-fg': '#F5F0E8',
			'surface-nuit-muted': 'rgba(245, 240, 232, 0.55)',
			'surface-nuit-border': 'rgba(181, 255, 0, 0.22)',
		  },
		  boxShadow: {
			'glow-lime': '0 4px 18px -2px rgba(181, 255, 0, 0.35)',
			'glow-lime-lg': '0 8px 30px -3px rgba(181, 255, 0, 0.5)',
			'glow-orange': '0 4px 18px -2px rgba(255, 122, 0, 0.4)',
			'glow-orange-lg': '0 8px 30px -3px rgba(255, 122, 0, 0.55)',
			'glow-violet': '0 4px 18px -2px rgba(105, 0, 255, 0.35)',
			'glow-violet-lg': '0 8px 30px -3px rgba(105, 0, 255, 0.5)',
			'card': '0 8px 32px rgba(105, 0, 255, 0.15), 0 2px 8px rgba(105, 0, 255, 0.06)',
			'card-hover': '0 16px 48px rgba(105, 0, 255, 0.22), 0 4px 12px rgba(105, 0, 255, 0.10)',
			'cta': '0 4px 24px rgba(255, 122, 0, 0.35), 0 1px 4px rgba(255, 122, 0, 0.20)',
			'lime-glow': '0 0 40px rgba(181, 255, 0, 0.30)',
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
