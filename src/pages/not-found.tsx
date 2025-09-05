import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SequentialFadeIn from "@/components/common/animations/sequential-fade-in";
import BackgroundGradient from "@/components/layout/background-gradient";
import { COLORS } from "@/constants";

export default function NotFound() {
	const { t } = useTranslation('common');
	
	const content = [
		<h1 className={`text-[clamp(4rem,8vw,8rem)] font-display font-extrabold ${COLORS.ORANGE.TEXT} leading-none mb-4`}>
			404
		</h1>,
		<h2 className="text-2xl md:text-3xl font-bold mb-6">
			{t('errors.pageNotFound')}
		</h2>,
		<p className={`text-lg mb-8 ${COLORS.VARIANTS.VIOLET_80}`}>
			{t('errors.pageNotFoundDesc')}
		</p>,
		<Link to="/" className="button">
			{t('buttons.backToHome')}
		</Link>
	];

	return (
		<div className={`min-h-screen flex flex-col items-center justify-center px-6 ${COLORS.VIOLET.TEXT}`}>
			<BackgroundGradient />
			<div className="relative z-10 text-center max-w-2xl mx-auto">
				<SequentialFadeIn>
					{content}
				</SequentialFadeIn>
			</div>
		</div>
	);
}