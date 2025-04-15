import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, zoomIn } from "../utils/motion_variants";

export default function Contact() {
	return (
		<section
			id="contact"
			className="py-20 px-6 md:px-20 bg-beige dark:bg-darkgray text-center"
		>
			<motion.h2
				className="text-3xl font-bold text-violet mb-6"
				variants={fadeInUp}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.5 }}
			>
				Let's connect!
			</motion.h2>

			<motion.p
				className="text-lg mb-8"
				variants={fadeIn}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.5 }}
			>
				I'm happy to exchange ideas, collaborate on projects, or discuss
				opportunities. You can write to me directly or find me on social media:
			</motion.p>

			<motion.div
				className="flex justify-center gap-8 text-3xl"
				variants={zoomIn}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.5 }}
			>
				<a
					href="mailto:josue@email.com"
					aria-label="Email"
					className="hover:text-orange transition-colors duration-300"
				>
					<FaEnvelope />
				</a>
				<a
					href="https://github.com/josuexrocha"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					className="hover:text-orange transition-colors duration-300"
				>
					<FaGithub />
				</a>
				<a
					href="https://www.linkedin.com/in/josuexrocha/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					className="hover:text-orange transition-colors duration-300"
				>
					<FaLinkedin />
				</a>
			</motion.div>
		</section>
	);
}
