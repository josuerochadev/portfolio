import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SmileIcon from "@/assets/images/ui/smile.svg?react";

export default function ScrollToTop() {
	const { t } = useTranslation('common');
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 300);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			type="button"
			onClick={scrollToTop}
			aria-label={t('buttons.backToTop')}
			style={{ willChange: "transform, opacity" }}
			className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-2
        px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold
        bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
        dark:from-lime/10 dark:via-orange/5 dark:to-violet/10
        backdrop-blur-md border border-lime/30 dark:border-lime/20 text-violet dark:text-beige
        hover:bg-lime hover:text-orange dark:hover:bg-lime/20 dark:hover:text-lime
        font-sans uppercase tracking-wider text-sm
        transition-all duration-300 ease-in-out
        focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-orange
        active:scale-95
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
		>
			<SmileIcon className="w-6 h-6 sm:w-10 sm:h-10" />
			<span className="text-sm sm:text-lg font-bold">{t('buttons.backToTop').toUpperCase()}</span>
		</button>
	);
}
