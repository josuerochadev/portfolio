import type React from "react";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import FadeInUp from "@/components/common/animations/fade-in-up";

const ACTION_LINKS = [
	{
		href: "/Josue_Rocha_CV_Dev2025.pdf",
		icon: <FaFileAlt className="inline-block mr-2" />,
		label: "RESUME",
		delay: 0.6,
	},
	{
		href: "https://github.com/josuerochadev",
		icon: <FaGithub className="inline-block mr-2" />,
		label: "GITHUB",
		delay: 0.65,
	},
	{
		href: "https://www.linkedin.com/in/josuerochadev/",
		icon: <FaLinkedin className="inline-block mr-2" />,
		label: "LINKEDIN",
		delay: 0.7,
	},
];

const HeroActionButtons: React.FC = () => {
	return (
		<div className="flex gap-4 flex-wrap justify-center pt-2">
			{ACTION_LINKS.map(({ href, icon, label, delay }) => (
				<FadeInUp key={label} delay={delay}>
					<a
						href={href}
						target={href.startsWith("http") ? "_blank" : undefined}
						rel="noopener noreferrer"
						className="button"
						aria-label={`Link to ${label.toLowerCase()}`}
					>
						{icon} {label}
					</a>
				</FadeInUp>
			))}
		</div>
	);
};

export default HeroActionButtons;