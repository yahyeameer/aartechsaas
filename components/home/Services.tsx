"use client"
import { motion } from "framer-motion"
import { Smartphone, Layout, ShoppingBag, Palette, Megaphone, Building2, GraduationCap, Stethoscope, Warehouse } from "lucide-react"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const services = [
    {
        title: "iOS & Android Apps",
        description: "Native and cross-platform mobile app development with premium UX for any industry.",
        icon: Smartphone,
        color: "from-sky-500 to-blue-600",
    },
    {
        title: "ERP Systems",
        description: "Enterprise Resource Planning solutions that streamline your entire business workflow.",
        icon: Layout,
        color: "from-emerald-400 to-teal-600",
    },
    {
        title: "Hospital Management",
        description: "Complete digital hospital systems — patient records, scheduling, billing & pharmacy.",
        icon: Stethoscope,
        color: "from-blue-400 to-indigo-600",
    },
    {
        title: "School Management",
        description: "Student enrollment, grading, attendance, and parent portals — all in one platform.",
        icon: GraduationCap,
        color: "from-teal-400 to-emerald-600",
    },
    {
        title: "Business Solutions",
        description: "Custom software for retail, warehouse, electronics, cosmetics, and clothing businesses.",
        icon: Building2,
        color: "from-indigo-400 to-blue-600",
    },
    {
        title: "E-commerce",
        description: "Full-stack online stores with inventory management, payments, and logistics.",
        icon: ShoppingBag,
        color: "from-sky-400 to-indigo-500",
    },
    {
        title: "Warehouse Management",
        description: "Track inventory, shipments, and stock levels with real-time digital dashboards.",
        icon: Warehouse,
        color: "from-teal-500 to-blue-500",
    },
    {
        title: "Graphic Design",
        description: "Brand identity, social media graphics, packaging, and print-ready materials.",
        icon: Palette,
        color: "from-indigo-500 to-teal-500",
    },
    {
        title: "Digital Marketing",
        description: "SEO, social media management, paid ads, and content strategies that convert.",
        icon: Megaphone,
        color: "from-blue-500 to-sky-400",
    },
]

export function Services() {
    return (
        <section id="services" className="py-20 md:py-28 relative overflow-hidden bg-transparent">
            {/* Ambient Cosmic Core Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.03)_0%,transparent_70%)] pointer-events-none" />

            {/* Top/bottom fade */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050508]/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050508]/40 to-transparent z-10 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-20">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-xs font-semibold tracking-widest uppercase text-white/50 mb-8 backdrop-blur-sm"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse flex-shrink-0" />
                        Our Constellation of Services
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter text-white drop-shadow-lg"
                    >
                        Digitalize <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-600">Everything</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 text-base sm:text-lg leading-relaxed"
                    >
                        From mobile apps to marketing — we digitalize every aspect of your business.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[240px]">
                    {services.map((service, index) => {
                        let bentoClass = "md:col-span-1 md:row-span-1";
                        if (index === 0) bentoClass = "md:col-span-2 md:row-span-2";
                        else if (index === 3) bentoClass = "md:row-span-2";
                        else if (index === 6) bentoClass = "md:col-span-2";
                        else if (index === 8) bentoClass = "md:col-span-2";

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className={bentoClass}
                            >
                                <div className="h-full w-full relative group">
                                    <GlowingEffect
                                        spread={40}
                                        glow={true}
                                        disabled={false}
                                        proximity={64}
                                        inactiveZone={0.01}
                                        borderWidth={2}
                                    />
                                    <SpotlightCard className="h-full w-full p-8 sm:p-10 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(14,165,233,0.1)] bg-white/[0.02] border border-white/[0.05] rounded-3xl flex flex-col items-start text-left overflow-hidden relative backdrop-blur-md">
                                        {/* Hover glow accent */}
                                        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.15] blur-3xl rounded-full transition-all duration-700 pointer-events-none z-0`} />

                                        {/* Icon */}
                                        <div className="mb-auto inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] group-hover:scale-110 group-hover:bg-white/[0.08] transition-all duration-500 z-10 shadow-inner">
                                            <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/80 group-hover:text-white transition-colors" />
                                        </div>

                                        <div className="mt-12 z-10 relative">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-300">{service.title}</h3>
                                            <p className="text-white/50 leading-relaxed text-sm sm:text-base font-medium">
                                                {service.description}
                                            </p>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
