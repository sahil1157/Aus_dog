"use client";

import { useEffect, useRef, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Pet Owner",
    message:
      "The care and compassion shown to my animals has been nothing short of extraordinary. Every visit feels personal and deeply attentive.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "Robiul Islam",
    role: "Customer",
    message:
      "Lorem ipsum dolor sit amet, co adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercita ullamco laboris nisi ut aliquip ex ea commodo",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 3,
    name: "Elena Vasquez",
    role: "Animal Lover",
    message:
      "Finding a place that truly understands what your pets mean to you is rare. This team made me feel like family from day one.",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setMessageVisible(true), 400);
        } else {
          setIsVisible(false);
          setMessageVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAvatarClick = (index: number) => {
    setMessageVisible(false);
    setActiveIndex(index);
    setTimeout(() => setMessageVisible(true), 200);
  };

  const active = testimonials[activeIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Josefin+Sans:wght@300;400&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-josefin   { font-family: 'Josefin Sans', sans-serif; }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full  flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      >
        {/* Left Background Image (Left half) */}
<div
  className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center opacity-30 z-0"
  style={{
    backgroundImage: 'url("/images/image.png")',
    transform: "scaleX(-1)",
  }}
/>

  {/* Right Background Image (Right half) */}
  <div
    className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center opacity-30 z-0"
    style={{ backgroundImage: 'url("/images/image.png")' }}
  />

        {/* Left dark panel */}
        {/* <div className="absolute top-0 left-0 w-[32%] h-full z-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_55%,#2a2a2a_0%,#111_40%,#050505_100%)]" /> */}

        {/* Right dark panel */}
        {/* <div className="absolute top-0 right-0 w-[32%] h-full z-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_55%,#252525_0%,#111_40%,#050505_100%)]" /> */}

        {/* Vignette overlay */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_80%_at_10%_50%,rgba(20,15,10,0.7),transparent_70%),radial-gradient(ellipse_55%_80%_at_90%_50%,rgba(10,15,20,0.7),transparent_70%),radial-gradient(ellipse_40%_60%_at_50%_50%,rgba(5,5,5,0.9),transparent_100%)]" />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center max-w-2xl px-10 py-20 text-center">

          {/* Quote */}
          <p
            className={`font-cormorant italic font-light text-white/90 text-xl leading-[1.85] tracking-wide mb-14 transition-all duration-700 ease-out ${
              messageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
            }`}
          >
            {active.message}
          </p>

          {/* Divider */}
          <div
            className={`flex gap-1.5 mb-11 origin-bottom transition-all duration-500 delay-200 ease-out ${
              isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            }`}
          >
            <span className="block w-px h-9 bg-white/40" />
            <span className="block w-px h-9 bg-white/40" />
          </div>

          {/* Avatars */}
          <div
            className={`flex items-center mb-7 transition-all duration-500 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {testimonials.map((t, i) => {
              const isActive = activeIndex === i;
              const isCenter = i === 1;

              return (
                <div
                  key={t.id}
                  onClick={() => handleAvatarClick(i)}
                  title={t.name}
                  className={[
                    "relative cursor-pointer transition-transform duration-300",
                    isCenter ? "z-[3]" : isActive ? "z-[4]" : "z-[1]",
                    i === 0 ? "-mr-[18px]" : i === 2 ? "-ml-[18px]" : "",
                    isActive ? "scale-110" : "hover:scale-105",
                  ].join(" ")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className={[
                      "rounded-full object-cover border-[2.5px] transition-all duration-300",
                      isCenter ? "w-[88px] h-[88px]" : "w-[68px] h-[68px]",
                      isActive
                        ? "border-white/55 grayscale-0 brightness-100"
                        : "border-white/15 grayscale brightness-75",
                    ].join(" ")}
                  />
                </div>
              );
            })}
          </div>

          {/* Author */}
          <div
            className={`transition-all duration-500 ease-out ${
              messageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <p className="font-josefin font-normal text-[0.95rem] text-white/90 tracking-[0.12em] uppercase mb-1">
              {active.name}
            </p>
            <p className="font-cormorant italic text-[0.9rem] text-white/45 tracking-wide">
              {active.role}
            </p>
          </div>
        </div>

        {/* Scroll-to-top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="absolute bottom-6 right-7 z-20 w-9 h-9 rounded-full bg-[rgba(140,80,80,0.7)] hover:bg-[rgba(160,90,90,0.9)] flex items-center justify-center transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4l-8 8h5v8h6v-8h5z" />
          </svg>
        </button>
      </section>
    </>
  );
}