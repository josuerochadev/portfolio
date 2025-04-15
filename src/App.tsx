import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Projects from "./components/projects";
import Bio from "./components/bio";
import Contact from "./components/contact";
import Footer from "./components/footer";
import ScrollToTop from "./components/scroll_to_top";
import ScrollBlur from "./components/bottom_blur";

const App: React.FC = () => {
	const [showCurtain, setShowCurtain] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setShowCurtain(false), 800);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="grainy-bg min-h-screen">
			<AnimatePresence>
				{showCurtain && (
					<motion.div
						className="fixed inset-0 z-[999] bg-lime"
						initial={{ y: 0 }}
						animate={{ y: "-100%" }}
						exit={{ y: "-100%" }}
						transition={{ duration: 0.6, ease: "easeInOut" }}
					/>
				)}
			</AnimatePresence>

			<div className="text-violet transition-colors duration-300 font-body">
				<Navbar />
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
