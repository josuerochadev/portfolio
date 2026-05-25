import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import type { MediaItem } from "@/data/projects";

interface MediaLightboxProps {
	items: MediaItem[];
	captions: string[];
	currentIndex: number;
	onClose: () => void;
	onNavigate: (index: number) => void;
}

export default function MediaLightbox({ items, captions, currentIndex, onClose, onNavigate }: MediaLightboxProps) {
	const item = items[currentIndex];
	const caption = captions[currentIndex];
	const total = items.length;

	const goPrev = useCallback(() => {
		onNavigate(currentIndex > 0 ? currentIndex - 1 : total - 1);
	}, [currentIndex, total, onNavigate]);

	const goNext = useCallback(() => {
		onNavigate(currentIndex < total - 1 ? currentIndex + 1 : 0);
	}, [currentIndex, total, onNavigate]);

	// Keyboard navigation + scroll lock
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") goPrev();
			if (e.key === "ArrowRight") goNext();
		};
		document.addEventListener("keydown", handleKey);
		document.body.style.overflow = "hidden";
		document.body.setAttribute("data-lightbox-open", "true");
		return () => {
			document.removeEventListener("keydown", handleKey);
			document.body.style.overflow = "";
			document.body.removeAttribute("data-lightbox-open");
		};
	}, [onClose, goPrev, goNext]);

	const renderMedia = () => {
		if (item.type === "image") {
			return (
				<img
					src={item.src}
					alt={caption}
					className="max-w-5xl max-h-[85vh] w-auto h-auto object-contain rounded-lg"
				/>
			);
		}
		if (item.type === "video") {
			return (
				<video
					key={item.src}
					src={item.src}
					poster={item.poster}
					controls
					preload="metadata"
					className="max-w-5xl max-h-[85vh] w-auto h-auto object-contain rounded-lg"
				>
					<track kind="captions" />
				</video>
			);
		}
		if (item.type === "embed") {
			return (
				<iframe
					src={item.src}
					title={caption}
					className="w-full max-w-5xl border-0 rounded-lg"
					style={{ height: "80vh" }}
				/>
			);
		}
		return null;
	};

	return createPortal(
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
				onClick={onClose}
				role="dialog"
				aria-label="Media lightbox"
				aria-modal="true"
			>
				{/* Content — stop propagation so clicking media doesn't close */}
				<div
					className="relative flex flex-col items-center gap-4 px-4 sm:px-12"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close button */}
					<button
						onClick={onClose}
						className="absolute -top-12 right-4 sm:right-0 text-white/70 hover:text-white transition-colors"
						aria-label="Fermer"
					>
						<FaTimes size={24} />
					</button>

					{/* Media */}
					<motion.div
						key={item.src}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.2 }}
					>
						{renderMedia()}
					</motion.div>

					{/* Caption + counter */}
					<div className="text-center max-w-3xl">
						<p className="text-sm text-white/80">{caption}</p>
						<p className="text-xs text-white/40 mt-1">
							{currentIndex + 1} / {total}
						</p>
					</div>
				</div>

				{/* Navigation arrows — desktop only */}
				<button
					onClick={(e) => { e.stopPropagation(); goPrev(); }}
					className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center
						rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
					aria-label="Image précédente"
				>
					<FaChevronLeft size={20} />
				</button>
				<button
					onClick={(e) => { e.stopPropagation(); goNext(); }}
					className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center
						rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
					aria-label="Image suivante"
				>
					<FaChevronRight size={20} />
				</button>

				{/* Mobile tap zones */}
				<div
					className="sm:hidden absolute left-0 top-0 w-1/2 h-full"
					onClick={(e) => { e.stopPropagation(); goPrev(); }}
					aria-hidden="true"
				/>
				<div
					className="sm:hidden absolute right-0 top-0 w-1/2 h-full"
					onClick={(e) => { e.stopPropagation(); goNext(); }}
					aria-hidden="true"
				/>
			</motion.div>
		</AnimatePresence>,
		document.body
	);
}
