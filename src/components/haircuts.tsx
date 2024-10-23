import { motion } from "framer-motion";

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

export const Haircuts = () => {

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  
  return (
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
            className="overflow-hidden rounded-lg shadow-lg bg-card hover:shadow-xl transition-shadow duration-300 ease-in-out border"
            variants={fadeInUpVariants}
          >
            <img
              src={haircut.image}
              alt={haircut.name}
              className="h-64 w-full object-cover rounded-t-lg bg-gray-100"
            />
            <div className="p-6 rounded-b-lg space-y-2">
              <h3 className="text-xl font-semibold">{haircut.name}</h3>
              <p className="opacity-40 text-sm">{haircut.description}</p>
            </div>
          </motion.div>
        ))}


      </motion.div>
    </motion.section>
  )
}