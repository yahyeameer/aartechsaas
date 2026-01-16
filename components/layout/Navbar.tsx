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
    { name: "About", href: "#about" },
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden">
                        <Image src="/icon.png" alt="AARTECH" width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        AARTECH
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
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                                    Sign In
                                </Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button asChild className="bg-white text-black hover:bg-white/90">
                                    <Link href="https://wa.me/252636444494" target="_blank">
                                        Get Started
                                    </Link>
                                </Button>
                            </SignUpButton>
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-3 mt-4">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                        Sign In
                                    </Button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                        <Link href="https://wa.me/252636444494" target="_blank">
                                            Get Started
                                        </Link>
                                    </Button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <div className="flex justify-center py-2">
                                    <UserButton showName />
                                </div>
                            </SignedIn>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
