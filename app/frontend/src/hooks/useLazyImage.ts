import { useState, useEffect, useRef } from 'react';

interface UseLazyImageOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazyImage(
  src: string,
  placeholder?: string,
  options: UseLazyImageOptions = {}
) {
  const { threshold = 0.1, rootMargin = '50px' } = options;
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
              setIsError(false);
            };
            img.onerror = () => {
              setIsError(true);
              setIsLoaded(false);
            };
            img.src = src;
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, threshold, rootMargin]);

  return { imgRef, imageSrc, isLoaded, isError };
} 