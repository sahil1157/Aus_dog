"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  Heart,
  Shield,
  Star,
  Truck,
  Users,
  Award,
  Leaf,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Simple inView hook without ref access issues
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold },
    );
    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, inView]);
  return { ref, inView };
}

const stats = [
  { value: "10K+", label: "Happy Dogs" },
  { value: "500+", label: "Products" },
  { value: "98%", label: "Satisfaction" },
  { value: "5★", label: "Avg Rating" },
];

const missions = [
  {
    icon: Heart,
    title: "We Put Dogs First",
    desc: "Every product we carry is tested for safety, comfort, and tail-wagging approval.",
    color: "from-rose-400 to-pink-500",
    bg: "bg-rose-50",
  },
  {
    icon: Shield,
    title: "Safety Above All",
    desc: "All our products meet Australian safety standards with non-toxic, durable materials.",
    color: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50",
  },
  {
    icon: Leaf,
    title: "Sustainable Choices",
    desc: "From eco-friendly packaging to sustainably sourced materials, we care for our planet.",
    color: "from-green-400 to-emerald-500",
    bg: "bg-green-50",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Built by dog lovers, for dog lovers. Over 10,000 Australian pet owners shape our decisions.",
    color: "from-purple-400 to-violet-500",
    bg: "bg-purple-50",
  },
  {
    icon: Truck,
    title: "Fast & Reliable",
    desc: "Same-day dispatch on orders before 2pm, free shipping across Australia over $60.",
    color: "from-orange-400 to-amber-500",
    bg: "bg-orange-50",
  },
  {
    icon: Award,
    title: "Expert Curation",
    desc: "Our team includes certified animal behaviourists and vets who review every product.",
    color: "from-[#ff9167] to-[#df6839]",
    bg: "bg-orange-50",
  },
];

const values = [
  {
    icon: Zap,
    label: "Innovation",
    desc: "Always finding better ways to serve you and your dog.",
  },
  {
    icon: Heart,
    label: "Compassion",
    desc: "Every animal deserves love, care, and the best products.",
  },
  {
    icon: Star,
    label: "Excellence",
    desc: "We never settle — quality is non-negotiable.",
  },
  {
    icon: Shield,
    label: "Trust",
    desc: "Transparent, honest, and always accountable.",
  },
];

// Auto Slider Component for Mission Cards - No Play/Pause button
type Mission = {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  bg: string;
};

