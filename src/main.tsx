import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Lenis from "@studio-freight/lenis";

// Initialisation du smooth scroll Lenis
const lenis = new Lenis({
	duration: 0.7,
	easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
});

function raf(time: number) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Point d’entrée React
const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("No element with id 'root' found.");
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);