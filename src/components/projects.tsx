import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
	{
		title: "Project 1",
		description:
			"Une application web intuitive pour gérer vos tâches quotidiennes.",
		image: "/assets/project1.png",
	},
	{
		title: "Project 2",
		description:
			"Un site e-commerce moderne et rapide, optimisé pour le mobile.",
		image: "/assets/project2.png",
	},
	{
		title: "Project 3",
		description: "Une plateforme sociale pour partager vos centres d’intérêt.",
		image: "/assets/project3.png",
	},
];

export default function Projects() {
	const [current, setCurrent] = useState(0);

	const changeProject = useCallback((direction: number) => {
		setCurrent(
			(prev) => (prev + direction + projects.length) % projects.length,
		);
	}, []);

	const next = () => changeProject(1);
	const prev = () => changeProject(-1);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") changeProject(1);
			if (e.key === "ArrowLeft") changeProject(-1);
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [changeProject]);

	return (
		<section className="h-screen overflow-hidden bg-background">
			<div className="h-full max-w-container mx-auto px-4 md:px-8 py-8 flex flex-col items-center justify-center">
				<motion.h2
					className="font-display text-3xl md:text-4xl font-bold text-left text-violet mb-6 max-w-3xl"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "backInOut" }}
					viewport={{ once: true, amount: 0.3 }}
				>
					Here’s a glimpse into my work — a taste of what I can bring to your
					team
				</motion.h2>

				<div className="flex flex-col items-start text-left w-full max-w-xl gap-4">
					<AnimatePresence mode="wait">
						<motion.div
							key={projects[current].title}
							className="w-full flex flex-col gap-3 items-start"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<img
								src={projects[current].image}
								alt={projects[current].title}
								className="w-full h-[clamp(160px,30vh,240px)] object-cover rounded-xl"
							/>
							<h3 className="text-xl font-display font-extrabold text-violet">
								{projects[current].title}
							</h3>
							<p className="text-sm md:text-base text-violet max-w-prose">
								{projects[current].description}
							</p>
							<button
								type="button"
								className="button inline-flex justify-center self-start"
							>
								SEE MORE{" "}
							</button>
						</motion.div>
					</AnimatePresence>
				</div>

				<div className="flex items-center justify-center gap-4 mt-6">
					<button
						type="button"
						onClick={prev}
						className="flex items-center gap-1 text-violet font-semibold"
					>
						<span className="text-orange text-xl font-bold">&#x2190;</span>{" "}
						Previous
					</button>

					<div className="flex items-center gap-2">
						{projects.map((project) => (
							<div
								key={project.title}
								className={`w-5 h-5 rounded-full transition-all duration-300 ${
									project.title === projects[current].title
										? "bg-orange"
										: "bg-lime"
								}`}
							/>
						))}
					</div>

					<button
						type="button"
						onClick={next}
						className="flex items-center gap-1 text-violet font-semibold"
					>
						Next <span className="text-orange text-xl font-bold">&#x2192;</span>
					</button>
				</div>
			</div>
		</section>
	);
}
