import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Banknote,
  StarIcon,
} from "lucide-react";


const barbers = [
  { name: "Alex Smith", rating: 4.5, price: 20, image: "/alex.jpg" },
  { name: "Max Hale", rating: 3.9, price: 18, image: "/max.jpg" },
  { name: "Amira Rost", rating: 4.1, price: 16, image: "/amira.jpg" },
  { name: "Lucas Andrews", rating: 4.8, price: 50, image: "/lucas.jpg" },
  { name: "Jane Ame", rating: 3.7, price: 20, image: "/jane.jpg" },
  { name: "John Flamem", rating: 4.8, price: 24, image: "/john.jpg" },
];

export const OurBarbersLanding = () => {

  const statsRef = useRef(null);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  
  return (
    <section
      className="my-4 text-center"
      ref={statsRef}
      >
      <h2 className="text-6xl font-semibold">Our Barbers</h2>
      <p className='opacity-60 text-lg'>Meet our awesome team of barbers</p>
      <div
        className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-0"
        >
        {barbers.map((barber, index) => (
          <div key={index} className="col-span-1 flex">
            <Card className="mx-auto w-full max-w-md overflow-hidden rounded-lg shadow-sm">
              <div className="relative">
                <div className={cn("h-[280px] w-full rounded-t-lg transition-all duration-300")}>
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="h-full w-full rounded-t-lg object-cover transition-opacity duration-300 ease-in-out"
                  />
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{barber.name}</h3>
                    <div className="flex items-center text-[#facc14]">
                      <StarIcon className="h-5 w-5" fill="#facc14" />
                      <span className="ml-1">{barber.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="rounded-md border-green-600 bg-green-200/40 px-2.5 py-1 text-green-600/80">
                      <span className="flex items-center justify-center text-green-600">
                        <Banknote className="mr-1.5 h-5 w-5" />${barber.price}
                      </span>
                    </div>
                    <Link href="/our-barbers">
                      <Button
                        variant="outline"
                        size="sm"
                        className="transform bg-primary text-white transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-primary hover:text-white">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}