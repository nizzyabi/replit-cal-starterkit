"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Banknote,
  Calendar,
  HomeIcon,
  Mail,
  MapPin,
  MenuIcon,
  Phone,
  Scissors,
  StarIcon,
  Store,
  TicketX,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#location", label: "Location" },
  { href: "/our-barbers", label: "Barbers", isPrimary: true },
];

const mobileNavItems = [
  { href: "/our-barbers", label: "Home", icon: HomeIcon },
  { href: "#location", label: "Locations", icon: MapPin },
  { href: "#barbers", label: "Barbers", icon: Scissors },
  { href: "#about", label: "About Us", icon: Store },
  { href: "#cuts", label: "Previous Cuts", icon: TicketX },
];

const barbers = [
  { name: "Alex Smith", rating: 4.5, price: 20, image: "/alex.jpg" },
  { name: "Max Hale", rating: 3.9, price: 18, image: "/max.jpg" },
  { name: "Amira Rost", rating: 4.1, price: 16, image: "/amira.jpg" },
  { name: "Lucas Andrews", rating: 4.8, price: 50, image: "/lucas.jpg" },
  { name: "Jane Ame", rating: 3.7, price: 20, image: "/jane.jpg" },
  { name: "John Flamem", rating: 4.8, price: 24, image: "/john.jpg" },
];

const haircuts = [
  {
    name: "Classic Cut",
    description: "A timeless style that never goes out of fashion.",
    image: "/classic.jpg",
  },
  { name: "Fade", description: "A modern, clean look with gradual tapering.", image: "/fade.png" },
  {
    name: "Textured Crop",
    description: "A stylish cut with added texture for a unique look.",
    image: "/textured-crop.jpg",
  },
  {
    name: "Pompadour",
    description: "A classic style with volume and sophistication.",
    image: "/pompadour.webp",
  },
  { name: "Undercut", description: "A bold style with short sides and longer top.", image: "/undercut.webp" },
  { name: "Buzz Cut", description: "A low-maintenance, short all-over style.", image: "/buzzcut.jpg" },
  {
    name: "Crew Cut",
    description: "A military-inspired style with a short and neat finish.",
    image: "/crewcut.webp",
  },
  {
    name: "Caesar Cut",
    description: "A short cut with a horizontal fringe for a bold look.",
    image: "/caesar.jpg",
  },
];

const testimonials = [
  {
    quote: "The best haircut I've ever had! John really knows how to work with my hair type.",
    name: "Michael S.",
    type: "Regular client",
    image: "/michel.webp",
  },
  {
    quote: "I always feel welcome here. The atmosphere is great, and the results are even better!",
    name: "Sarah L.",
    type: "New customer",
    image: "/sarah.jpg",
  },
  {
    quote: "Cal's Barbershop is my go-to place. Professional service and amazing results every time.",
    name: "David R.",
    type: "Loyal customer",
    image: "/david.png",
  },
  {
    quote: "I've been coming here for years, and the quality never disappoints. Highly recommended!",
    name: "Emily T.",
    type: "Long-time client",
    image: "/emily.jpg",
  },
  {
    quote: "The attention to detail is impressive. They really listen to what you want and deliver.",
    name: "Alex M.",
    type: "Satisfied customer",
    image: "/alex.webp",
  },
  {
    quote: "Not just a haircut, but an experience. The staff is friendly and the results are fantastic!",
    name: "Jessica W.",
    type: "Regular visitor",
    image: "/jessica.webp",
  },
];

