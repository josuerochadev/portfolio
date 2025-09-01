import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeInUp from "@/components/common/animations/fade-in-up";
import BackgroundGradient from "@/components/layout/background-gradient";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-6 text-violet">
			<BackgroundGradient />
			<motion.div 
				className="relative z-10 text-center max-w-2xl mx-auto"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<FadeInUp delay={0.2}>
					<h1 className="text-[clamp(4rem,8vw,8rem)] font-display font-extrabold text-orange leading-none mb-4">
						404
					</h1>
				</FadeInUp>
				
				<FadeInUp delay={0.4}>
					<h2 className="text-2xl md:text-3xl font-bold mb-6">
						Page introuvable
					</h2>
				</FadeInUp>
				
				<FadeInUp delay={0.6}>
					<p className="text-lg mb-8 text-violet/80">
						Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
					</p>
				</FadeInUp>
				
				<FadeInUp delay={0.8}>
					<Link 
						to="/" 
						className="button"
					>
						Retour à l'accueil
					</Link>
				</FadeInUp>
			</motion.div>
		</div>
	);
}