// src/utils/motion_variants.ts

export const navLinkHover = {
	initial: {
		scale: 1,
		color: "#6900FF",
	},
	hover: {
		scale: 1.15,
		color: "#FFA500",
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
};

export const fadeInUpTween = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] }, // ou "easeOut"
};

export const fadeInDownTween = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
};

export const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeIn = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeInRight = {
	initial: { opacity: 0, x: 30 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeInLeft = {
	initial: { opacity: 0, x: -30 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

export const zoomIn = {
	initial: { opacity: 0, scale: 0.95 },
	animate: { opacity: 1, scale: 1 },
	transition: { duration: 0.6, ease: "easeOut" },
};
