import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050508] px-4">
            <div className="text-center max-w-md">
                <h1 className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
                <p className="text-white/50 mb-8 text-sm leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Button asChild className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    )
}
