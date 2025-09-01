import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeInUp from "@/components/common/animations/fade-in-up";
import BackgroundGradient from "@/components/layout/background-gradient";

export default function LegalNotice() {
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
							Mentions Légales
						</h1>
					</FadeInUp>

					<div className="prose prose-lg max-w-none">
						<FadeInUp delay={0.6}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Éditeur du site</h2>
								<p>
									<strong>Josué Xavier Rocha</strong><br />
									Entrepreneur individuel (EI)<br />
									Développeur Web Full Stack<br />
									<br />
									<strong>Contact :</strong><br />
									Email : josuexr@icloud.com<br />
									Téléphone : + 33 7 81 40 36 80<br />
									Adresse : 3 rue d'Erstein 67100 STRASBOURG France<br />
									<br />
									<em>SIRET : 94066040000018</em>
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={0.7}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Hébergement</h2>
								<p>
									Ce site est hébergé par :<br />
									<strong>Vercel Inc.</strong><br />
									340 S Lemon Ave #4133<br />
									Walnut, CA 91789<br />
									États-Unis<br />
									<a href="https://vercel.com" className="text-orange hover:underline" target="_blank" rel="noopener noreferrer">
										https://vercel.com
									</a>
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={0.8}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Propriété intellectuelle</h2>
								<p>
									L'ensemble de ce site relève de la législation française et internationale 
									sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
									reproduction sont réservés, y compris pour les documents téléchargeables 
									et les représentations iconographiques et photographiques.
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={0.9}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Responsabilité</h2>
								<p>
									Les informations contenues sur ce site sont aussi précises que possible 
									et le site est périodiquement remis à jour, mais peut toutefois contenir 
									des inexactitudes, des omissions ou des lacunes. Si vous constatez une 
									lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien 
									vouloir le signaler par email.
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={1.0}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Liens hypertextes</h2>
								<p>
									Les liens hypertextes mis en place dans le cadre du présent site web 
									en direction d'autres ressources présentes sur le réseau Internet ne 
									sauraient engager la responsabilité de Josué Xavier Rocha.
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={1.1}>
							<section className="mb-8">
								<h2 className="text-2xl font-bold mb-4">Cookies et données personnelles</h2>
								<p>
									Ce site peut utiliser des cookies pour améliorer votre expérience utilisateur. 
									Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de 
									suppression de vos données personnelles. Pour plus d'informations, consultez 
									la <Link to="/politique-confidentialite" className="text-orange hover:underline">
									politique de confidentialité</Link>.
								</p>
							</section>
						</FadeInUp>

						<FadeInUp delay={1.2}>
							<section>
								<h2 className="text-2xl font-bold mb-4">Contact</h2>
								<p>
									Pour toute question concernant ces mentions légales, vous pouvez me contacter 
									aux coordonnées mentionnées dans la section "Éditeur du site".
								</p>
							</section>
						</FadeInUp>
					</div>
				</motion.div>
			</div>
		</div>
	);
}