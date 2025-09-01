import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeInUp from "@/components/common/animations/fade-in-up";
import BackgroundGradient from "@/components/layout/background-gradient";

export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen text-violet">
			<BackgroundGradient />
			<div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<FadeInUp delay={0.2}>
						<Link to="/" className="inline-flex items-center text-orange hover:text-violet mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 rounded px-2 py-1">
							← Retour à l'accueil
						</Link>
					</FadeInUp>

					<FadeInUp delay={0.4}>
						<h1 className="text-4xl md:text-5xl font-display font-extrabold mb-8">
							Politique de Confidentialité
						</h1>
					</FadeInUp>

					<div className="prose prose-lg max-w-none">
						<FadeInUp delay={0.6}>
							<section className="mb-8">
								<p className="text-sm text-violet/70 mb-4">
									Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
								</p>
								<p>
									Cette politique de confidentialité explique comment vos informations 
									sont collectées, utilisées et protégées lorsque vous visitez ce site web.
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={0.7}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Collecte des données</h2>
								<h3 className="text-xl font-semibold mb-2">Données collectées automatiquement</h3>
								<p>Lors de votre visite, les données suivantes sont collectées automatiquement :</p>
								<ul className="list-disc ml-6 mb-4">
									<li>Adresse IP</li>
									<li>Type de navigateur et version</li>
									<li>Système d'exploitation</li>
									<li>Pages visitées et temps de visite</li>
									<li>Référent (site d'où vous venez)</li>
								</ul>
								
							</section>
						</FadeInUp>

						<FadeInUp delay={0.8}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Utilisation des données</h2>
								<p>Vos données sont utilisées pour :</p>
								<ul className="list-disc ml-6">
									<li>Améliorer l'expérience utilisateur du site</li>
									<li>Analyser le trafic et les performances du site</li>
									<li>Respecter les obligations légales</li>
								</ul>
							</section>
						</FadeInUp>

						<FadeInUp delay={0.9}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Cookies et technologies similaires</h2>
								<p>
									Ce site peut utiliser des cookies pour améliorer votre expérience. 
									Les cookies sont de petits fichiers stockés sur votre appareil qui nous 
									permettent de mémoriser vos préférences.
								</p>
								<p className="mt-2">
									Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, 
									mais cela peut affecter certaines fonctionnalités du site.
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={1.0}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Partage des données</h2>
								<p>
									Vos informations personnelles ne sont ni vendues, ni échangées, ni louées 
									à des tiers. Vos données peuvent être partagées uniquement dans les cas suivants :
								</p>
								<ul className="list-disc ml-6">
									<li>Avec votre consentement explicite</li>
									<li>Pour se conformer à une obligation légale</li>
									<li>Pour protéger les droits et la sécurité du site</li>
								</ul>
							</section>
						</FadeInUp>

						<FadeInUp delay={1.1}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Vos droits (RGPD)</h2>
								<p>Conformément au RGPD, vous disposez des droits suivants :</p>
								<ul className="list-disc ml-6">
									<li><strong>Droit d'accès :</strong> connaître les données détenues sur vous</li>
									<li><strong>Droit de rectification :</strong> corriger les données inexactes</li>
									<li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
									<li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format lisible</li>
									<li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
								</ul>
							</section>
						</FadeInUp>

						<FadeInUp delay={1.2}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Sécurité des données</h2>
								<p>
									Des mesures de sécurité appropriées sont mises en œuvre pour protéger 
									vos informations personnelles contre l'accès non autorisé, l'altération, 
									la divulgation ou la destruction.
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={1.3}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Conservation des données</h2>
								<p>
									Vos données personnelles sont conservées uniquement le temps nécessaire 
									aux finalités pour lesquelles elles sont traitées, conformément à la 
									législation en vigueur.
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={1.4}>
							<section>
								<h2 className="text-2xl font-bold mb-4">Contact</h2>
								<p>
									Pour toute question concernant cette politique de confidentialité ou 
									pour exercer vos droits, vous pouvez me contacter aux coordonnées 
									mentionnées dans les mentions légales.
								</p>
							</section>
						</FadeInUp>
					</div>
				</motion.div>
			</div>
		</div>
	);
}