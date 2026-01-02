import { useState, forwardRef, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  priority?: boolean;
}

// Image cache to track loaded images
const imageCache = new Set<string>();

// Preload image function
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      resolve();
      return;
    }
    const img = new Image();
    img.onload = () => {
      imageCache.add(src);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
};

export const LazyImage = forwardRef<HTMLDivElement, LazyImageProps>(
  ({ src, alt, className, skeletonClassName, priority = false }, ref) => {
    const [isLoaded, setIsLoaded] = useState(() => imageCache.has(src));
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      // Check if image is already cached
      if (imageCache.has(src)) {
        setIsLoaded(true);
        return;
      }

      // For priority images, preload immediately
      if (priority) {
        preloadImage(src).then(() => setIsLoaded(true)).catch(() => setHasError(true));
      }
    }, [src, priority]);

    useEffect(() => {
      // Use Intersection Observer for better lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && imgRef.current) {
              // Start loading when in viewport
              if (imgRef.current.complete) {
                imageCache.add(src);
                setIsLoaded(true);
              }
            }
          });
        },
        { rootMargin: "200px" } // Start loading 200px before viewport
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, [src]);

    const handleLoad = () => {
      imageCache.add(src);
      setIsLoaded(true);
    };

    return (
      <div ref={ref} className="relative w-full h-full overflow-hidden">
        {/* Skeleton placeholder with shimmer effect */}
        {!isLoaded && !hasError && (
          <div 
            className={cn(
              "absolute inset-0 w-full h-full bg-gradient-to-r from-secondary via-secondary/50 to-secondary animate-pulse",
              skeletonClassName
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent animate-[shimmer_1.5s_infinite]" 
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite linear",
              }}
            />
          </div>
        )}
        
        {/* Actual image with faster transition */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={() => setHasError(true)}
          className={cn(
            "transition-opacity duration-300 ease-out",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
        />
      </div>
    );
  }
);

// Utility to preload multiple images (useful for gallery)
export const preloadImages = (sources: string[]) => {
  return Promise.all(sources.map(preloadImage));
};

LazyImage.displayName = "LazyImage";
