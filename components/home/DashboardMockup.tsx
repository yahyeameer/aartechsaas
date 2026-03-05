"use client"

import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion"
import { useRef } from "react"
import {
    Activity,
    BarChart3,
    Globe,
    Zap,
    Cpu,
    Share2,
    MoreHorizontal,
    Wifi
} from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardMockup() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Magnetic 3D Hover
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / rect.width - 0.5
        const yPct = mouseY / rect.height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    // Scroll-driven scale down
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.85])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
        <motion.div
            ref={containerRef}
            style={{ scale, opacity, perspective: "2000px" }}
            className="w-full aspect-video md:aspect-[16/9] max-w-6xl mx-auto p-2 md:p-4 perspective-[2000px]"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/5 transition-shadow hover:shadow-[0_30px_60px_rgba(109,40,217,0.2)]"
            >

                {/* Window Controls */}
                <div className="absolute top-0 left-0 right-0 h-12 border-b border-white/5 bg-white/5 flex items-center px-6 justify-between z-20">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-sm"></div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/20 font-medium tracking-widest uppercase">
                        <Wifi className="w-3 h-3" />
                        NOON DIGITAL v2.0
                    </div>
                </div>

                <div className="absolute inset-0 pt-12 p-3 sm:p-6 grid grid-cols-12 grid-rows-6 gap-2 sm:gap-4 md:gap-6 bg-grid-white/[0.02] overflow-y-auto md:overflow-hidden">

                    {/* Sidebar / Nav */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden md:flex col-span-2 row-span-6 rounded-xl bg-white/5 border border-white/5 flex-col p-4 justify-between group hover:bg-white/10 transition-colors"
                    >
                        <div className="space-y-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg shadow-purple-500/20"></div>
                            <div className="space-y-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.random() * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                            className="h-full bg-white/20"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <Zap className="w-5 h-5 text-yellow-400 mb-2" />
                            <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                        </div>
                    </motion.div>

                    {/* Main Stat Card - System Status */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="col-span-12 md:col-span-6 row-span-3 sm:row-span-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-4 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h3 className="text-zinc-400 text-[10px] sm:text-sm font-medium tracking-wide uppercase mb-1">System Health</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">99.9%</span>
                                    <span className="text-emerald-400 text-xs sm:text-sm font-medium">+0.4%</span>
                                </div>
                            </div>
                            <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-white/20" />
                        </div>

                        <div className="relative h-16 sm:h-32 w-full z-10">
                            {/* Simulated Graph */}
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 80 C 100 80, 150 20, 200 50 S 300 90, 400 30 S 500 60, 600 20"
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#818cf8" />
                                        <stop offset="100%" stopColor="#c084fc" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </motion.div>

                    {/* Secondary Stat - Users */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="col-span-6 md:col-span-4 row-span-1 sm:row-span-2 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-6 flex flex-col justify-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-12 sm:w-24 h-12 sm:h-24 bg-blue-500/20 blur-[20px] sm:blur-[50px] rounded-full pointer-events-none"></div>
                        <div className="flex items-center gap-2 sm:gap-4 mb-1 sm:mb-4">
                            <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                                <Globe className="w-3 h-3 sm:w-5 sm:h-5" />
                            </div>
                            <span className="text-zinc-400 text-[10px] sm:text-sm">Agents</span>
                        </div>
                        <div className="text-lg sm:text-3xl font-bold text-white">2,405</div>
                    </motion.div>

                    {/* Secondary Stat - CPU */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="col-span-6 md:col-span-4 row-span-1 sm:row-span-2 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-6 flex flex-col justify-center relative overflow-hidden"
                    >
                        <div className="absolute bottom-0 left-0 w-12 sm:w-24 h-12 sm:h-24 bg-pink-500/20 blur-[20px] sm:blur-[50px] rounded-full pointer-events-none"></div>
                        <div className="flex items-center gap-2 sm:gap-4 mb-1 sm:mb-4">
                            <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/30">
                                <Cpu className="w-3 h-3 sm:w-5 sm:h-5" />
                            </div>
                            <span className="text-zinc-400 text-[10px] sm:text-sm">Power</span>
                        </div>
                        <div className="text-lg sm:text-3xl font-bold text-white">84 TB</div>
                    </motion.div>

                    {/* Bottom Wide Card - Analytics */}
                    <div className="col-span-12 md:col-span-10 row-span-2 rounded-xl sm:rounded-2xl bg-[#0F0F0F] border border-white/5 p-3 sm:p-4 flex items-center justify-between gap-4 sm:gap-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                        <div className="flex items-center gap-3 sm:gap-6 z-10 pl-1 sm:pl-4">
                            <div className="p-2 sm:p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
                            </div>
                            <div>
                                <div className="text-white text-xs sm:text-base font-medium mb-0.5 sm:mb-1">Analytics</div>
                                <div className="text-zinc-500 text-[8px] sm:text-xs">Real-time data flow</div>
                            </div>
                        </div>
                        <div className="flex gap-0.5 sm:gap-1 items-end h-8 sm:h-12 z-10 pr-1 sm:pr-4">
                            {[40, 70, 45, 90, 60, 80, 50, 95].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                                    className="w-1 sm:w-2 bg-gradient-to-t from-white/10 to-white/60 rounded-t-[1px] sm:rounded-t-sm"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Small Corner Action */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex col-span-2 md:col-span-2 row-span-2 rounded-2xl bg-white/10 border border-white/10 flex-col items-center justify-center gap-2 group hover:bg-white/20 transition-colors"
                    >
                        <Share2 className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                        <span className="text-[10px] text-white/40 uppercase tracking-wider group-hover:text-white transition-colors">Export</span>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}
