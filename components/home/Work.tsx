"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectCard, Project } from "@/components/work/ProjectCard"
import { cn } from "@/lib/utils"
// import { SpotlightCard } from "@/components/ui/SpotlightCard"; // Unused? Or used in ProjectCard
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

const filters = ["All", "AI Agents", "Management Systems", "Mobile Apps", "E-commerce"]

export function Work() {
    const [activeFilter, setActiveFilter] = useState("All")
    const convexProjects = useQuery(api.projects.get)

    // Map Convex data to Project interface
    const projects: Project[] = convexProjects ? convexProjects.map((p: any) => ({
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
        <section id="work" className="py-24 bg-background relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
                            Selected Work
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Explore our portfolio of high-impact digital solutions.
                        </p>
                    </div>

                    {/* Filter Bar - Glass Effect */}
                    <div className="flex flex-wrap gap-2 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                    activeFilter === filter
                                        ? "bg-white text-black shadow-lg shadow-white/10"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