function MissionSlider({ missions }: { missions: Mission[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(missions.length / itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play logic - always on
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  // Pause on hover, resume on leave
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  // Get current visible items
  const getVisibleItems = () => {
    const start = currentIndex * itemsPerPage;
    return missions.slice(start, start + itemsPerPage);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
        {getVisibleItems().map((m, i) => (
          <div
            key={m.title}
            className={`${m.bg} rounded-3xl p-7 border border-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fade-in`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
            >
              <m.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-extrabold text-gray-800 text-xl mb-3">
              {m.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Navigation Controls - Only arrows and dots */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-[#ff9167]" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 h-2 bg-[#ff9167]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-[#ff9167]" />
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default function AboutPage() {
  // Using simple state instead of useInView for components
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isValuesVisible, setIsValuesVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObserver = (
      ref: React.RefObject<HTMLDivElement>,
      setter: (val: boolean) => void,
    ) => {
      if (!ref.current) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setter(true);
        },
        { threshold: 0.15 },
      );
      observer.observe(ref.current);
      return observer;
    };

    const heroObs = createObserver(heroRef, setIsHeroVisible);
    const introObs = createObserver(introRef, setIsIntroVisible);
    const statsObs = createObserver(statsRef, setIsStatsVisible);
    const valuesObs = createObserver(valuesRef, setIsValuesVisible);
    const ctaObs = createObserver(ctaRef, setIsCtaVisible);

    return () => {
      heroObs?.disconnect();
      introObs?.disconnect();
      statsObs?.disconnect();
      valuesObs?.disconnect();
      ctaObs?.disconnect();
    };
  }, []);

  return (
    <div
      className="overflow-x-hidden"
      style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
        .playfair { font-family: 'Playfair Display', serif; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .float { animation: float 4s ease-in-out infinite; }
        .float-delay { animation: float 4s ease-in-out infinite; animation-delay: 1.5s; }
        .shimmer-text {
          background: linear-gradient(90deg, #ff9167, #df6839, #ff9167);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* ── HERO ── */}
      <div
        className="relative py-36 bg-[#1E2A3A] overflow-hidden"
        style={{
          backgroundImage: "url('/images/image copy.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A3A]/70 via-[#1E2A3A]/50 to-[#1E2A3A]/80" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#ff9167]/20 rounded-full blur-3xl float" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#df6839]/20 rounded-full blur-3xl float-delay" />

        <div
          ref={heroRef}
          className={`relative max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${
            isHeroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-[#ff9167]/20 border border-[#ff9167]/40 text-[#ff9167] rounded-full text-sm font-bold mb-6 tracking-widest uppercase">
            Our Story
          </span>
          <h1 className="playfair text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            About <span className="shimmer-text">AusDog</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Australia's most trusted destination for premium dog products —
            built by pet lovers, for pet lovers.
          </p>
          <div className="mt-10 w-24 h-1 bg-gradient-to-r from-[#ff9167] to-[#df6839] mx-auto rounded-full" />
        </div>
      </div>

      {/* ── INTRO SECTION ── */}
      <div className="bg-[#fff8f5] py-24 px-4">
        <div
          ref={introRef}
          className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
            isIntroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#ff9167]/20 to-[#df6839]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/about.png"
                alt="Happy dogs"
                width={600}
                height={500}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-5 left-5 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff9167] to-[#df6839] rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" fill="white" />
                </div>
                <div>
                  <p className="font-extrabold text-gray-800 text-sm">
                    10,000+
                  </p>
                  <p className="text-xs text-gray-500">Happy Pups</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-block px-4 py-1 bg-[#ff9167]/10 text-[#ff9167] rounded-full text-sm font-bold uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="playfair text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Australia's #1 <br />
              <span className="shimmer-text">Dog Store</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              AusDog was born from a simple belief — every dog deserves the
              best. Founded in Melbourne by a group of passionate dog owners, we
              set out to create a store that we'd actually want to shop at
              ourselves.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              From premium collars and harnesses to gourmet treats and cosy
              beds, every item in our store is hand-picked by our team of animal
              experts.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, we're proud to serve over 10,000 Australian families and
              counting. No matter how big we grow, our mission stays the same:
              happy dogs, happy owners.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white border border-orange-100 rounded-xl px-4 py-2 shadow-sm">
                <Star className="w-4 h-4 text-[#ff9167]" fill="#ff9167" />
                <span className="font-bold text-sm text-gray-700">
                  5-Star Rated
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-orange-100 rounded-xl px-4 py-2 shadow-sm">
                <Shield className="w-4 h-4 text-[#ff9167]" />
                <span className="font-bold text-sm text-gray-700">
                  Vet Approved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="bg-gradient-to-r from-[#ff9167] to-[#df6839] py-16 px-4">
        <div
          ref={statsRef}
          className={`max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
            isStatsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-5xl font-extrabold text-white playfair">
                {s.value}
              </p>
              <p className="text-white/80 font-semibold mt-1 uppercase tracking-widest text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MISSION & VISION with AUTO SLIDER ── */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#ff9167]/10 text-[#ff9167] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              What Drives Us
            </span>
            <h2 className="playfair text-4xl md:text-5xl font-bold text-gray-800">
              Our Mission & Vision
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Six pillars that guide every decision we make at AusDog.
            </p>
          </div>

          <MissionSlider missions={missions} />
        </div>
      </div>

      {/* ── VALUES ── */}
      <div className="bg-[#fff8f5] py-24 px-4">
        <div
          ref={valuesRef}
          className={`max-w-7xl mx-auto transition-all duration-1000 ${
            isValuesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#ff9167]/10 text-[#ff9167] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              Core Values
            </span>
            <h2 className="playfair text-4xl md:text-5xl font-bold text-gray-800">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.label}
                className="bg-white rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-orange-50 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff9167] to-[#df6839] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <v.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="playfair text-xl font-bold text-gray-800 mb-2">
                  {v.label}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-gradient-to-br from-[#1E2A3A] to-[#2d3e52] py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#ff9167]/10 rounded-full blur-3xl float" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#df6839]/10 rounded-full blur-3xl float-delay" />
        <div
          ref={ctaRef}
          className={`relative max-w-3xl mx-auto text-center transition-all duration-1000 ${
            isCtaVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Spoil <span className="shimmer-text">Your Dog?</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Browse over 500 premium products handpicked by our experts. Your pup
            deserves the best — and we're here to deliver it.
          </p>
          <Link
            href="/products"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#ff9167] to-[#df6839] text-white font-extrabold rounded-2xl shadow-2xl hover:shadow-[#ff9167]/40 hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
