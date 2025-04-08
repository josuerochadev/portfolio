import type React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Projects from "./components/projects";

const App: React.FC = () => {
	return (
		<div className="text-darkgray transition-colors duration-300 font-body">
			<Navbar />
			<div className="pt-20" />
			<main>
				<Hero />

				<section id="projects">
					<Projects />
				</section>

				<section
					id="bio"
					className="min-h-screen flex items-center justify-center"
				>
					<h2 className="text-3xl font-display">Bio</h2>
				</section>

				<section
					id="contact"
					className="min-h-screen flex items-center justify-center"
				>
					<h2 className="text-3xl font-display">Contact</h2>
				</section>
			</main>
		</div>
	);
};

export default App;
