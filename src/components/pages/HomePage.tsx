// src/components/pages/HomePage.tsx
import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGradient from "../layout/background_gradient";
import Navbar from "../layout/navbar";
import Hero from "../sections/hero";
import Projects from "../sections/projects";
import Bio from "../sections/bio";
import Contact from "../sections/contact";
import Footer from "../layout/footer";
import ScrollToTop from "../common/scroll_to_top";
import ScrollBlur from "../common/bottom_blur";

const HomePage: React.FC = () => {
	const [showCurtain, setShowCurtain] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setShowCurtain(false), 400);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="min-h-screen">
			<BackgroundGradient />
			<AnimatePresence>
				{showCurtain && (
					<motion.div
						className="fixed inset-0 z-[999] bg-lime"
						style={{ willChange: "transform" }}
						initial={{ y: 0 }}
						animate={{ y: "-100%" }}
						exit={{ y: "-100%" }}
						transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
					/>
				)}
			</AnimatePresence>

			<div className="relative z-100 min-h-screen font-body">
				<header>
					<Navbar />
				</header>
				<main>
					<Hero />
					<section id="projects">
						<Projects />
					</section>
					<section id="bio">
						<Bio />
					</section>
					<section id="contact">
						<Contact />
					</section>
				</main>
				<ScrollToTop />
				<ScrollBlur />
				<Footer />
			</div>
		</div>
	);
};

export default HomePage;