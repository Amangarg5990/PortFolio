import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Snappier spring configuration for a sharp "box" feel
    const springConfig = { damping: 20, stiffness: 450, mass: 0.3 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Skip on mobile devices to prevent touch interference
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const moveCursor = (e) => {
            // Offset by half width/height (28px total -> 14px)
            cursorX.set(e.clientX - 14);
            cursorY.set(e.clientY - 14);
        };

        const handleMouseOver = (e) => {
            const isClickable = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || 
                                e.target.closest('a') || 
                                e.target.closest('button') || 
                                e.target.closest('[role="button"]');
            setIsHovering(!!isClickable);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        setIsVisible(true);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 w-7 h-7 border-[2.5px] border-emerald-400 pointer-events-none z-[10000] hidden md:flex items-center justify-center mix-blend-screen shadow-[0_0_15px_rgba(52,211,153,0.4)]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                opacity: isVisible ? 1 : 0
            }}
            animate={{
                scale: isHovering ? 1.6 : 1,
                rotate: isHovering ? 45 : 0, // Diamond rotation on hover
                backgroundColor: isHovering ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0)",
                borderRadius: isHovering ? "8px" : "0px", // Sharp box normally, rounded on hover
                borderWidth: isHovering ? "1px" : "2.5px"
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
            <motion.div 
                className="w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                animate={{
                    scale: isHovering ? 0 : 1,
                    rotate: isHovering ? -45 : 0, // Counter-rotate the inner square when shrinking
                    borderRadius: "0px"
                }}
                transition={{ duration: 0.25 }}
            />
        </motion.div>
    );
};

export default CustomCursor;
