import { useEffect, useState } from "react";
import SmileIcon from "@/assets/images/ui/smile.svg?react";

export default function ScrollToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 300);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			type="button"
			onClick={scrollToTop}
			aria-label="Back to top"
			className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-2 
        px-4 py-2 sm:px-6 sm:py-3
        rounded-full border-2 border-violet text-violet font-bold bg-beige
        transition-all duration-300 ease-in-out
        hover:bg-lime hover:text-orange
        focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-orange
        active:scale-95
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
		>
			<SmileIcon className="w-6 h-6 sm:w-10 sm:h-10" />
			<span className="text-sm sm:text-lg font-bold">BACK TO TOP</span>
		</button>
	);
}
