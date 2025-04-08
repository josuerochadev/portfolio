import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
	duration: 1.2,
	easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)), // easeOutExpo
});

function raf(time: number) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}
