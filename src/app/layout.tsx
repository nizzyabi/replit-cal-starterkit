import UseCalAtoms from "./_components/use-cal";
import { Providers } from "./providers";
import { currentUser } from "@/auth";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/globals.css";
import Link from 'next/link';
import "@calcom/atoms/globals.min.css";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { AxiomWebVitals } from "next-axiom";
import { Roboto_Slab } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { Footer } from '@/components/footer';
import { TailwindIndicator } from "./tailwind-indicator";

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: "Cal Barbershop: Example App",
    template: `Cal Barbershop | %s`,
  },
  description: "Cal.com Atoms example app: Showcase usage of the 'Cal Atoms' React Components",
  keywords: [
    "cal.com",
    "platform",
    "example",
    "app",
    "scheduling software",
    "scheduling components",
    "scheduling react",
    "scheduling nextjs",
    "scheduling cal",
    "cal atoms"
  ],
  authors: [
    {
      name: "Nizar Abi Zaher",
      url: "https://x.com/nizzyabi",
    },
  ],
  creator: "Cal.com",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /** [@calcom] Ensure to set the diretion (either 'ltr' or 'rtl') since the calcom/atoms use their styles */
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head />
      <AxiomWebVitals />
      <body className={cn(robotoSlab.className)}>
        <Providers defaultTheme="system" enableSystem attribute="class">
          <div className="flex min-h-screen flex-col">
            <UseCalAtoms
              calAccessToken={currentUser().then((dbUser) => dbUser?.calAccessToken ?? null) ?? null}>
              {children}
            </UseCalAtoms>
          </div>
          <TailwindIndicator /> 
        </Providers>
        <Toaster />
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
