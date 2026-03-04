"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050508] px-4">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
                <p className="text-white/50 mb-8 text-sm leading-relaxed">
                    An unexpected error occurred. Please try again or contact us if the problem persists.
                </p>
                <Button
                    onClick={reset}
                    className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12"
                >
                    Try Again
                </Button>
            </div>
        </div>
    )
}
