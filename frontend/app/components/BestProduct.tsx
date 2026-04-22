'use client'
import { useEffect, useRef, useState } from "react";
import { Raleway } from "next/font/google";
const raleway = Raleway({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: '400'
})

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const TARGET_DATE = new Date("2026-03-16T00:00:00");

function getTimeLeft(): TimeLeft {
    const diff = TARGET_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function pad(n: number) {
    return String(n).padStart(2, "0");
}

const BestProduct = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0, hours: 0, minutes: 0, seconds: 0,
    });

    // Intersection observer for scroll trigger
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const update = () => setTimeLeft(getTimeLeft());
        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const items = [
        { label: "Days",  value: String(timeLeft.days) },
        { label: "Hour",  value: String(timeLeft.hours) },
        { label: "Min",   value: pad(timeLeft.minutes) },
        { label: "Sec",   value: pad(timeLeft.seconds) },
    ];

    return (
        <div ref={sectionRef} className='max-w-7xl mx-auto h-[88vh]'>
            {/* ── Heading — fades in from top ── */}
            <div
                className={`mb-10 mt-12 transition-all duration-700 ease-out ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                }`}
            >
                <h1 className={`${pacifico.className} text-2xl italic flex justify-center items-center mb-4`}>
                    Best Product
                </h1>
                <h4 className='font-bold text-4xl flex justify-center items-center mt-4 mb-14'>
                    Deal Of The Week
                </h4>
            </div>

            <div className='grid grid-cols-2'>
                {/* ── Left column — image slides in from left ── */}
                <div
                    className={`mb-10 transition-all duration-700 ease-out delay-200 ${
                        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
                    }`}
                >
                    <img src="/images/products/f13.png" alt="dog image" />
                </div>

                {/* ── Right column — content slides in from right ── */}
                <div
                    className={`mt- transition-all duration-700 ease-out delay-300 ${
                        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
                    }`}
                >
                    <div className='mx-3 position-relative pr-3 pl-3'>
                        <h1 className='text-2xl font-semibold text-gray-500 mb-5'>Racing Dog</h1>
                        <p className='mb-4 text-2xl text-[#7e4c4f]'>$56.20</p>
                        <p className={`${raleway.className} block text-left font-normal text-sm text-[#242424] mb-4`}>
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum is
                            that it has a more-or-less normal distribution.
                        </p>

                        <div className="flex items-center gap-4 text-leftm mt-15">
                            {items.map(({ label, value }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center justify-center w-17 h-20 border border-gray-200 rounded-xl"
                                >
                                    <span className="text-1xl font-light text-gray-800">{value}</span>
                                    <span className="mt-2 w-8 border-t border-gray-300" />
                                    <span className="mt-2 text-sm text-gray-500">{label}</span>
                                </div>
                            ))}
                        </div>

                        <button className="bg-[#ee6d49] hover:bg-[#c93f19] text-white font-bold text-sm tracking-widest px-10 py-4 rounded-full transition-colors duration-200 mt-10">
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestProduct;