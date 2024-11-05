import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 text-center">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-6 lg:mb-0">
            <h2 className="text-xl font-bold mb-2">Cal's Barbershop</h2>
            <p className="text-sm opacity-60">All rights reserved.</p>
          </div>

          {/* Locations */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-3">Locations</h2>
            <nav className="flex flex-col gap-2">
              {['Texas', 'California', 'New York', 'London', 'Paris', 'Tokyo'].map((location) => (
                <Link 
                  key={location} 
                  href="/" 
                  className="text-sm opacity-60 hover:opacity-100 transition-all hover:scale-105"
                >
                  {location}
                </Link>
              ))}
            </nav>
          </div>

          {/* Events */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-3">Events</h2>
            <nav className="flex flex-col gap-2">
              {['Bookings', 'Events', 'Barbers'].map((item) => (
                <Link 
                  key={item} 
                  href="/" 
                  className="text-sm opacity-60 hover:opacity-100 transition-all hover:scale-105"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-3">Contact</h2>
            <nav className="flex flex-col gap-2">
              {['Phone', 'Email', 'Message'].map((item) => (
                <Link 
                  key={item} 
                  href="/" 
                  className="text-sm opacity-60 hover:opacity-100 transition-all hover:scale-105"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-3">Socials</h2>
            <nav className="flex flex-col gap-2">
              {['Youtube', 'Instagram', 'Facebook', 'X'].map((social) => (
                <Link 
                  key={social} 
                  href="/" 
                  className="text-sm opacity-60 hover:opacity-100 transition-all hover:scale-105"
                >
                  {social}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright line */}
        <div className="mt-12 text-center text-sm opacity-60">
          <p>© 2024 Cal's Barbershop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};