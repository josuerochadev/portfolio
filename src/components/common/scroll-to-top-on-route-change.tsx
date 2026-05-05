import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTopOnRouteChange() {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const scrollToHash = () => {
				const element = document.querySelector(hash);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
					return true;
				}
				return false;
			};

			// Try immediately, retry after render if element not found yet
			if (!scrollToHash()) {
				const timeout = setTimeout(scrollToHash, 300);
				return () => clearTimeout(timeout);
			}
		} else {
			window.scrollTo(0, 0);
		}
	}, [pathname, hash]);

	return null;
}
