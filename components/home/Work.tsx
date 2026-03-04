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
        <section id="work" className="py-20 md:py-28 bg-[#050508] relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-900/8 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/8 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col gap-6 mb-12 sm:mb-16">
                    <div className="text-center sm:text-left max-w-xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
                            Selected Work
                        </h2>
                        <p className="text-white/50 text-base sm:text-lg">
                            Explore our portfolio of high-impact digital solutions.
                        </p>
                    </div>

                    {/* Filter Bar - horizontally scrollable on mobile */}
                    <div className="w-full overflow-x-auto pb-1 -mx-1 px-1">
                        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm w-max min-w-full sm:w-auto sm:min-w-0">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0",
                                        activeFilter === filter
                                            ? "bg-white text-black shadow-lg shadow-white/10"
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
