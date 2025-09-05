import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation('common');
	return (
		<footer className="relative w-full bg-lime text-violet-dark pt-8 pb-40 px-6 md:px-10 text-center">
			<div className="flex justify-center gap-6 mb-4 text-3xl">
				<a
					href="https://github.com/josuexrocha"
					target="_blank"
					rel="noopener noreferrer"
					aria-label={t('accessibility.linkToGithub')}
					className="transition-colors duration-300 hover:text-orange"
				>
					<FaGithub />
				</a>
				<a
					href="https://www.linkedin.com/in/josuexrocha/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label={t('accessibility.linkToLinkedin')}
					className="transition-colors duration-300 hover:text-orange"
				>
					<FaLinkedin />
				</a>
			</div>
			<div className="flex justify-center gap-4 mb-4 text-xs">
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
			<p className="text-sm italic mb-2">{t('footer.craftedWith')}</p>
			<p className="text-xs font-medium">
				© {new Date().getFullYear()} Josué Rocha. {t('footer.allRights')}
			</p>
		</footer>
	);
}
