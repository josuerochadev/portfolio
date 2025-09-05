import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FadeInUp from "@/components/common/animations/fade-in-up";
import BackgroundGradient from "@/components/layout/background-gradient";

export default function PrivacyPolicy() {
	const { t } = useTranslation(['legal', 'common']);
	
	const sections = t('privacy.sections', { returnObjects: true }) as Record<string, { title: string; content: string[] }>;

	return (
		<div className="min-h-screen text-violet-dark">
			<BackgroundGradient />
			<main className="relative z-10 max-w-4xl mx-auto px-6 py-20" role="main">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<FadeInUp delay={0.2}>
						<Link 
							to="/" 
							className="inline-flex items-center text-orange hover:text-violet mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 rounded px-2 py-1"
							aria-label={t('common:buttons.backToHome')}
						>
							{t('common:buttons.backToHome')}
						</Link>
					</FadeInUp>

					<FadeInUp delay={0.4}>
						<h1 className="text-4xl md:text-5xl font-display font-extrabold mb-8 text-violet">
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
									<h2 className="text-2xl font-bold mb-4">{section.title}</h2>
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