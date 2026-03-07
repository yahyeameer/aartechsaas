"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

/**
 * AuroraBackground — Premium liquid fluid animated gradient background.
 * Uses Framer Motion springs for butter-smooth cursor tracking and CSS filters for liquid blending.
 */

export function AuroraBackground({ className = "" }: { className?: string }) {
    const [isMounted, setIsMounted] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Smooth cursor springs
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

    useEffect(() => {
        setIsMounted(true)
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                mouseX.set(e.clientX - rect.left)
                mouseY.set(e.clientY - rect.top)
            }
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    const xPos = useTransform(mouseX, (v) => v - 300)
    const yPos = useTransform(mouseY, (v) => v - 300)

    if (!isMounted) return <div className={`absolute inset-0 bg-[#050508] overflow-hidden ${className}`} />

    return (
        <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none bg-[#050508] ${className}`}>
            {/* SVG Filter for Liquid Effect */}
            <svg className="hidden">
                <defs>
                    <filter id="liquid">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -25" />
                        <feBlend in="SourceGraphic" in2="blur" />
                    </filter>
                </defs>
            </svg>

            {/* Background container with Liquid Filter */}
            <div className="absolute inset-0 w-full h-full" style={{ filter: "url(#liquid) blur(20px)" }}>
                {/* Static Base */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(120,50,230,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(60,140,250,0.1) 0%, transparent 60%)",
                    }}
                />

                {/* Animated Liquid Orb 1 — purple */}
                <motion.div
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute rounded-full opacity-60"
                    style={{
                        width: "50vw",
                        height: "50vw",
                        top: "-20%",
                        left: "20%",
                        background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, transparent 60%)",
                    }}
                />

                {/* Animated Liquid Orb 2 — blue */}
                <motion.div
                    animate={{
                        x: [0, -70, 70, 0],
                        y: [0, 60, -60, 0],
                        scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute rounded-full opacity-50"
                    style={{
                        width: "60vw",
                        height: "60vw",
                        bottom: "-10%",
                        right: "-10%",
                        background: "radial-gradient(circle, rgba(59,130,246,0.7) 0%, transparent 60%)",
                    }}
                />

                {/* Animated Liquid Orb 3 — teal/indigo */}
                <motion.div
                    animate={{
                        x: [0, 100, -100, 0],
                        y: [0, 100, -100, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute rounded-full opacity-40 mix-blend-screen"
                    style={{
                        width: "40vw",
                        height: "40vw",
                        top: "30%",
                        left: "-5%",
                        background: "radial-gradient(circle, rgba(45,212,191,0.6) 0%, transparent 60%)",
                    }}
                />
            </div>

            {/* Interactive Cursor Glow - Unfiltered for crisp lighting */}
            <motion.div
                className="absolute rounded-full pointer-events-none z-10 mix-blend-screen hidden md:block" // Hidden on mobile
                style={{
                    width: "600px",
                    height: "600px",
                    x: xPos,
                    y: yPos,
                    background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 50%)",
                }}
            />

            {/* Subtle noise overlay for texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-20 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />
        </div>
    )
}

