export const Testimonials = () => {

  const barberTestimonials = [
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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  
  return (
    <section
      className="mt-4 text-center"
      >
      <h2 className="text-6xl font-semibold">Testimonials</h2>
      <p className='opacity-60 text-lg mb-12'>See what our clients say about us</p>
      {/* <motion.div
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
      </motion.div> */}
      <div
        className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3"
        
      >
        {barberTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-card rounded-lg border p-6 shadow-sm"
            
          >
            <div className="flex-grow">
              <p className="mb-4 text-lg italic opacity-60">&quot;{testimonial.quote}&quot;</p>
            </div>
            <div className="mt-4 flex items-center">
              <img
                src={testimonial.image}
                alt="Client"
                className="mr-4 h-12 w-12 rounded-lg object-cover"
              />
              <div className="text-left">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


    </section>
  )
}