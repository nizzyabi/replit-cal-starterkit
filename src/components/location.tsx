
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export const Location = () => {

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  
  return (
    <section
      className="px-8 py-12 lg:px-0"
      id="location">
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
    </section>
  )
}