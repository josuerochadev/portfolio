import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { PROJECTS } from "@/data/projects";

import FadeInUpOnScroll from "@/components/common/animations/fade_in_up_on_scroll";
import LetterRippleEffect from "@/components/effects/letter_ripple";
import SunIcon from "@/assets/images/ui/sun.svg?react";
import ModalNotice from "@/components/common/modal_notice";

export default function Projects() {
	const sectionRef = useRef(null);
	const triggerRef = useRef(null);

	const { scrollYProgress } = useScroll({ target: sectionRef });
	const rotation = useTransform(scrollYProgress, [0, 1], [0, 90]);

	const isInView = useInView(triggerRef, {
		once: true,
		margin: "-40% 0px -50%",
	});
	const [modalShown, setModalShown] = useState(false);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (isInView && !modalShown) {
			setShowModal(true);
			setModalShown(true); // ne se réaffichera plus
		}
	}, [isInView, modalShown]);

	const handleClose = () => setShowModal(false);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="relative w-full px-6 py-20 text-violet overflow-hidden"
		>
			<ModalNotice show={showModal} onClose={handleClose} />

			<motion.div
				className="absolute top-[100px] right-[-200px] w-[1600px] h-[1600px] z-0 pointer-events-none"
				style={{ rotate: rotation }}
			>
				<SunIcon className="w-full h-full" />
			</motion.div>

			<div className="max-w-6xl mx-auto flex flex-col gap-20 relative z-10">
				<FadeInUpOnScroll delay={0.2}>
					<h2 className="relative max-w-6xl mx-auto px-4 text-[clamp(2rem,7vw,7rem)] leading-[1.1] font-display font-extrabold text-violet text-center flex flex-wrap justify-left gap-x-2">
						{"Here’s a glimpse into my work — a taste of what I can bring"
							.split(" ")
							.map((word, i) => (
								<LetterRippleEffect
									key={`${word}-${i}-${Math.random()}`}
									text={`${word} `}
								/>
							))}
					</h2>
				</FadeInUpOnScroll>

				{/* Déclencheur après la phrase */}
				<div ref={triggerRef} className="w-full h-[1px]" />

				<div className="flex flex-col gap-20">
					{PROJECTS.map((project, index) => (
						<FadeInUpOnScroll key={project.title} delay={0.3 + index * 0.15}>
							<article
								className="w-full flex flex-col lg:flex-row gap-6 items-start
								bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
								backdrop-blur-md border border-lime/30 rounded-2xl shadow-md p-6
								hover:shadow-lg hover:scale-[1.01]
								will-change-transform transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]"
							>
								<div className="w-full lg:w-1/2 aspect-[4/3]">
									<img
										loading="lazy"
										src={project.image}
										alt={`Preview of ${project.title}`}
										className="w-full h-full object-cover rounded-xl shadow-sm"
									/>
								</div>
								<div className="w-full lg:w-1/2 flex flex-col gap-2">
									<div className="flex items-end gap-4 mb-2">
										<span className="text-6xl font-display font-extralight text-orange leading-none">
											{index + 1}.
										</span>
										<h3 className="text-3xl font-extrabold font-display leading-snug">
											{project.title}
										</h3>
									</div>
									<p className="text-lg leading-snug">{project.description}</p>
									<p className="text-xl font-bold mt-2">Deliverables</p>
									<p className="text-base mb-1">{project.deliverables}</p>
									<p className="text-xl font-bold">Context</p>
									<p className="text-base">{project.context}</p>
									<a
										href="/projects/details"
										className="button mt-4 inline-flex justify-center items-center gap-2 self-start"
										aria-label={`See more details about ${project.title}`}
									>
										<FaEye className="inline-block" /> MORE DETAILS
									</a>
								</div>
							</article>
						</FadeInUpOnScroll>
					))}
				</div>
			</div>
		</section>
	);
}
