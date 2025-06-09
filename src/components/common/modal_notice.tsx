import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalNoticeProps {
	show: boolean;
	onClose: () => void;
}

export default function ModalNotice({ show, onClose }: ModalNoticeProps) {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [onClose]);

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-beige/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
				>
					<motion.div
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -50, opacity: 0 }}
						className="w-full max-w-md mx-4 p-6 text-violet text-center
						bg-gradient-to-br from-lime/20 via-orange/10 to-violet/5
						backdrop-blur-md border border-lime/30 rounded-2xl shadow-md
						transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)]"
					>
						<h3 className="text-3xl font-display font-extrabold mb-4">
							Oops!
						</h3>

						<p className="text-base font-bold leading-relaxed mb-6 text-left">
							These projects are still baking in the oven... 🍞<br />
							Check back soon — I’m polishing pixels and squashing bugs 🐛✨
						</p>

						<button
							type="button"
							onClick={onClose}
							className="button"
						>
							GOT IT!
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
