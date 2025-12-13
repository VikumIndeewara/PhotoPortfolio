// hooks/useInView.ts
import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when a component enters the viewport.
 * @param threshold A number indicating the percentage of the target element which must be visible (0.0 to 1.0).
 * @returns [ref, inView] - A ref to attach to the element and a boolean indicating visibility.
 */
export const useInView = (threshold: number = 0.1) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the element is intersecting (visible), set inView to true
                if (entry.isIntersecting) {
                    setInView(true);
                    // Stop observing once it's in view and we've triggered the animation
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null, // Default is the viewport
                rootMargin: '0px',
                threshold: threshold,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        // Cleanup function
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold]);

    return { ref, inView };
};