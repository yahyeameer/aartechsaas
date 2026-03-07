"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectCard, Project } from "@/components/work/ProjectCard"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc } from "@/convex/_generated/dataModel"

const filters = ["All", "Mobile Apps", "Management Systems", "E-commerce", "Design & Marketing"]

export function Work() {
    const [activeFilter, setActiveFilter] = useState("All")
    const convexProjects = useQuery(api.projects.get)

    // Map Convex data to Project interface
    const projects: Project[] = convexProjects ? convexProjects.map((p: Doc<"projects">) => ({
        id: p._id,
        title: p.title,
        category: p.category,
        description: p.description,
        image: p.image,
        videoLoop: p.videoLoop || "",
        demoUrl: p.demoUrl || "#",
        walkthroughUrl: p.walkthroughUrl || "#"
    })) : []

    const filteredProjects = projects.filter(project =>
        activeFilter === "All" || project.category === activeFilter
    )

    return (
        <section id="work" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
            {/* Background Ambience mapped to Nebula colors */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sky-900/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-900/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col gap-6 mb-12 sm:mb-16">
                    <div className="text-center sm:text-left max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-xs font-semibold tracking-widest uppercase text-white/50 mb-6 backdrop-blur-sm"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                            Our Portfolio
                        </motion.div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tighter text-white drop-shadow-lg">
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">Work</span>
                        </h2>
                        <p className="text-white/50 text-base sm:text-lg font-medium">
                            Explore our constellation of high-impact digital solutions.
                        </p>
                    </div>

                    <div className="w-full overflow-x-auto pb-2 -mx-1 px-1 hide-scrollbar">
                        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.02] border border-white/5 w-max min-w-full sm:w-auto sm:min-w-0 backdrop-blur-md">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0",
                                        activeFilter === filter
                                            ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                                            : "text-white/50 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                    {filteredProjects.length === 0 && convexProjects && (
                        <div className="col-span-full text-center text-neutral-500 py-10">
                            No projects found in this category.
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
