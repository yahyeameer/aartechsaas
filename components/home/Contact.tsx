"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export function Contact() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const createContact = useMutation(api.contacts.createContact)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.target as HTMLFormElement)
        const name = formData.get("name") as string
        const company = formData.get("company") as string
        const email = formData.get("email") as string
        const message = formData.get("message") as string

        try {
            await createContact({
                name,
                email,
                message: `Company: ${company}\nMessage: ${message}`
            })
            setIsSuccess(true)
            // Reset form
            const form = e.target as HTMLFormElement;
            form.reset();
        } catch (error) {
            console.error("Failed to submit contact form:", error)
        } finally {
            setIsLoading(false)
            setTimeout(() => setIsSuccess(false), 5000)
        }
    }

    return (
        <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-transparent">
            {/* Background Gradients */}
            <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-sky-900/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative z-10">
                        <div className="text-center md:text-left flex flex-col items-center md:items-start">
                            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tighter drop-shadow-md">
                                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">Digitalize?</span>
                            </h2>
                            <p className="text-white/50 text-base mb-10 leading-relaxed font-medium">
                                Let&apos;s bring your business online. Chat with us on WhatsApp or fill out the form to get started.
                            </p>

                            {/* WhatsApp CTA */}
                            <Link
                                href="https://wa.me/25263644494"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/30 transition-all duration-300 group"
                            >
                                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Chat on WhatsApp</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="space-y-4 inline-block text-left">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">✓</span>
                                    Full-Stack Mobile & Web Apps
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">✓</span>
                                    ERP, Hospital & School Systems
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">✓</span>
                                    Design & Marketing Services
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-white/60 uppercase tracking-widest">Name</label>
                                    <input required type="text" id="name" name="name" className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] px-5 text-white focus:outline-none focus:bg-white/[0.06] focus:border-white/20 transition-all duration-300 placeholder:text-white/20" placeholder="Your name" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-sm font-semibold text-white/60 uppercase tracking-widest">Business</label>
                                    <input required type="text" id="company" name="company" className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] px-5 text-white focus:outline-none focus:bg-white/[0.06] focus:border-white/20 transition-all duration-300 placeholder:text-white/20" placeholder="Your business" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-white/60 uppercase tracking-widest">Email</label>
                                <input required type="email" id="email" name="email" className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] px-5 text-white focus:outline-none focus:bg-white/[0.06] focus:border-white/20 transition-all duration-300 placeholder:text-white/20" placeholder="your@email.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-white/60 uppercase tracking-widest">Project Details</label>
                                <textarea required id="message" name="message" rows={4} className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.05] p-5 text-white focus:outline-none focus:bg-white/[0.06] focus:border-white/20 transition-all duration-300 placeholder:text-white/20 resize-none" placeholder="I need an app for my business..."></textarea>
                            </div>

                            <Button disabled={isLoading} size="lg" className="w-full text-base font-semibold h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 border-0">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : isSuccess ? (
                                    <>
                                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
                                        Message Sent!
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
