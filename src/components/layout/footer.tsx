import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="relative w-full bg-lime text-violet mt-8 pt-8 pb-40 px-6 md:px-10 text-center">
			{/* Social icons */}
			<div className="flex justify-center gap-6 mb-4 text-3xl">
				<a
					href="https://github.com/josuexrocha"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					className="transition-colors duration-300 hover:text-orange"
				>
					<FaGithub />
				</a>
				<a
					href="https://www.linkedin.com/in/josuexrocha/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					className="transition-colors duration-300 hover:text-orange"
				>
					<FaLinkedin />
				</a>
			</div>
            {/* Phrase */}
			<p className="text-sm italic mb-2">Crafted with love and TypeScript.</p>
            {/* Copyright */}
			<p className="text-xs font-medium">
				© {new Date().getFullYear()} Josué Rocha. All rights reserved.
			</p>
		</footer>
	);
}
