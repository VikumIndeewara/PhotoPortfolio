// components/CountUp.tsx
import React, { useState, useEffect } from 'react';

interface CountUpProps {
    endValue: number;
    duration: number; // Duration in milliseconds
    inView: boolean;
    suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ endValue, duration, inView, suffix = '' }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const startTimeRef = React.useRef(0);
    const animationFrameRef = React.useRef<number>();

    // Animation logic
    useEffect(() => {
        if (!inView) {
            // Reset state if it goes out of view (optional, but good practice)
            setCurrentValue(0);
            return;
        }

        // Function to animate the counting
        const animateCount = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }

            const timePassed = timestamp - startTimeRef.current;
            const progress = Math.min(timePassed / duration, 1); // 0 to 1

            const nextValue = Math.floor(progress * endValue);
            setCurrentValue(nextValue);

            if (progress < 1) {
                // Continue the animation
                animationFrameRef.current = requestAnimationFrame(animateCount);
            } else {
                // Animation complete
                cancelAnimationFrame(animationFrameRef.current!);
            }
        };

        // Start the animation loop
        animationFrameRef.current = requestAnimationFrame(animateCount);

        // Cleanup function for unmount or dependency change
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [inView, endValue, duration]); // Re-run effect when inView state changes

    return <>{currentValue}{suffix}</>;
};

export default CountUp;