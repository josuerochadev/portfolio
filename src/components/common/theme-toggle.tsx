import type React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

interface ThemeToggleProps {
	theme: "light" | "dark";
	toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
	const { t } = useTranslation("common");
	const isDark = theme === "dark";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="
				fixed bottom-6 left-6 z-[99999] transform-gpu
				flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 rounded-full
				bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
				dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
				backdrop-blur-md border border-lime/30 dark:border-lime/20
				text-violet dark:text-beige
				hover:bg-lime hover:text-orange dark:hover:bg-lime/20 dark:hover:text-lime
				font-sans font-bold text-sm
				transition-all duration-300 shadow-glow-lime hover:shadow-glow-lime-lg
				active:scale-95
				focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
				dark:focus:ring-offset-dark-bg
			"
			aria-label={isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
		>
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={theme}
					initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
					animate={{ rotate: 0, opacity: 1, scale: 1 }}
					exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					className="flex items-center justify-center"
					aria-hidden="true"
				>
					{isDark ? <FaSun className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaMoon className="w-4 h-4 sm:w-5 sm:h-5" />}
				</motion.span>
			</AnimatePresence>
		</button>
	);
};

export default ThemeToggle;
