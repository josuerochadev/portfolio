import type React from "react";

interface Props {
	images: {
		desktop: string;
		mobile: string;
		thumbnail: string;
	};
	alt: string;
	className?: string;
	loading?: "lazy" | "eager";
	width?: number;
	height?: number;
}

// Optimized responsive image with WebP format and multiple breakpoints
// Automatically serves appropriate size based on viewport and connection speed
const ResponsiveImage: React.FC<Props> = ({
	images,
	alt,
	className = "",
	loading = "lazy",
	width,
	height,
}) => {
	return (
		<picture className={className}>
			{/* High-resolution desktop (>1024px) */}
			<source
				media="(min-width: 1024px)"
				srcSet={images.desktop}
				type="image/webp"
			/>
			
			{/* Mobile and tablet (768px-1023px) */}
			<source
				media="(min-width: 768px) and (max-width: 1023px)"
				srcSet={images.mobile}
				type="image/webp"
			/>
			
			{/* Small mobile (<768px) - use thumbnail for performance */}
			<source
				media="(max-width: 767px)"
				srcSet={images.thumbnail}
				type="image/webp"
			/>
			
			{/* Fallback - mobile version for compatibility */}
			<img
				src={images.mobile}
				alt={alt}
				loading={loading}
				className="w-full h-full object-cover"
				{...(width ? { width } : {})}
				{...(height ? { height } : {})}
			/>
		</picture>
	);
};

export default ResponsiveImage;