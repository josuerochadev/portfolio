// src/App.tsx
import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGradient from "./components/layout/background_gradient";
import Navbar from "./components/layout/navbar";
import Hero from "./components/sections/hero";
import Projects from "./components/sections/projects";
import Bio from "./components/sections/bio";
import Contact from "./components/sections/contact";
import Footer from "./components/layout/footer";
import ScrollToTop from "./components/common/scroll_to_top";
import ScrollBlur from "./components/common/bottom_blur";

const App: React.FC = () => {
	const [showCurtain, setShowCurtain] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setShowCurtain(false), 400); // ou 350
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="min-h-screen">
			<BackgroundGradient />
			<AnimatePresence>
				{showCurtain && (
					<motion.div
						className="fixed inset-0 z-[999] bg-lime"
						initial={{ y: 0 }}
						animate={{ y: "-100%" }}
						exit={{ y: "-100%" }}
						transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
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

export default App;
