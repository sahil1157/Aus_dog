'use client'
import Feature from "./Feature"
import { useEffect, useRef, useState } from "react"
import { motion , Variants} from "framer-motion"
import ProductSlider from "./ProductSlider"
import TestimonialSection from "./TestimonialSection"
import BestProduct from "./BestProduct"
import Services from "./Services"

const slides = [
  {
    tag: "Yummy & Tasty",
    title: "We Make The Best Food",
    desc: "Sedquis nis eleentum rhncus sit amet in nisi.",
    img: "/images/image.png"
  },
  {
    tag: "Fresh & Healthy",
    title: "Natural Meals For Your Dog",
    desc: "Premium grain-free recipes packed with real meat.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/1200px-YellowLabradorLooking_new.jpg"
  },
  {
    tag: "Pure & Organic",
    title: "Treats They Can't Resist",
    desc: "Hand-crafted treats your pet will love.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Cats-compressed.jpg/800px-Collage_of_Nine_Cats-compressed.jpg"
  }
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const nextSlide = () => setCurrent((current + 1) % slides.length)
  const slide = slides[current]

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    // Make the canvas full width and height of its parent
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight

    // Create 5+ bubbles
    const bubbles = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 1,  // horizontal speed
      dy: (Math.random() - 0.5) * 1,  // vertical speed
      r: 50,     // radius
    }))

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach((b) => {
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.2)"
        ctx.fill()

        // Move bubble
        b.x += b.dx
        b.y += b.dy

        // Bounce on edges
        if (b.x < b.r || b.x > canvas.width - b.r) b.dx *= -1
        if (b.y < b.r || b.y > canvas.height - b.r) b.dy *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <>
    
    <section className="relative bg-[#ff9e77] min-h-160 flex items-center px-6 md:px-16 overflow-hidden">

      {/* Canvas Bubble */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-70"
      />

      {/* Hero Text */}
      <motion.div
        className="max-w-lg text-white z-10 space-y-3 md:space-y-5"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3, // each child animates 0.3s after the previous
            }
          }
        }}
      >
        {/* Tag */}
        <motion.p
          className="text-sm font-medium opacity-90"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
          }}
        >
          {slide.tag}
        </motion.p>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
          }}
        >
          {slide.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base opacity-95"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
          }}
        >
          {slide.desc}
        </motion.p>

        {/* Button */}
        <motion.button
          className="bg-black px-6 py-3 rounded-full text-white font-semibold hover:scale-105 transition-transform"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
          }}
        >
          SHOP NOW
        </motion.button>
      </motion.div>
      <div
        className="absolute right-8 md:right-30 top-32 md:top-8 w-110 h-130 shadow-2xl overflow-hidden z-20"
        style={{
          background: '#F58A6B',
          clipPath: 'inset(10% round 50%)'
        }}
      >
        <div className="w-full h-full p-12 flex items-center justify-center">
          <img
            src={slide.img}
            className="max-w-full max-h-full object-contain drop-shadow-2xl"
            alt={slide.title}
          />
        </div>
      </div>


      {/* Vertical Dots */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full border border-white transition-transform duration-200 ${i === current ? "bg-white scale-125" : "scale-100"
              }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute bottom-1 left-4 md:left-16 font-semibold flex items-center gap-2 hover:text-gray-800 transition-colors z-20"
      >
        NEXT →
      </button>

      {/* Curved Waves */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 200"     //viewBox = "min-x min-y width height" 
      >
        <path
    fill="#fff"
    d="
      M0,160 
      C180,40 360, 240 540,120 
      C720,0 900,220,1080,100 
      C1260,-20 1440,180 1440,160 
      L1440,200 
      L0,200 
      Z
    "
  />
  </svg>
    </section>
    <section>
      <Feature />
    </section>
    <section className="max-w-7xl mx-auto py-16">
        <h2 className="text-5xl text-gray-700 font-bold mb-8 text-center">
          Featured Products
        </h2>

        <ProductSlider />

      </section>

      <section>
        <BestProduct /> 
      </section>

      <section>
        <TestimonialSection />
      </section>

      <section>
        <Services />
      </section>

    </>
  )
}