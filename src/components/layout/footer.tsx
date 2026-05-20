import type React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LetterRippleEffect from "@/components/effects/letter-ripple";

const FOOTER_NAV: { key: string; section: string; href?: string }[] = [
	{ key: "home", section: "hero" },
	{ key: "about", section: "bio" },
	{ key: "work", section: "projects" },
	{ key: "blog", section: "", href: "https://blog.josuerocha.dev" },
	{ key: "contact", section: "contact" },
];

export default function Footer() {
	const { t } = useTranslation('common');
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const isHome = pathname === "/";

	const handleNavClick = (e: React.MouseEvent, section: string) => {
		e.preventDefault();
		if (isHome) {
			const element = document.getElementById(section);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			navigate(`/#${section}`);
		}
	};

	return (
		<footer className="relative w-full bg-lime dark:bg-dark-surface text-violet-dark dark:text-beige pt-8 pb-40 px-6 md:px-10 text-center grain grain-citron">
			<h2 className="text-2xl font-display font-extrabold mb-6 flex flex-wrap justify-center gap-x-2" style={{ fontVariationSettings: 'var(--fv-editorial)' }}>
				<LetterRippleEffect text="Josué " />
				<LetterRippleEffect text="Rocha" />
			</h2>
			<nav aria-label="Footer navigation" className="flex justify-center gap-5 sm:gap-8 mb-6 text-base font-bold uppercase tracking-wider">
				{FOOTER_NAV.map(({ key, section, href }) => (
					<a
						key={key}
						href={href || `/#${section}`}
						onClick={href ? undefined : (e) => handleNavClick(e, section)}
						className="transition-colors duration-300 hover:text-orange"
					>
						{t(`navigation.${key}`)}
					</a>
				))}
			</nav>
			<p className="font-display italic font-normal text-sm border-l-[2.5px] border-lime pl-4 text-violet-dark/80 dark:text-beige/70 mb-6">{t('footer.craftedWith')}</p>
			<div className="w-16 h-px bg-violet-dark/20 dark:bg-beige/20 mx-auto mb-6" />
			<div className="flex justify-center gap-4 mb-2 text-xs text-violet-dark dark:text-beige/70">
				<Link
					to="/mentions-legales"
					className="hover:text-orange transition-colors underline"
				>
					{t('footer.legalNotice')}
				</Link>
				<span>•</span>
				<Link
					to="/politique-confidentialite"
					className="hover:text-orange transition-colors underline"
				>
					{t('footer.privacy')}
				</Link>
			</div>
			<p className="text-xs text-violet-dark dark:text-beige/60">
				© {new Date().getFullYear()} Josué Rocha. {t('footer.allRights')}
			</p>
		</footer>
	);
}
