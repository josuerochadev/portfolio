import { useTranslation } from "react-i18next";
import FadeInUpOnScroll from "@/components/common/animations/fade-in-up-on-scroll";
import LetterRippleEffect from "@/components/effects/letter-ripple";

interface SkillCategory {
	label: string;
	color: string;
	skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
	{
		label: "mainframe",
		color: "bg-violet text-beige dark:bg-violet/60 dark:text-beige",
		skills: ["COBOL", "JCL", "z/OS", "TSO/ISPF", "DB2/SQL", "CICS", "VSAM"],
	},
	{
		label: "frontend",
		color: "bg-lime text-violet-dark dark:bg-lime/20 dark:text-lime",
		skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"],
	},
	{
		label: "backend",
		color: "bg-orange text-violet-dark dark:bg-orange/20 dark:text-orange",
		skills: ["Node.js", "Express", "PostgreSQL", "Sequelize", "Prisma", "FastAPI"],
	},
	{
		label: "tools",
		color: "bg-violet/20 text-violet dark:bg-violet/30 dark:text-beige",
		skills: ["Git", "Docker", "Vitest", "Playwright", "Jest", "CI/CD", "Swagger"],
	},
	{
		label: "ai",
		color: "bg-violet/20 text-violet dark:bg-violet/30 dark:text-beige",
		skills: ["Python", "OpenAI API", "RAG", "LangChain", "Langfuse"],
	},
	{
		label: "languages",
		color: "bg-violet/20 text-violet dark:bg-violet/30 dark:text-beige",
		skills: [],
	},
];

export default function Skills() {
	const { t } = useTranslation("skills");

	const categories = SKILL_CATEGORIES.map((cat) => ({
		...cat,
		label: t(`categories.${cat.label}`),
		skills: cat.label === "languages"
			? (Object.values(t("languagesList", { returnObjects: true })) as string[])
			: cat.skills,
	}));

	return (
		<section
			id="skills"
			className="relative z-10 w-full px-6 py-20 overflow-hidden"
		>
			<div className="max-w-6xl mx-auto">
				<FadeInUpOnScroll delay={0.2}>
					<h2 className="w-full px-4 text-[clamp(2rem,7vw,6rem)] leading-[1.1] font-display font-extrabold text-violet dark:text-beige text-left flex flex-wrap gap-x-2">
						{t("heading").split(" ").map((word) => (
							<LetterRippleEffect key={word} text={`${word} `} />
						))}
					</h2>
				</FadeInUpOnScroll>

				<div className="w-full px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{categories.map((cat, i) => (
						<FadeInUpOnScroll key={cat.label} delay={0.4 + i * 0.1}>
							<div className="flex flex-col gap-3">
								<h3 className="text-lg font-bold text-violet dark:text-beige uppercase tracking-wider">
									{cat.label}
								</h3>
								<div className="flex flex-wrap gap-2">
									{cat.skills.map((skill) => (
										<span
											key={skill}
											className={`px-3 py-1.5 text-sm font-medium rounded-full ${cat.color}`}
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						</FadeInUpOnScroll>
					))}
				</div>
			</div>
		</section>
	);
}
