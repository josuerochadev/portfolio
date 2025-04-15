// src/components/projects.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LetterRippleEffect from "./letter_ripple_effect";
import { fadeInUpSpring } from "../utils/motion_variants";
import { FaEye } from "react-icons/fa";
import SunIcon from "../assets/images/sun.svg?react";

const projects = [
	{
		title: "Project 1",
		description: "A simple and intuitive task management web app.",
		deliverables: "Wireframes, front-end dev, documentation",
		context: "Personal side project to improve productivity.",
		image: "/src/assets/images/project1.jpg",
	},
	{
		title: "Project 2",
		description: "A fast and modern e-commerce website optimized for mobile.",
		deliverables: "UI design, responsive integration, testing",
		context: "Redesign of an existing online shop for a client.",
		image: "/src/assets/images/project2.jpg",
	},
	{
		title: "Project 3",
		description:
			"A social platform to share interests and connect with others.",
		deliverables: "Figma prototype, REST API, Node.js backend",
		context: "Team collaboration during a coding bootcamp.",
		image: "/src/assets/images/project3.jpg",
	},
];

export default function Projects() {
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({ target: sectionRef });
	const rotation = useTransform(scrollYProgress, [0, 1], [0, 90]);
	return (
		<section
			id="projects"
			ref={sectionRef}
			className="relative w-full bg-beige dark:bg-darkgray px-6 py-20 text-violet overflow-hidden"
		>
			{/* SUN ICON BACKGROUND */}
			<motion.div
				className="absolute top-[100px] right-[-200px] w-[1600px] h-[1600px] z-0 pointer-events-none"
				style={{ rotate: rotation }}
			>
				<SunIcon className="w-full h-full" />
			</motion.div>

			<div className="max-w-6xl mx-auto flex flex-col gap-20 relative z-10">
				{/* TITLE */}
				<motion.h2
					className="relative max-w-6xl mx-auto px-4 text-[clamp(2rem,7vw,7rem)] leading-[1.1] font-display font-extrabold text-violet text-center flex flex-wrap justify-left gap-x-2"
					variants={fadeInUpSpring}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true, amount: 0.7 }}
					transition={{ delay: 0.6 }}
				>
					<LetterRippleEffect text="Here’s " />
					<LetterRippleEffect text="a " />
					<LetterRippleEffect text="glimpse " />
					<LetterRippleEffect text="into " />
					<LetterRippleEffect text="my " />
					<LetterRippleEffect text="work " />
					<LetterRippleEffect text="— " />
					<LetterRippleEffect text="a " />
					<LetterRippleEffect text="taste " />
					<LetterRippleEffect text="of " />
					<LetterRippleEffect text="what " />
					<LetterRippleEffect text="I " />
					<LetterRippleEffect text="can " />
					<LetterRippleEffect text="bring" />
				</motion.h2>

				{/* PROJECTS */}
				<div className="flex flex-col gap-20">
					{projects.map((project, index) => (
						<motion.div
							key={project.title}
							className="flex flex-col lg:flex-row gap-6 items-start"
							initial="initial"
							whileInView="animate"
							viewport={{ once: true, amount: 0.6 }}
							variants={fadeInUpSpring}
							transition={{ delay: 0.6 + index * 0.3 }}
						>
							{/* Image */}
							<div className="w-full lg:w-1/2 aspect-[4/3]">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover rounded-xl shadow-md"
								/>
							</div>
							{/* Text */}
							<div className="w-full lg:w-1/2 flex flex-col gap-2">
								<p className="text-6xl font-display text-orange font-extralight">
									{index + 1}.
								</p>
								<h3 className="text-3xl font-extrabold font-display">
									{project.title}
								</h3>
								<p className="text-lg leading-snug">{project.description}</p>
								<p className="text-xl font-bold mt-2">Deliverables</p>
								<p className="text-base mb-1">{project.deliverables}</p>
								<p className="text-xl font-bold">Context</p>
								<p className="text-base">{project.context}</p>
								<a
									href="/projects/details"
									className="button mt-4 inline-flex justify-center items-center gap-2 self-start"
								>
									<FaEye className="inline-block" /> MORE DETAILS
								</a>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
