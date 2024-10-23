import Link from 'next/link';

export const Footer = () => {
  return (
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
          <p>Event-ts</p>
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
  )
}