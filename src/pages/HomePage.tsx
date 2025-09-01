// src/pages/HomePage.tsx
import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGradient from "../components/layout/background-gradient";
import Navbar from "../components/layout/navbar";
import Hero from "../components/sections/hero";
import Projects from "../components/sections/projects";
import Bio from "../components/sections/bio";
import Contact from "../components/sections/contact";
import Footer from "../components/layout/footer";
import ScrollToTop from "../components/common/scroll-to-top";
import ScrollBlur from "../components/common/bottom-blur";

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