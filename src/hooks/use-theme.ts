import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "light";

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "dark" || stored === "light") return stored;

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function applyTheme(theme: Theme) {
	const root = document.documentElement;
	if (theme === "dark") {
		root.classList.add("dark");
	} else {
		root.classList.remove("dark");
	}
	// Update meta theme-color for mobile browsers
	const meta = document.querySelector('meta[name="theme-color"]');
	if (meta) {
		meta.setAttribute("content", theme === "dark" ? "#0F0A1A" : "#6900FF");
	}
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		applyTheme(theme);
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	// Listen for OS preference changes (only when no explicit choice stored)
	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem(STORAGE_KEY)) {
				setTheme(e.matches ? "dark" : "light");
			}
		};
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	}, []);

	return { theme, toggleTheme } as const;
}
