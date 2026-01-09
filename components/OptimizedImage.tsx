import React from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    priority?: boolean; // For above-the-fold images
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Optimized Image Component
 * 
 * Automatically serves WebP/AVIF with fallback to original format.
 * Implements lazy loading for off-screen images.
 * Prevents Cumulative Layout Shift with explicit dimensions.
 * 
 * @param src - Path to image (e.g., "/hero-1.jpg")
 * @param alt - Alt text for accessibility
 * @param priority - Set true for above-the-fold images (disables lazy loading)
 * @param width - Explicit width to prevent CLS
 * @param height - Explicit height to prevent CLS
 * @param className - Additional CSS classes
 * @param objectFit - CSS object-fit property
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false,
    objectFit = 'cover',
}) => {
    // Extract filename without extension
    const getImagePaths = (imagePath: string) => {
        const lastDotIndex = imagePath.lastIndexOf('.');
        const basePath = imagePath.substring(0, lastDotIndex);
        const extension = imagePath.substring(lastDotIndex);

        return {
            avif: `${basePath}.avif`,
            webp: `${basePath}.webp`,
            original: imagePath,
        };
    };

    const { avif, webp, original } = getImagePaths(src);

    return (
        <picture>
            {/* AVIF - best compression, modern browsers */}
            <source srcSet={avif} type="image/avif" />

            {/* WebP - good compression, wider support */}
            <source srcSet={webp} type="image/webp" />

            {/* Original format - fallback for older browsers */}
            <img
                src={original}
                alt={alt}
                className={className}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding={priority ? 'sync' : 'async'}
                style={{
                    objectFit,
                    width: width ? '100%' : 'auto',
                    height: height ? '100%' : 'auto',
                }}
            />
        </picture>
    );
};

export default OptimizedImage;
