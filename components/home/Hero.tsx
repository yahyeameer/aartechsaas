"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, Play, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuroraBackground } from "@/components/ui/AuroraBackground"
import { DashboardMockup } from "@/components/home/DashboardMockup"
import { MagneticButton } from "@/components/ui/MagneticButton"
import Link from "next/link"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
}

export function Hero() {
    return (
        <section className="relative min-h-[100dvh] overflow-hidden bg-[#050508] flex items-center justify-center">

            {/* Smooth Aurora Background */}
            <AuroraBackground />

            {/* Subtle grid lines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Fade grid at edges */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, #050508 100%)"
            }} />

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center py-24 sm:py-28 w-full max-w-5xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center justify-center w-full gap-8"
                >

                    {/* Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                        Full-Service Digital Agency
                    </motion.div>

                    {/* Headline */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full"
                    >
                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
                            <motion.span
                                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="inline-block"
                            >
                                Digitalize{" "}
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 inline-block"
                            >
                                Everything
                            </motion.span>
                            <br />
                            <motion.span
                                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="text-white/80 inline-block mt-2"
                            >
                                With NOON Digital
                            </motion.span>
                        </h1>
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed px-2"
                    >
                        Apps · ERP · Hospital &amp; School Systems · E-commerce · Design · Marketing
                        <span className="block mt-1.5 text-white/70 font-medium">
                            Everything your business needs, digitalized.
                        </span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-2"
                    >
                        <MagneticButton>
                            <Link
                                href="https://wa.me/25263644494"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-14 px-8 rounded-full bg-white text-black text-base font-semibold hover:bg-white/90 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                            >
                                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                                Chat on WhatsApp
                                <ArrowRight className="h-4 w-4 flex-shrink-0" />
                            </Link>
                        </MagneticButton>

                        <MagneticButton>
                            <Link
                                href="#work"
                                className="glass-panel inline-flex items-center justify-center gap-2 w-full sm:w-auto h-14 px-8 rounded-full text-white text-base font-medium active:scale-95 transition-all duration-300"
                            >
                                <Play className="h-4 w-4 fill-white flex-shrink-0" />
                                View Our Work
                            </Link>
                        </MagneticButton>
                    </motion.div>

                    {/* Dashboard Mockup */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full mt-4"
                        style={{ perspective: "2000px" }}
                    >
                        <DashboardMockup />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
