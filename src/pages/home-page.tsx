// src/pages/HomePage.tsx
import type React from "react";
import { lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGradient from "../components/layout/background-gradient";
import Navbar from "../components/layout/navbar";
import Hero from "../components/sections/hero";
import Footer from "../components/layout/footer";
import ScrollToTop from "../components/common/scroll-to-top";
import ScrollBlur from "../components/common/bottom-blur";

// Conditional lazy loading - production only for LCP optimization
const Projects = lazy(() => import("../components/sections/projects"));
const Bio = lazy(() => import("../components/sections/bio"));
const Contact = lazy(() => import("../components/sections/contact"));

const HomePage: React.FC = () => {
	// Curtain disabled for LCP optimization
	const showCurtain = false;

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
					<Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="text-violet">Loading...</div></div>}>
						<Projects />
						<Bio />
						<Contact />
					</Suspense>
				</main>
				<ScrollToTop />
				<ScrollBlur />
				<Footer />
			</div>
		</div>
	);
};

export default HomePage;