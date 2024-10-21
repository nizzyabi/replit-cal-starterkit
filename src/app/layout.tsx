import UseCalAtoms from "./_components/use-cal";
import { Providers } from "./providers";
import { currentUser } from "@/auth";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/globals.css";
import Link from 'next/link';


/**
 * [@calcom] In your root layout, make sure you import the atoms' global styles so that you get our shiny styles
 * @link https://cal.com/docs/platform/quick-start#5.3-setup-root-of-your-app
 */
import "@calcom/atoms/globals.min.css";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { AxiomWebVitals } from "next-axiom";
import { Roboto_Slab } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";


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
          {/* <TailwindIndicator /> */}
        </Providers>
        <Toaster />
        <footer className="flex justify-evenly py-20 text-white">
          <div>
            <h1 className="mb-4 text-lg font-bold">Cal&apos;s Barbershop</h1>
            <p className="opacity-60 text-sm">All rights reserved.</p>
          </div>
          <div>
            <h1 className="mb-4 text-lg font-bold">Locations</h1>
            <Link href="/" className="space-y-2 text-sm opacity-60">
              <p>Texas</p>
              <p>California</p>
              <p>New York</p>
              <p>London</p>
              <p>Paris</p>
              <p>Tokyo</p>
            </Link>
          </div>
          <div>
            <h1 className="mb-4 text-lg font-bold">Events</h1>
            <Link href="/" className="space-y-2 text-sm opacity-60">
              <p>Bookings</p>
              <p>Events</p>
              <p>Barbers</p>
            </Link>
          </div>
          <div>
            <h1 className="mb-4 text-lg font-bold">Contact</h1>
            <Link href="/" className="space-y-2 text-sm opacity-60">
              <p>Phone</p>
              <p>Email</p>
              <p>Message</p>
            </Link>
          </div>
          <div>
            <h1 className="mb-4 text-lg font-bold">Socials</h1>
            <Link href="/" className="space-y-2 text-sm opacity-60">
              <p>Youtube</p>
              <p>Instagram</p>
              <p>Facebook</p>
              <p>X</p>
            </Link>
          </div>
        </footer>
      </body>
      <Analytics />
    </html>
  );
}
