export default function BottomBlur() {
	return (
		<div className="pointer-events-none fixed bottom-0 left-0 w-full h-[26vh] z-20">
			<div
				className="w-full h-full backdrop-blur-2xl bg-violet/20"
				style={{
					maskImage: "linear-gradient(to top, black, transparent)",
					WebkitMaskImage: "linear-gradient(to top, black, transparent)",
				}}
			/>
		</div>
	);
}
