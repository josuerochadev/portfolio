import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import "./index.css";
import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
	duration: 0.7,
	easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
});

function raf(time: number) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("No element with id 'root' found.");
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
			<Analytics />
		</BrowserRouter>
	</React.StrictMode>
);