import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/page-layout";
import SequentialFadeIn from "@/components/common/animations/sequential-fade-in";
import FadeInUp from "@/components/common/animations/fade-in-up";
import LegalSection from "@/components/common/legal-section";
import { COLORS, TRANSITIONS } from "@/constants";

export default function PrivacyPolicy() {
	const headerContent = [
		<Link 
			key="back-link"
			to="/" 
			className={`inline-flex items-center ${COLORS.ORANGE.TEXT} ${COLORS.VIOLET.HOVER_TEXT} mb-8 ${TRANSITIONS.COLORS} focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 rounded px-2 py-1`}
			aria-label="Retour à la page d'accueil"
		>
			← Retour à l'accueil
		</Link>,
		<h1 key="page-title" className={`text-4xl md:text-5xl font-display font-extrabold mb-8 ${COLORS.VIOLET.TEXT}`}>
			Politique de Confidentialité
		</h1>
	];

	return (
		<PageLayout className={COLORS.VARIANTS.VIOLET_DARK}>
			<SequentialFadeIn>
				{headerContent}
			</SequentialFadeIn>

			<div className="prose prose-lg max-w-none">
				<SequentialFadeIn startDelay={0.6} increment={0.1}>
					{[
						<section key="intro" className="mb-8">
							<p className={`text-sm ${COLORS.VARIANTS.VIOLET_70} mb-4`}>
								Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
							</p>
							<p>
								Cette politique de confidentialité explique comment vos informations 
								sont collectées, utilisées et protégées lorsque vous visitez ce site web.
							</p>
						</section>,

						<LegalSection key="data-collection" title="Collecte des données">
							<h3 className="text-xl font-semibold mb-2">Données collectées automatiquement</h3>
							<p>Lors de votre visite, les données suivantes sont collectées automatiquement :</p>
							<ul className="list-disc ml-6 mb-4">
								<li>Adresse IP</li>
								<li>Type de navigateur et version</li>
								<li>Système d'exploitation</li>
								<li>Pages visitées et temps de visite</li>
								<li>Référent (site d'où vous venez)</li>
							</ul>
						</LegalSection>,

						<LegalSection key="data-usage" title="Utilisation des données">
							<p>Vos données sont utilisées pour :</p>
							<ul className="list-disc ml-6">
								<li>Améliorer l'expérience utilisateur du site</li>
								<li>Analyser le trafic et les performances du site</li>
								<li>Respecter les obligations légales</li>
							</ul>
						</LegalSection>,

						<LegalSection key="cookies" title="Cookies et technologies similaires">
							<p>
								Ce site peut utiliser des cookies pour améliorer votre expérience. 
								Les cookies sont de petits fichiers stockés sur votre appareil qui nous 
								permettent de mémoriser vos préférences.
							</p>
							<p className="mt-2">
								Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, 
								mais cela peut affecter certaines fonctionnalités du site.
							</p>
						</LegalSection>,

						<LegalSection key="data-sharing" title="Partage des données">
							<p>
								Vos informations personnelles ne sont ni vendues, ni échangées, ni louées 
								à des tiers. Vos données peuvent être partagées uniquement dans les cas suivants :
							</p>
							<ul className="list-disc ml-6">
								<li>Avec votre consentement explicite</li>
								<li>Pour se conformer à une obligation légale</li>
								<li>Pour protéger les droits et la sécurité du site</li>
							</ul>
						</LegalSection>,

						<LegalSection key="gdpr-rights" title="Vos droits (RGPD)">
							<p>Conformément au RGPD, vous disposez des droits suivants :</p>
							<ul className="list-disc ml-6">
								<li><strong>Droit d'accès :</strong> connaître les données détenues sur vous</li>
								<li><strong>Droit de rectification :</strong> corriger les données inexactes</li>
								<li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
								<li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format lisible</li>
								<li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
							</ul>
						</LegalSection>,

						<LegalSection key="data-security" title="Sécurité des données">
							<p>
								Des mesures de sécurité appropriées sont mises en œuvre pour protéger 
								vos informations personnelles contre l'accès non autorisé, l'altération, 
								la divulgation ou la destruction.
							</p>
						</LegalSection>,

						<LegalSection key="data-retention" title="Conservation des données">
							<p>
								Vos données personnelles sont conservées uniquement le temps nécessaire 
								aux finalités pour lesquelles elles sont traitées, conformément à la 
								législation en vigueur.
							</p>
						</LegalSection>,

						<LegalSection key="contact" title="Contact">
							<p>
								Pour toute question concernant cette politique de confidentialité ou 
								pour exercer vos droits, vous pouvez me contacter aux coordonnées 
								mentionnées dans les mentions légales.
							</p>
						</LegalSection>
					]}
				</SequentialFadeIn>
			</div>
		</PageLayout>
	);
}