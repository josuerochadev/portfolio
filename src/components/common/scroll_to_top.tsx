// src/components/ScrollToTop.tsx
import { useEffect, useState } from "react";
import SmileIcon from "../../assets/images/ui/smile.svg?react";

export default function ScrollToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!visible) return null;

	return (
		<button
			type="button"
			onClick={scrollToTop}
			aria-label="Back to top"
			className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 rounded-full border-2 border-violet text-violet font-bold bg-beige transition-all duration-300 hover:bg-lime hover:text-orange focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-orange active:scale-95"
		>
			<SmileIcon className="w-10 h-10" />
			<span className="text-lg font-bold">BACK TO TOP</span>
		</button>
	);
}
