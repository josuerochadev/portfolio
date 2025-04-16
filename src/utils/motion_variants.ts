// src/utils/motion_variants.ts

export const navLinkHover = {
	initial: {
		scale: 1,
		color: "#6900FF", // original
	},
	hover: {
		scale: 1.15,
		color: "#FFA500", // hover
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
		},
	},
};

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
