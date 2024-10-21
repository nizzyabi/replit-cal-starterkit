import { HomeIcon, MapPin, MenuIcon, Scissors, Store, TicketX } from "lucide-react";
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
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
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 font-medium text-white">
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
        <SheetContent className="flex w-[300px] flex-col justify-between border-none text-white">
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
  )
}