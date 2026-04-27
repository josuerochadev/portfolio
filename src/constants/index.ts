export const ANIMATION = {
	DURATIONS: {
		FAST: 0.3,
		MEDIUM: 0.6,
		SLOW: 0.8,
		VERY_SLOW: 1.2,
		EXTRA_SLOW: 4,
	},
	DELAYS: {
		INSTANT: 0,
		VERY_SHORT: 0.05,
		SHORT: 0.2,
		MEDIUM: 0.5,
		LONG: 0.6,
		VERY_LONG: 0.8,
		EXTRA_LONG: 1.0,
	},
	EASING: {
		SMOOTH: [0.65, 0, 0.35, 1] as const,
		BOUNCE: [0.6, 0.05, 0.01, 0.99] as const,
		CUBIC: [0.83, 0, 0.17, 1] as const,
	},
	TIMEOUTS: {
		LETTER_RIPPLE: 2000,
		LIGHT_STRIP: 10,
	},
} as const;

export const COLORS = {
	VIOLET: {
		BG: "bg-violet",
		TEXT: "text-violet",
		BORDER: "border-violet",
		HOVER_TEXT: "hover:text-violet",
	},
	ORANGE: {
		BG: "bg-orange", 
		TEXT: "text-orange-dark",
		BORDER: "border-orange",
		HOVER_TEXT: "hover:text-orange",
	},
	LIME: {
		BG: "bg-lime",
		TEXT: "text-lime",
		BORDER: "border-lime",
		HOVER_TEXT: "hover:text-lime",
	},
	VARIANTS: {
		VIOLET_DARK: "text-violet-dark",
		VIOLET_80: "text-violet/80",
		VIOLET_70: "text-violet/70", 
		VIOLET_90: "text-violet/90",
		LIME_20: "bg-lime/20",
		LIME_30: "border-lime/30",
	},
	HIGH_CONTRAST: {
		VIOLET_ON_LIGHT: "text-violet-dark",
		TEXT_MUTED: "text-gray-600",
		TEXT_SECONDARY: "text-gray-700",
	},
} as const;

export const TRANSITIONS = {
	DEFAULT: "transition-all duration-300",
	COLORS: "transition-colors duration-300",
	COLORS_FAST: "transition-colors duration-200",
	SMOOTH: "transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]",
	NAVBAR_BAR: "transition-[width,opacity] duration-100 ease-[cubic-bezier(0.83,0,0.17,1)]",
	SCROLL_TO_TOP: "transition-all duration-300 ease-in-out",
} as const;

export const COMPONENTS = {
	BUTTON: "button",
	FOCUS_RING: "focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2",
	ROUNDED: {
		SM: "rounded",
		MD: "rounded-lg", 
		LG: "rounded-xl",
		FULL: "rounded-full",
		"2XL": "rounded-2xl",
	},
} as const;

export const LAYOUTS = {
	PAGE_CONTAINER: "min-h-screen",
	CONTENT_CENTER: "flex items-center justify-center",
	TEXT_CENTER: "text-center",
	RESPONSIVE_TEXT: {
		H1: "text-4xl md:text-5xl",
		H2: "text-2xl md:text-3xl",
		DISPLAY: "text-[clamp(4rem,8vw,8rem)]",
	},
} as const;