import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import FadeInUp from "@/components/common/animations/fade-in-up";
import BackgroundGradient from "@/components/layout/background-gradient";

export default function PrivacyPolicy() {
	const { t } = useTranslation(['legal', 'common']);
	
	const sections = t('privacy.sections', { returnObjects: true }) as Record<string, { title: string; content: string[] }>;

	return (
		<div className="min-h-screen text-violet dark:text-beige">
			<BackgroundGradient />
			<main className="relative z-10 max-w-5xl mx-auto px-6 py-20" role="main">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<FadeInUp delay={0.2}>
						<Link 
							to="/" 
							className="mb-8 px-4 py-2 rounded-full bg-orange/10 text-orange-dark dark:text-orange border border-orange/20
							hover:bg-orange hover:text-beige dark:hover:bg-orange/20 dark:hover:text-orange
							transition-all duration-300
							inline-flex items-center gap-2 font-medium text-sm
							hover:shadow-glow-orange hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
							aria-label={t('common:buttons.backToHome')}
						>
							<FaArrowLeft className="inline-block" /> {t('common:buttons.backToHome')}
						</Link>
					</FadeInUp>

					<FadeInUp delay={0.4}>
						<h1 className="text-4xl md:text-5xl font-display font-extrabold mb-8 text-violet dark:text-beige">
							{t('privacy.title')}
						</h1>
					</FadeInUp>

					<div className="prose prose-lg max-w-none">
						<FadeInUp delay={0.6}>
							<section className="mb-8">
								<p>
									{t('privacy.intro')}
								</p>
							</section>
						</FadeInUp>

						{Object.entries(sections).map(([key, section], index) => (
							<FadeInUp key={key} delay={0.8 + index * 0.1}>
								<section className="mb-8">
									<h2 className="text-base md:text-lg font-sans font-bold uppercase tracking-widest text-orange-dark dark:text-orange mb-4">{section.title}</h2>
									<ul className="list-disc ml-6">
										{section.content.map((item: string, itemIndex: number) => (
											<li key={itemIndex} className="mb-2">{item}</li>
										))}
									</ul>
								</section>
							</FadeInUp>
						))}
					</div>
				</motion.div>
			</main>
		</div>
	);
}