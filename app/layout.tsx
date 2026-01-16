
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "AARTECH | Building the Future of Business with AI",
  description: "Custom software, high-end mobile apps, and AI agents tailored for your growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" suppressHydrationWarning>
        <body className={cn(inter.variable, outfit.variable, "font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white")}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <ConvexClientProvider>
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
