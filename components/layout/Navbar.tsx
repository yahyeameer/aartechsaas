"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)",
                scrolled
                    ? "top-4 w-[95%] max-w-5xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-full py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                    : "top-0 w-full bg-transparent py-6 border-b border-transparent"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden">
                        <Image src="/icon.png" alt="NOON Digital" width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        NOON <span className="text-sm font-medium tracking-[0.25em] text-white/50">DIGITAL</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/70 hover:text-white transition-colors hover:glow-text"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {mounted && (
                            <>
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                    <Button asChild className="bg-white text-black hover:bg-white/90">
                                        <Link href="https://wa.me/25263644494" target="_blank" rel="noopener noreferrer">
                                            Get Started
                                        </Link>
                                    </Button>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-9 h-9 border border-white/20"
                                            }
                                        }}
                                    />
                                </SignedIn>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-black md:hidden flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                                <div className="w-8 h-8 rounded-lg overflow-hidden">
                                    <Image src="/icon.png" alt="NOON Digital" width={32} height={32} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                    NOON <span className="text-sm font-medium tracking-[0.25em] text-white/50">DIGITAL</span>
                                </span>
                            </Link>
                            <button className="text-white p-2" onClick={() => setMobileMenuOpen(false)}>
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6 mb-12">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-4xl font-bold text-white/50 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="mt-auto flex flex-col gap-4">
                            {mounted && (
                                <>
                                    <SignedOut>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <Button asChild className="w-full h-14 text-lg bg-white text-black hover:bg-white/90 rounded-2xl" onClick={() => setMobileMenuOpen(false)}>
                                                <Link href="https://wa.me/25263644494" target="_blank" rel="noopener noreferrer">
                                                    Get Started
                                                </Link>
                                            </Button>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <SignInButton mode="modal">
                                                <Button variant="outline" className="w-full h-14 text-lg border-white/10 text-white rounded-2xl" onClick={() => setMobileMenuOpen(false)}>
                                                    Sign In
                                                </Button>
                                            </SignInButton>
                                        </motion.div>
                                    </SignedOut>
                                    <SignedIn>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/10"
                                        >
                                            <UserButton showName appearance={{
                                                elements: {
                                                    userButtonBox: "flex-row-reverse gap-4",
                                                    userButtonOuterIdentifier: "text-white text-lg font-medium"
                                                }
                                            }} />
                                        </motion.div>
                                    </SignedIn>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
