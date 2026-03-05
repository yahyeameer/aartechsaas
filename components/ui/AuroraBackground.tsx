"use client"

import { useEffect, useState } from "react"

/**
 * AuroraBackground — lightweight, GPU-friendly animated gradient background.
 * Replaces the heavy Three.js CDN-loaded ShaderAnimation for smoother performance
 * on all devices including mobile.
 */

export function AuroraBackground({ className = "" }: { className?: string }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Base radial glow */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(109,40,217,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(59,130,246,0.10) 0%, transparent 60%)",
                }}
            />

            {/* Animated orb 1 — purple */}
            <div
                className="absolute rounded-full opacity-30 blur-[120px] aurora-orb-1"
                style={{
                    width: "min(600px, 80vw)",
                    height: "min(600px, 80vw)",
                    top: "-15%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "radial-gradient(circle, rgba(109,40,217,0.6) 0%, transparent 70%)",
                }}
            />

            {/* Animated orb 2 — blue */}
            <div
                className="absolute rounded-full opacity-20 blur-[100px] aurora-orb-2"
                style={{
                    width: "min(500px, 70vw)",
                    height: "min(500px, 70vw)",
                    bottom: "0%",
                    right: "-10%",
                    background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
                }}
            />

            {/* Animated orb 3 — teal accent */}
            <div
                className="absolute rounded-full opacity-15 blur-[150px] aurora-orb-3"
                style={{
                    width: "min(400px, 60vw)",
                    height: "min(400px, 60vw)",
                    top: "40%",
                    left: "-10%",
                    background: "radial-gradient(circle, rgba(20,184,166,0.5) 0%, transparent 70%)",
                }}
            />

            {/* Interactive Cursor Glow */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out z-0 hidden md:block" // Hidden on mobile for performance
                style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)",
                    transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
                }}
            />

            {/* Subtle noise overlay for texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />
        </div>
    )
}
