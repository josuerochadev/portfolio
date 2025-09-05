import type React from "react";
import { useState, useEffect } from "react";
import SmileGrid from "@/components/effects/smile-grid";
import HeroTitle from "./hero/hero-title";
import HeroPhrases from "./hero/hero-phrases";
import HeroActionButtons from "./hero/hero-action-buttons";

const Hero: React.FC = () => {
	const [showSmiles, setShowSmiles] = useState(false);
	const [lightOn, setLightOn] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLightOn(true);
		}, 10);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<section
			id="hero"
			className="relative flex flex-col min-h-[calc(100vh-6rem)] px-6 pt-12 pb-10 text-violet overflow-hidden"
		>
			<SmileGrid active={showSmiles} />

			{/* LIGHT STRIP simplified for LCP */}
			<div
				className="absolute top-0 left-0 w-full h-12 bg-lime blur-2xl z-0 pointer-events-none"
				style={{ opacity: lightOn ? 0.6 : 0, transition: lightOn ? "opacity 1s ease-out" : "none" }}
			/>

			<HeroTitle />

			<div className="flex flex-col items-center justify-center gap-4 flex-1 min-h-[20vh] pb-32">
				<HeroPhrases showSmiles={showSmiles} setShowSmiles={setShowSmiles} />
				<HeroActionButtons />
			</div>
		</section>
	);
};

export default Hero;
