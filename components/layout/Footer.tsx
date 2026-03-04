"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram, MessageCircle } from "lucide-react"

const footerLinks = {
    Services: [
        { name: "iOS & Android Apps", href: "#services" },
        { name: "ERP Systems", href: "#services" },
        { name: "Hospital Management", href: "#services" },
        { name: "School Management", href: "#services" },
        { name: "E-commerce & Business", href: "#services" },
        { name: "Graphic Design", href: "#services" },
        { name: "Digital Marketing", href: "#services" },
    ],
    Company: [
        { name: "Services", href: "#services" },
        { name: "Work", href: "#work" },
        { name: "Contact", href: "#contact" },
    ],
    Socials: [
        { name: "WhatsApp", href: "https://wa.me/25263644494", icon: MessageCircle },
        { name: "Twitter", href: "https://x.com/noondigital", icon: Twitter },
        { name: "LinkedIn", href: "https://linkedin.com/company/noondigital", icon: Linkedin },
        { name: "Instagram", href: "https://instagram.com/noondigital", icon: Instagram },
    ]
}

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#050508] pt-14 pb-8">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand — full width on xs only */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-3 block">
                            NOON <span className="text-sm font-medium tracking-[0.25em] text-white/50">DIGITAL</span>
                        </Link>
                        <p className="text-white/45 text-sm mb-4 leading-relaxed max-w-[240px]">
                            Your complete digital transformation partner — apps to marketing, all digitalized.
                        </p>
                        <Link
                            href="https://wa.me/25263644494"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm hover:bg-green-500/20 transition-all duration-300"
                        >
                            <MessageCircle className="w-4 h-4 flex-shrink-0" />
                            Chat on WhatsApp
                        </Link>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
                        <ul className="space-y-2.5">
                            {footerLinks.Services.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-white/45 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
                        <ul className="space-y-2.5">
                            {footerLinks.Company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-white/45 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h3>
                        <div className="flex gap-3 flex-wrap">
                            {footerLinks.Socials.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                                    aria-label={social.name}
                                >
                                    <social.icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
                    <p className="text-xs text-white/30">
                        &copy; {new Date().getFullYear()} NOON Digital. All rights reserved.
                    </p>
                    <p className="text-xs text-white/20">
                        Built with ❤ for the digital future
                    </p>
                </div>
            </div>
        </footer>
    )
}


