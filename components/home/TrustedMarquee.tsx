"use client"

import Image from "next/image"

export function TrustedMarquee() {
    // Array of mock company logos. In a real app, replace with actual sponsor/client logos.
    const logos = [
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    ];

    return (
        <div className="w-full py-12 overflow-hidden bg-transparent relative z-10 flex flex-col items-center border-y border-white/5">
            <p className="text-white/40 text-sm font-medium tracking-widest uppercase mb-8">Trusted by visionary companies</p>

            {/* Fade gradients for edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

            <div className="flex whitespace-nowrap overflow-hidden">
                <div className="flex animate-[marquee_40s_linear_infinite] gap-16 md:gap-32 items-center px-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Double the logos to make the infinite scroll seamless */}
                    {[...logos, ...logos, ...logos].map((src, i) => (
                        <div key={i} className="flex-shrink-0">
                            {/* Force height constraint so SVG logos size uniformly */}
                            <img src={src} alt={`Partner Logo ${i}`} className="h-8 object-contain w-auto brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(calc(-100% / 3)); }
                }
            `}</style>
        </div>
    )
}
