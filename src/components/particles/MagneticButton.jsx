"use client";
import { useRef, useCallback } from "react";
import gsap from "gsap";

export default function MagneticButton({ children, className = "", strength = 0.3, ...props }) {
    const buttonRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const btn = buttonRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.3, ease: "power2.out" });
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        const btn = buttonRef.current;
        if (!btn) return;
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    }, []);

    return (
        <div
            ref={buttonRef}
            className={`inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </div>
    );
}
