import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import FadeInUp from "@/components/common/animations/fade-in-up";
import BackgroundGradient from "@/components/layout/background-gradient";

export default function LegalNotice() {
	const { t } = useTranslation(['legal', 'common']);
	
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
							className="mb-8 px-4 py-2 rounded-full bg-orange/10 text-orange border border-orange/20 
							hover:bg-orange hover:text-beige transition-all duration-300 
							inline-flex items-center gap-2 font-medium text-sm
							hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
							aria-label={t('common:buttons.backToHome')}
						>
							<FaArrowLeft className="inline-block" /> {t('common:buttons.backToHome')}
						</Link>
					</FadeInUp>

					<FadeInUp delay={0.4}>
						<h1 className="text-4xl md:text-5xl font-display font-extrabold mb-8 text-violet">
							{t('legalNotice.title')}
						</h1>
					</FadeInUp>

					<div className="prose prose-lg max-w-none">
						<FadeInUp delay={0.6}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">{t('legalNotice.publisher.title')}</h2>
								<p>
									<strong>{t('legalNotice.publisher.name')}</strong><br />
									{t('legalNotice.publisher.status')}<br />
									<br />
									Email : {t('legalNotice.publisher.email')}<br />
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={0.7}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">{t('legalNotice.hosting.title')}</h2>
								<p>
									<strong>{t('legalNotice.hosting.provider')}</strong><br />
									{t('legalNotice.hosting.address')}<br />
									<a href={t('legalNotice.hosting.website')} className="text-orange hover:underline" target="_blank" rel="noopener noreferrer">
										{t('legalNotice.hosting.website')}
									</a>
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={0.8}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">{t('legalNotice.intellectual.title')}</h2>
								<ul className="list-disc ml-6">
									{t('legalNotice.intellectual.content', { returnObjects: true }).map((item: string, index: number) => (
										<li key={index} className="mb-2">{item}</li>
									))}
								</ul>
							</section>
						</FadeInUp>

						<FadeInUp delay={0.9}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">{t('legalNotice.liability.title')}</h2>
								<ul className="list-disc ml-6">
									{t('legalNotice.liability.content', { returnObjects: true }).map((item: string, index: number) => (
										<li key={index} className="mb-2">{item}</li>
									))}
								</ul>
							</section>
						</FadeInUp>
					</div>
				</motion.div>
			</main>
		</div>
	);
}