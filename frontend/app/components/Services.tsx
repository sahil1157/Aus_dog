"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  FaTruck,
  FaMedal,
  FaHeadset,
  FaShieldAlt,
  FaPaw,
  FaDog,
  FaHeart,
} from "react-icons/fa";
import { MdOutlineLoop } from "react-icons/md";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ───────── Types ───────── */
interface Service {
  icon: React.ReactNode;
  tag: string;
  title: string;
  desc: string;
  accent: string;
  lightAccent: string;
  delay: string;
}

interface Post {
  image: string;
  author: string;
  date: string;
  title: string;
  category: string;
  delay: string;
}

/* ───────── Extended Services Data (8 cards for better sliding) ───────── */
const services: Service[] = [
  {
    icon: <FaTruck className="w-8 h-8" />,
    tag: "No extra charges",
    title: "Free Worldwide Shipping",
    desc: "Every collar ships free — tracked door to door, dispatched within 24 hrs.",
    accent: "#b5651d",
    lightAccent: "#fdf3e7",
    delay: "delay-0",
  },
  {
    icon: <FaMedal className="w-8 h-8" />,
    tag: "Crafted to last",
    title: "Premium Quality",
    desc: "Hand-stitched genuine leather. Each collar passes a 30-point quality check.",
    accent: "#5a7a3a",
    lightAccent: "#f2f8ec",
    delay: "delay-100",
  },
  {
    icon: <FaHeadset className="w-8 h-8" />,
    tag: "Always available",
    title: "24/7 Pet Support",
    desc: "Our dog-loving team is on call around the clock for sizing, care, and fit advice.",
    accent: "#2e6da4",
    lightAccent: "#edf4fb",
    delay: "delay-200",
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    tag: "Secure checkout",
    title: "100% Safe Payment",
    desc: "SSL encrypted transactions — your data and payment info are always protected.",
    accent: "#8B5CF6",
    lightAccent: "#f3e8ff",
    delay: "delay-300",
  },
  {
    icon: <FaPaw className="w-8 h-8" />,
    tag: "Vet approved",
    title: "Animal Behaviorist Tested",
    desc: "Every product is reviewed by certified animal behaviorists for safety and comfort.",
    accent: "#EC4899",
    lightAccent: "#fce7f3",
    delay: "delay-400",
  },
  {
    icon: <FaDog className="w-8 h-8" />,
    tag: "Happy pups",
    title: "30-Day Wag Guarantee",
    desc: "Not satisfied? Return within 30 days for a full refund — no questions asked.",
    accent: "#06B6D4",
    lightAccent: "#cffafe",
    delay: "delay-500",
  },
  {
    icon: <FaHeart className="w-8 h-8" />,
    tag: "Eco friendly",
    title: "Sustainable Materials",
    desc: "We use recycled and biodegradable materials in our packaging and products.",
    accent: "#10B981",
    lightAccent: "#d1fae5",
    delay: "delay-600",
  },
  {
    icon: <MdOutlineLoop className="w-8 h-8" />,
    tag: "Easy returns",
    title: "365-Day Warranty",
    desc: "All products come with a full year warranty against manufacturing defects.",
    accent: "#F59E0B",
    lightAccent: "#fef3c7",
    delay: "delay-700",
  },
];

const posts: Post[] = [
  {
    image: "/images/belts/f1.png",
    author: "Babu Bista",
    date: "Aug 11, 2024",
    title: "How to Choose the Right Collar for Your Dog",
    category: "Guide",
    delay: "delay-0",
  },
  {
    image: "/images/belts/f2.png",
    author: "Ram Bista",
    date: "Aug 11, 2024",
    title: "Leather vs Nylon: Which Collar Is Best?",
    category: "Tips",
    delay: "delay-150",
  },
  {
    image: "/images/belts/f3.png",
    author: "Baburam Bista",
    date: "Aug 11, 2024",
    title: "Top 5 Signs Your Dog Needs a New Collar",
    category: "Care",
    delay: "delay-300",
  },
];

