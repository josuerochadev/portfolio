import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LetterRippleEffect from "@/components/effects/letter-ripple";

const FOOTER_NAV = [
	{ key: "work", href: "#projects" },
	{ key: "about", href: "#bio" },
	{ key: "contact", href: "#contact" },
	{ key: "blog", href: "#" },
];

export default function Footer() {
	const { t } = useTranslation('common');
	return (
		<footer className="relative w-full bg-lime text-violet-dark pt-8 pb-40 px-6 md:px-10 text-center">
			<h2 className="text-2xl font-display font-extrabold mb-6 flex flex-wrap justify-center gap-x-2" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0' }}>
				<LetterRippleEffect text="Josué " />
				<LetterRippleEffect text="Rocha" />
			</h2>
			<nav aria-label="Footer navigation" className="flex justify-center gap-5 sm:gap-8 mb-6 text-base font-bold uppercase tracking-wider">
				{FOOTER_NAV.map(({ key, href }) => (
					<a
						key={key}
						href={href}
						className="transition-colors duration-300 hover:text-orange"
					>
						{t(`navigation.${key}`)}
					</a>
				))}
			</nav>
			<p className="text-sm italic text-violet-dark mb-6">{t('footer.craftedWith')}</p>
			<div className="w-16 h-px bg-violet-dark/20 mx-auto mb-6" />
			<div className="flex justify-center gap-4 mb-2 text-xs text-violet-dark">
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
			<p className="text-xs text-violet-dark">
				© {new Date().getFullYear()} Josué Rocha. {t('footer.allRights')}
			</p>
		</footer>
	);
}