export default function Home() {
  const statsRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsAnimating(true);
        } else {
          setIsAnimating(false);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isAnimating) {
      animateNumbers();
    }
  }, [isAnimating]);

  const animateNumbers = () => {
    const duration = 2000; // Animation duration in milliseconds
    const stats = [
      { id: "clients", end: 400 },
      { id: "haircuts", end: 900 },
      { id: "years", end: 20 },
    ];

    stats.forEach(({ id, end }) => {
      const element = document.getElementById(id);
      if (element) {
        let start = 0;
        const increment = end / (duration / 16); // 60 FPS

        const timer = setInterval(() => {
          start += increment;
          element.textContent = Math.floor(start) + "+";
          if (start >= end) {
            element.textContent = end + "+";
            clearInterval(timer);
          }
        }, 16);
      }
    });
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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

  return (
    <React.Fragment>
      <div className="bg-black/95">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between bg-black/95 p-4 font-medium text-white">
          <Link href="/our-barbers">
            <h1 className="text-2xl font-bold">Cal&apos;s Barbershop</h1>
          </Link>
          <nav className="hidden items-center justify-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.isPrimary ? "rounded-md bg-primary px-4 py-2 text-white" : ""}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger className="md:hidden">
              <MenuIcon className="h-7 w-7" />
            </SheetTrigger>
            <SheetContent className="flex w-[300px] flex-col justify-between border-none bg-black/95 text-white">
              <div>
                <SheetHeader className="text-left">
                  <h2 className="mt-5 px-4 text-2xl font-bold">Cal&apos;s Barbershop</h2>
                </SheetHeader>
                <nav className="mt-8 text-left">
                  {mobileNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg p-4 text-xl font-medium transition-colors hover:bg-white/10">
                      <item.icon className="h-5 w-5" /> {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="mb-8">
                <Link href="/our-barbers">
                  <Button className="w-full">Book Now</Button>
                </Link>
                <div className="mt-3 text-center opacity-60">
                  are you a barber?{" "}
                  <Link href="/our-barbers" className="underline">
                    click here
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <div className="relative h-screen">
          <img src="/location.jpg" alt="barber" className="h-full w-full object-cover opacity-50" />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}>
            <motion.h1
              className="text-6xl font-bold tracking-wide text-white md:text-8xl"
              variants={heroItemVariants}>
              Cal&apos;s Barbershop
            </motion.h1>
            <motion.p className="mt-4 text-xl font-medium text-white md:text-2xl" variants={heroItemVariants}>
              2203 Sunset Blvd, Los Angeles, CA 90026
            </motion.p>
            <motion.div variants={heroItemVariants}>
              <Button className="mt-4 h-12 w-40 bg-orange-500 text-lg text-white transition-all duration-300 ease-in-out hover:scale-105">
                Book Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <main className="mt-40 space-y-40">
        <motion.section
          className="my-4 text-center"
          ref={statsRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariants}>
          <h2 className="text-6xl font-semibold">Our Barbers</h2>
          <p className='opacity-60 text-lg'>Meet our awesome team of barbers</p>
          <motion.div
            className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-0"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}>
            {barbers.map((barber, index) => (
              <motion.div key={index} className="col-span-1 flex" variants={fadeInUpVariants}>
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
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="mt-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariants}>
          <h2 className=" text-6xl font-semibold">Haircuts</h2>
          <p className='opacity-60 text-lg mb-8'>Checkout some of our most popular harcuts!</p>
          <motion.div
            className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 lg:grid-cols-4"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}>
            {haircuts.map((haircut, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                variants={fadeInUpVariants}
              >
                <img
                  src={haircut.image}
                  alt={haircut.name}
                  className="h-64 w-full object-cover rounded-t-lg bg-gray-100"
                />
                <div className="p-6 bg-white rounded-b-lg space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{haircut.name}</h3>
                  <p className="text-gray-500 text-sm">{haircut.description}</p>
                </div>
              </motion.div>
            ))}


          </motion.div>
        </motion.section>

        <motion.section
          className="mt-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariants}>
          <h2 className="text-6xl font-semibold">Testimonials</h2>
          <p className='opacity-60 text-lg mb-12'>See what our clients say about us</p>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="mx-auto mt-8 flex max-w-7xl flex-wrap justify-center gap-6">
            <motion.div
              className="w-[180px] rounded-lg bg-primary p-6 text-white shadow-md transition-transform hover:scale-105"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}>
              <p id="clients" className="mb-2 text-3xl font-bold">
                0+
              </p>
              <p className="text-sm uppercase tracking-wide">Happy Clients</p>
            </motion.div>
            <motion.div
              className="w-[180px] rounded-lg bg-primary p-6 text-white shadow-md transition-transform hover:scale-105"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}>
              <p id="haircuts" className="mb-2 text-3xl font-bold">
                0+
              </p>
              <p className="text-sm uppercase tracking-wide">Haircuts done</p>
            </motion.div>
            <motion.div
              className="w-[180px] rounded-lg bg-primary p-6 text-white shadow-md transition-transform hover:scale-105"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}>
              <p id="years" className="mb-2 text-3xl font-bold">
                0+
              </p>
              <p className="text-sm uppercase tracking-wide">Years Open</p>
            </motion.div>
          </motion.div>
          <motion.div
            className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} className="rounded-lg border p-6 shadow-sm" variants={fadeInUpVariants}>
                <p className="mb-4 text-lg italic text-gray-600">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center">
                  <img src={testimonial.image} alt="Client" className="mr-4 h-12 w-12 rounded-lg object-cover" />
                  <div className="text-left">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.type}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
        </motion.section>

        <motion.section
          className="px-8 py-12 lg:px-0"
          id="location"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariants}>
          <h2 className="text-center text-6xl font-semibold">Location</h2>
          <p className="opacity-60 text-lg mb-8 text-center">Come get your haircut today!</p>
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <iframe
                width="100%"
                height="400"
                scrolling="no"
                src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=2203%20sunset%20blvd.+(Cal's%20Barbershop)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>

            <div className="mb-6 space-y-8 font-medium md:mb-0 md:w-1/2 md:pl-12">
              <p className="text-4xl font-bold">Cal&apos;s Barbershop</p>
              <div className="mb-4 flex items-center gap-2 text-xl">
                <MapPin className="h-7 w-7" />
                <p>2203 Sunset Blvd, Los Angeles, CA 90026</p>
              </div>
              <div className="flex items-center gap-2 text-xl">
                <Phone className="h-7 w-7" />
                <p>123-456-7890</p>
              </div>
              <div className="flex items-center gap-2 text-xl">
                <Calendar className="h-7 w-7" />
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
              <div className="flex items-center gap-2 text-xl">
                <Mail className="h-7 w-7" />
                <p>info@calbarbershop.com</p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </React.Fragment>
  );
}
