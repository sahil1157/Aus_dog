// components/PetHeroSection.tsx
import React from "react";
import { motion } from "framer-motion";

export default function PetHeroSection() {
  // Animation variants
  const textVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" as const } },
  };
  const paragraphVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, ease: "easeOut" as const } },
  };
  const buttonsVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5, ease: "easeOut" as const } },
  };
  const imageVariant = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" as const } },
  };
  const rightImageVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" as const } },
  };

  return (
    <section className="relative flex items-center justify-between px-4 md:px-20 py-16 md:py-20 bg-white min-h-[500px] overflow-hidden font-sans">      {/* Left side: Circle background image with blur & overlay */}
      <motion.div
className="relative flex-1 flex items-center justify-start md:justify-center z-10"
        variants={imageVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Circular image container */}
<div className="relative w-[220px] h-[220px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden flex items-center justify-center">          <img
            src="/images/belts/f1.png"
            alt="Person with dog"
            className="absolute inset-0 w-full h-full object-contain filter opacity-40"
          />
          <div className="absolute inset-0 bg-white/60 rounded-full" />
        </div>
      </motion.div>

      {/* Text content in front */}
<div className="relative flex-1 max-w-[60%] md:max-w-lg z-20 text-left">
          <motion.span
          className="text-gray-700 font-semibold mb-3 block text-sm md:text-base"
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Best Quality
        </motion.span>

        <motion.h1
          className="font-extrabold text-4xl md:text-5xl leading-tight mb-5 text-gray-900 drop-shadow-md"
          variants={{ ...textVariant, visible: { ...textVariant.visible, transition: { duration: 1, delay: 0.15, ease: "easeOut" as const } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Nutritional Food <br /> For Your Beloved Pets
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8 text-base md:text-lg max-w-md leading-relaxed"
          variants={paragraphVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Eu nisl nunc mi ipsum faucibus vitae aliquet. Lacus vel facilisis volutpat est velit egestas dui id. Molestie a iaculis at erat pellentesque adipiscing commodo. Adipiscing elit duis tristique sollicitudin. Varius morbi enim nunc faucibus a pellentesque sit.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 items-center"
          variants={buttonsVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <button className="flex items-center gap-3 text-sm font-semibold text-white bg-orange-400 rounded-full px-6 py-3 hover:bg-orange-500 transition">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-orange-400">▶</span>
            WATCH MORE
          </button>
          <button className="text-orange-500 border border-orange-400 rounded-full px-7 py-3 text-sm font-semibold hover:bg-orange-50 transition">
            CLICK HERE
          </button>
        </motion.div>
      </div>

      {/* Right side decorative images (blurred, faded) */}
      <motion.div
        className="hidden md:flex flex-col items-center gap-10 flex-1 relative"
        variants={rightImageVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* <img
          src="/images/belts/f2.png"
          alt="Pet food bag"
          className="w-32 h-32 object-contain opacity-50 filter"
          style={{ transform: "rotate(-15deg)" }}
        /> */}
        <img
          src="/images/belts/f3.png"
          alt="Cat"
          className="w-48 h-48 object-contain opacity-20 filter"
        />
      </motion.div>
    </section>
  );
}