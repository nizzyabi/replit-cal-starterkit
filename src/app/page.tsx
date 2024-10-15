import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import { Logo } from "./_components/universal/logo";
import { Twitter, Github, Youtube } from 'lucide-react'
export default async function Home() {
  return (
    <div className='space-y-28'>
      {/* Hero */}
      <section className="bg-white py-20 md:py-40 ">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-x-12">
          {/* Text Section */}
          <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              We're Looking To Make You Look Handsome.
            </h1>
            <p className="opacity-60 text-lg mb-6">
              At our barber shop, our skilled barbers are dedicated to making you
              look your best. With expert haircuts, precise shaves, and grooming
              services, we're here to enhance your handsomeness.
            </p>
            <div className="flex space-x-4">
              <Link href='/our-barbers'>
                <button className="bg-primary text-white px-6 py-2 rounded-md font-semibold bg-primary transition">
                  Book with us
                </button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full">
            <img
              src='/barber.svg' 
              alt="Barber at work"
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </section>
      {/* Barber Images */}
      <section className='text-center'>
        <h1 className="text-5xl font-bold text-gray-900 ">
          Our Barbers
        </h1>
        <p className="opacity-60 text-md">
          Checkout some of our best barbers below
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto mt-5 px-4'>
          <Link href="/our-barbers" className="col-span-1 flex">
            <Card className="mx-auto w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
              <div className="relative">
                <div
                  className={cn(
                    "h-[280px] w-full rounded-t-md transition-all duration-300",
                    
                  )}>
                  <img
                    src={`/barber.svg`}
                    alt='title'
                    className="h-full w-full rounded-t-md object-cover transition-opacity duration-300 ease-in-out"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex">
                  <h3 className="text-xl font-semibold text-white ">
                    John Doe
                  </h3>
                  <h1></h1>
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="mr-1 h-5 w-5 text-yellow-400" fill="#FACC14" />
                      <span className="font-semibold">5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      
                      <span className="text-sm">$20</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/our-barbers" className="col-span-1 flex">
            <Card className="mx-auto w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
              <div className="relative">
                <div
                  className={cn(
                    "h-[280px] w-full rounded-t-md transition-all duration-300",

                  )}>
                  <img
                    src={`/barber.svg`}
                    alt='title'
                    className="h-full w-full rounded-t-md object-cover transition-opacity duration-300 ease-in-out"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex">
                  <h3 className="text-xl font-semibold text-white ">
                    John Doe
                  </h3>
                  <h1></h1>
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="mr-1 h-5 w-5 text-yellow-400" fill="#FACC14" />
                      <span className="font-semibold">5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">

                      <span className="text-sm">$20</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/our-barbers" className="col-span-1 flex">
            <Card className="mx-auto w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
              <div className="relative">
                <div
                  className={cn(
                    "h-[280px] w-full rounded-t-md transition-all duration-300",

                  )}>
                  <img
                    src={`/barber.svg`}
                    alt='title'
                    className="h-full w-full rounded-t-md object-cover transition-opacity duration-300 ease-in-out"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex">
                  <h3 className="text-xl font-semibold text-white ">
                    John Doe
                  </h3>
                  <h1></h1>
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="mr-1 h-5 w-5 text-yellow-400" fill="#FACC14" />
                      <span className="font-semibold">5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">

                      <span className="text-sm">$20</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
      {/* Location */}
      <section className="bg-white py-20 md:py-40 ">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-x-12">
          <div className="lg:w-1/2 w-full">
            <img
              src='/barber.svg' 
              alt="Barber at work"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2 w-full my-8 lg:mb-0">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Location
            </h1>
            <p className="opacity-60 text-lg mb-3">
              201 Broadway, New York, NY 10001
            </p>
            <div className="flex space-x-4">
              <button className="bg-primary text-white px-6 py-2 rounded-md font-semibold bg-primary transition">
                Directions
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer*/}
      <footer className="bg-primary/20 text-white flex justify-between p-12">
        <div>
          <Logo />
        </div>
        <div className='flex space-x-12 text-black'>
          <Twitter className='h-6 w-6'/>
          <Github className='h-6 w-6'/>
          <Youtube className='h-6 w-6'/>
        </div>
      </footer>
    </div>
  );
}
