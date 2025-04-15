// src/utils/motion_variants.ts

export const fadeInUpSpring = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	transition: { type: "spring", stiffness: 80 },
};

export const fadeInDownSpring = {
	initial: { opacity: 0, y: -30 },
	animate: { opacity: 1, y: 0 },
	transition: { type: "spring", stiffness: 80 },
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
