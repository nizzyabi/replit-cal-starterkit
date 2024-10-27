
import { Button } from "@/components/ui/button";
import Link from "next/link";

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Hero = () => {
  return (
      <div className="relative h-screen">
          <img src="/location.jpg" alt="barber" className="h-full w-full object-cover opacity-50" />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1
              className="text-6xl font-bold tracking-wide text-white md:text-8xl"
              >
              Cal&apos;s Barbershop
            </h1>
            <p className="mt-4 text-xl font-medium text-white md:text-2xl">
              2203 Sunset Blvd, Los Angeles, CA 90026
            </p>
            <div>
              <Link href="/our-barbers"><Button className="mt-4 h-12 w-40 text-lg transition-all duration-300 ease-in-out hover:scale-105">
                Book Now
              </Button></Link>
            </div>
          </div>
      </div>
  )
}