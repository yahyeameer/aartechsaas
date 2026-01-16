"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { BackgroundPaths } from "@/components/ui/background-paths"
import { ShaderAnimation } from "@/components/ui/shader-lines"
import { DashboardMockup } from "@/components/home/DashboardMockup"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Link from "next/link"
import VaporizeTextCycle from "@/components/ui/vapour-text-effect"

export function Hero() {
    return (
        <section className="relative min-h-[100vh] overflow-hidden bg-black selection:bg-purple-500/30">

            {/* Background Paths Integration */}
            <div className="absolute inset-0 z-0">
                <ShaderAnimation />
            </div>

            {/* Overlay Content */}
            <div className="container mx-auto px-4 relative z-10 text-center pt-32 pointer-events-none">
                <div className="pointer-events-auto mt-[15vh]">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8 flex flex-col items-center justify-center min-h-[160px]"
                    >
                        <div className="w-full h-[120px] md:h-[160px] relative">
                            <VaporizeTextCycle
                                texts={["Build Your Digital Future", "With AARTECH"]}
                                font={{
                                    fontFamily: "Outfit, sans-serif",
                                    fontSize: "60px",
                                    fontWeight: 700,
                                }}
                                color="rgba(255, 255, 255, 0.9)"
                                spread={3}
                                density={4}
                                animation={{
                                    vaporizeDuration: 1.5,
                                    fadeInDuration: 0.8,
                                    waitDuration: 2.0
                                }}
                                alignment="center"
                            />
                        </div>
                        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md bg-black/30 backdrop-blur-sm rounded-full py-2 px-6 border border-white/5 mt-4">
                            Premium software solutions, high-end mobile apps, and intelligent AI agents.
                            <span className="block mt-1 text-white/80">Turn your vision into reality today.</span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <LiquidButton size="xl" asChild className="text-white hover:text-white">
                            <Link href="https://wa.me/252636444494" target="_blank" rel="noopener noreferrer">
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </LiquidButton>
                        <Button size="lg" variant="outline" asChild className="rounded-full text-base h-14 px-8 bg-transparent border-white/10 hover:bg-white/5 text-white hover:border-white/20">
                            <Link href="#work">
                                <Play className="mr-2 h-4 w-4 fill-white" /> View Work
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Abstract Dashboard Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, rotateX: 20 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="perspective-[2000px] w-full"
                    >
                        <DashboardMockup />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
