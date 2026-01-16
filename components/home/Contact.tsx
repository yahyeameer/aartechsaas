"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2 } from "lucide-react"

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
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">Ready to Scale?</h2>
                            <p className="text-muted-foreground mb-8">
                                Join the future of business. Book a demo or discuss your custom software needs with our experts.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">✓</span>
                                    Custom Architecture Design
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">✓</span>
                                    Seamless AI Integration
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">✓</span>
                                    24/7 Priority Support
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                                    <input required type="text" id="name" className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-sm font-medium text-white/80">Company</label>
                                    <input required type="text" id="company" className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20" placeholder="Acme Inc." />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                                <input required type="email" id="email" className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20" placeholder="john@acme.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                                <textarea required id="message" rows={4} className="w-full rounded-lg bg-black/40 border border-white/10 p-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20 resize-none" placeholder="Tell us about your project..."></textarea>
                            </div>

                            <Button disabled={isLoading} size="lg" className="w-full text-base h-12">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : isSuccess ? (
                                    <>
                                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
                                        Message Sent
                                    </>
                                ) : (
                                    "Book a Demo"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
