"use client"

import React, { useRef, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    spotlightColor?: string
}

export function SpotlightCard({
    children,
    className,
    spotlightColor = "rgba(255, 255, 255, 0.25)"
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const mouseX = useSpring(0, { stiffness: 400, damping: 25 })
    const mouseY = useSpring(0, { stiffness: 400, damping: 25 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return
        const rect = divRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative overflow-hidden rounded-2xl bg-[#09090b] border border-white/5 transition-all duration-500 group",
                className
            )}
        >
            {/* Animated Spotlight Border */}
            <motion.div
                className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-500"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${spotlightColor}, transparent 50%)`
                    ),
                }}
            />
            {/* Inner Content Wrapper to mask the border */}
            <div className="absolute inset-[1px] rounded-[15px] bg-[#09090b] z-0" />

            {/* Spotlight Glow inside the card */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 hidden sm:block mix-blend-screen"
                style={{
                    opacity: isHovered ? 0.15 : 0,
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, ${spotlightColor}, transparent 60%)`
                    ),
                }}
            />
            <div className="relative z-20 h-full">{children}</div>
        </div>
    )
}

