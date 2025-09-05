import type React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FadeInUp from "@/components/common/animations/fade-in-up";
import { ANIMATION } from "@/constants";

const ACTION_LINKS = [
	{
		href: "https://github.com/josuerochadev",
		icon: <FaGithub className="inline-block mr-2" />,
		label: "GITHUB",
		delay: ANIMATION.DELAYS.LONG,
	},
	{
		href: "https://www.linkedin.com/in/josuerochadev/",
		icon: <FaLinkedin className="inline-block mr-2" />,
		label: "LINKEDIN",
		delay: ANIMATION.DELAYS.LONG + ANIMATION.DELAYS.VERY_SHORT,
	},
];

const HeroActionButtons: React.FC = () => {
	return (
		<div className="flex gap-4 flex-wrap justify-center pt-8">
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