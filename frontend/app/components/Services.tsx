"use client";

import { useEffect, useRef, useState } from "react";
import { FaTruck, FaMedal, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { MdOutlineLoop } from "react-icons/md";

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

/* ───────── Data ───────── */
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
        title: "24 / 7 Pet Support",
        desc: "Our dog-loving team is on call around the clock for sizing, care, and fit advice.",
        accent: "#2e6da4",
        lightAccent: "#edf4fb",
        delay: "delay-200",
    },

];

const posts: Post[] = [
    {
        image: "/images/image.png",
        author: "Marten Admin",
        date: "Aug 11, 2024",
        title: "How to Choose the Right Collar for Your Dog",
        category: "Guide",
        delay: "delay-0",
    },
    {
        image: "/images/image.png",
        author: "Marten Admin",
        date: "Aug 11, 2024",
        title: "Leather vs Nylon: Which Collar Is Best?",
        category: "Tips",
        delay: "delay-150",
    },
    {
        image: "/images/image.png",
        author: "Marten Admin",
        date: "Aug 11, 2024",
        title: "Top 5 Signs Your Dog Needs a New Collar",
        category: "Care",
        delay: "delay-300",
    },
];

/* ───────── Intersection Hook ───────── */
function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);
    return [ref, inView] as const;
}

/* ───────── Service Card ───────── */
function ServiceCard({ s, inView }: { s: Service; inView: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={[
                "relative flex items-start gap-5 p-6 rounded-2xl border cursor-default overflow-hidden",
                "transition-all duration-700 ease-out",
                inView ? `opacity-100 translate-y-0 ${s.delay}` : "opacity-0 translate-y-10",
            ].join(" ")}
            style={{
                background: hovered ? s.lightAccent : "#fff",
                borderColor: hovered ? s.accent + "44" : "#e5e7eb",
                transform: hovered ? "translateY(-5px)" : undefined,
                boxShadow: hovered ? `0 16px 48px -8px ${s.accent}28` : "0 1px 4px rgba(0,0,0,0.06)",
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
                    transform: hovered ? "rotate(-6deg) scale(1.12)" : "rotate(0deg) scale(1)",
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
            className={[
                "rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-700",
                inView ? `opacity-100 translate-y-0 ${p.delay}` : "opacity-0 translate-y-10",
            ].join(" ")}
            style={{
                transform: hovered ? "translateY(-6px)" : undefined,
                boxShadow: hovered ? "0 24px 60px -12px rgba(0,0,0,0.16)" : "0 1px 4px rgba(0,0,0,0.06)",
                transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, opacity 0.7s ease",
            }}
        >
            {/* Image */}
            <div className="relative overflow-hidden h-52">
                <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    style={{
                        transform: hovered ? "scale(1.09)" : "scale(1)",
                        transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                    }}
                />

                {/* Shimmer */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)",
                        backgroundSize: "200% 100%",
                        backgroundPosition: hovered ? "110% 0" : "-110% 0",
                        transition: "background-position 0.75s ease",
                    }}
                />

                {/* Dark overlay + CTA */}
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

                {/* Category pill */}
                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-[#7a4f52] text-white px-3 py-1 rounded-full">
                    {p.category}
                </span>
            </div>

            {/* Content */}
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

/* ───────── Main Export ───────── */
export default function ServicesBlog() {
    const [svcRef, svcInView] = useInView();
    const [blogRef, blogInView] = useInView();

    return (
        <div className="bg-white px-6 py-20 max-w-6xl mx-auto space-y-24">

            {/* ── Blog ── */}
            <div ref={blogRef}>
                <div className={`text-center mb-12 transition-all duration-700 ${blogInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#7a4f52] mb-2">Latest News</p>
                    <h2 className="text-4xl font-bold text-gray-900">From Our Blog</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                    {posts.map((p) => (
                        <BlogCard key={p.title} p={p} inView={blogInView} />
                    ))}
                </div>
            </div>

            {/* ── Services ── */}
            <div ref={svcRef} className="h-[40vh] mt-40">
                {/* Section header */}
                <div className={`text-center mb-10 transition-all duration-700 ${svcInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#b5651d] mb-2">Why shop with us</p>
                    <h2 className="text-3xl font-bold text-gray-900">Everything Your Dog Deserves</h2>
                </div>

                {/* 2-col grid, last card centred on odd rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((s) => (
                        <ServiceCard key={s.title} s={s} inView={svcInView} />
                    ))}
                </div>
            </div>

            

        </div>
    );
}