/* ───────── Auto Scroll Slider Component (No Play/Pause) ───────── */
function AutoScrollSlider({ services }: { services: Service[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive items per page: 4 on desktop, 2 on tablet, 1 on mobile
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  // Update items per page on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  // Pause on hover, resume on leave
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(nextSlide, 4000);
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
    intervalRef.current = setInterval(nextSlide, 4000);
  };

  // Get current visible items
  const getVisibleItems = () => {
    const start = currentIndex * itemsPerPage;
    return services.slice(start, start + itemsPerPage);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-500`}
      >
        {getVisibleItems().map((s, i) => (
          <ServiceCard key={s.title} s={s} inView={true} index={i} />
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
    </div>
  );
}

/* ───────── Service Card with animation ───────── */
function ServiceCard({
  s,
  inView,
  index,
}: {
  s: Service;
  inView: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-start gap-5 p-6 rounded-2xl border cursor-default overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        background: hovered ? s.lightAccent : "#fff",
        borderColor: hovered ? s.accent + "44" : "#e5e7eb",
        transform: hovered ? "translateY(-5px)" : undefined,
        boxShadow: hovered
          ? `0 16px 48px -8px ${s.accent}28`
          : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Accent bar */}
      <div
        className="absolute left-0 top-0 w-1 rounded-r-full transition-all duration-400"
        style={{
          height: hovered ? "100%" : "0%",
          background: s.accent,
        }}
      />

      {/* Icon box */}
      <div
        className="shrink-0 flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-400"
        style={{
          color: s.accent,
          background: hovered ? s.accent + "20" : s.lightAccent,
          transform: hovered
            ? "rotate(-6deg) scale(1.12)"
            : "rotate(0deg) scale(1)",
        }}
      >
        {s.icon}
      </div>

      {/* Text */}
      <div>
        <span
          className="inline-block text-[10px] font-semibold tracking-widest uppercase mb-1 px-2 py-0.5 rounded-full transition-colors duration-300"
          style={{
            color: s.accent,
            background: s.accent + "15",
          }}
        >
          {s.tag}
        </span>
        <h3
          className="text-sm font-bold tracking-wide mb-1 transition-colors duration-300"
          style={{ color: hovered ? s.accent : "#1f1f1f" }}
        >
          {s.title}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
      </div>
    </div>
  );
}

/* ───────── Blog Card ───────── */
function BlogCard({ p, inView }: { p: Post; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-700 ${
        inView
          ? `opacity-100 translate-y-0 ${p.delay}`
          : "opacity-0 translate-y-10"
      }`}
      style={{
        transform: hovered ? "translateY(-6px)" : undefined,
        boxShadow: hovered
          ? "0 24px 60px -12px rgba(0,0,0,0.16)"
          : "0 1px 4px rgba(0,0,0,0.06)",
        transition:
          "transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, opacity 0.7s ease",
      }}
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-contain"
          style={{
            transform: hovered ? "scale(1.09)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)",
            backgroundSize: "200% 100%",
            backgroundPosition: hovered ? "110% 0" : "-110% 0",
            transition: "background-position 0.75s ease",
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.36)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <span
            className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase border border-white/60 px-5 py-2 rounded-full backdrop-blur-sm"
            style={{
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            Read Article
          </span>
        </div>
        <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-[#ff9167] text-white px-3 py-1 rounded-full">
          {p.category}
        </span>
      </div>
      <div className="p-5 bg-gray-50/80">
        <p className="text-[11px] text-gray-400 mb-2 tracking-wide">
          By {p.author} &nbsp;·&nbsp; {p.date}
        </p>
        <h4
          className="text-base font-semibold leading-snug transition-colors duration-300"
          style={{ color: hovered ? "#7a4f52" : "#1a1a1a" }}
        >
          {p.title}
        </h4>
        <div
          className="mt-3 h-[2px] rounded-full transition-all duration-500"
          style={{ width: hovered ? "44px" : "0px", background: "#7a4f52" }}
        />
      </div>
    </div>
  );
}

/* ───────── Intersection Hook ───────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ───────── Main Export ───────── */
export default function ServicesBlog() {
  const [svcRef, svcInView] = useInView();
  const [blogRef, blogInView] = useInView();

  return (
    <div className="bg-white px-6 py-20 max-w-7xl mx-auto space-y-24">
      {/* ── Services with Auto Scroll Slider ── */}
      <div ref={svcRef}>
        <div
          className={`text-center mb-10 transition-all duration-700 ${svcInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#b5651d] mb-2">
            Why shop with us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything Your Dog Deserves
          </h2>
          <p className="text-gray-500 mt-2">
            Discover what makes AusDog the trusted choice for pet parents
          </p>
        </div>
        <AutoScrollSlider services={services} />
      </div>

      {/* ── Blog ── */}
      <div ref={blogRef}>
        <div
          className={`text-center mb-12 transition-all duration-700 ${blogInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#7a4f52] mb-2">
            Latest News
          </p>
          <h2 className="text-4xl font-bold text-gray-900">From Our Blog</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.map((p) => (
            <BlogCard key={p.title} p={p} inView={blogInView} />
          ))}
        </div>
      </div>
    </div>
  );
}
