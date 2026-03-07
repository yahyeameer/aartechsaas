"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from './MagneticButton';
import { MessageCircle, Sparkles, Zap, Code2 } from 'lucide-react';
import Link from 'next/link';

export const HorizonHeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // GSAP Typography Reveal timeline
            const tl = gsap.timeline();

            // Staggered Character reveal for "NOON DIGITAL"
            tl.fromTo(".char-reveal",
                { opacity: 0, scale: 1.5, filter: "blur(10px)", y: 40 },
                { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1.2, stagger: 0.05, ease: "power4.out" }
            );

            // Subtitle fade up
            tl.fromTo(".subtitle-reveal",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=0.8"
            );

            // Floating Badges entrance
            tl.fromTo(".badge-reveal",
                { opacity: 0, scale: 0.8, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
                "-=0.6"
            );

            // CTAs entrance
            tl.fromTo(".hero-cta",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );

            // Continuous breathing animation for badges
            gsap.to(".badge-reveal", {
                y: -8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                stagger: 0.3,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const splitTitle = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char-reveal inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 drop-shadow-[0_0_80px_rgba(14,165,233,0.5)]">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10 selection:bg-sky-500/30">
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center -mt-10">

                {/* Main Typography Block */}
                <div className="mb-8 relative">
                    <h1 className="font-heading text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black text-white tracking-tighter leading-none mb-6 mix-blend-plus-lighter">
                        {splitTitle("NOON DIGITAL")}
                    </h1>
                    <p className="subtitle-reveal text-xl sm:text-2xl md:text-3xl text-white/70 font-medium tracking-wide">
                        Where vision meets reality, we build the digital future.
                    </p>
                </div>

                {/* UI/UX Pro Max Glass Badges (Replacing the 3 black sections) */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 pointer-events-auto">
                    <div className="badge-reveal flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                        <Sparkles className="w-4 h-4 text-sky-400" />
                        <span className="text-sm sm:text-base font-semibold text-white/90 tracking-widest uppercase">Dream</span>
                    </div>
                    <div className="badge-reveal flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                        <Code2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm sm:text-base font-semibold text-white/90 tracking-widest uppercase">Create</span>
                    </div>
                    <div className="badge-reveal flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-sm sm:text-base font-semibold text-white/90 tracking-widest uppercase">Digitalize</span>
                    </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-cta pointer-events-auto">
                    <MagneticButton>
                        <Link href="https://wa.me/25263644494" className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-8 text-sm font-bold text-black transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                            <MessageCircle className="w-5 h-5 mr-3" />
                            Start Your Project
                        </Link>
                    </MagneticButton>
                    <MagneticButton>
                        <Link href="#work" className="inline-flex h-14 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.08] px-8 text-sm font-semibold text-white transition-all hover:bg-white/[0.08] backdrop-blur-xl">
                            Explore Our Work
                        </Link>
                    </MagneticButton>
                </div>

            </div>

            {/* Extremely subtle bottom gradient mask to smoothly transition away from the horizon scene if needed */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050508]/20 to-transparent pointer-events-none" />
        </div>
    );
};
