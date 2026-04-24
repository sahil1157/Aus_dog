"use client";

import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  ArrowUp,
  Send,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for subscribing! We'll send updates to ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 relative">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-[#ff9167] to-[#df6839] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Logo & About */}
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/footerImg2.PNG"
                alt="AusDog Footer Logo"
                width={180}
                height={80}
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left">
              Australia's most trusted destination for premium dog products.
              Every collar ships free — tracked door to door, dispatched within
              24 hrs.
            </p>
            <div className="flex justify-center md:justify-start gap-3 pt-2">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-9 h-9 bg-gray-700 hover:bg-[#ff9167] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook size={16} className="text-white" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-9 h-9 bg-gray-700 hover:bg-[#ff9167] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-9 h-9 bg-gray-700 hover:bg-[#ff9167] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram size={16} className="text-white" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-9 h-9 bg-gray-700 hover:bg-[#ff9167] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={16} className="text-white" />
              </Link>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#ff9167] to-[#df6839] rounded-full"></span>
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Products" },
                { href: "/contact", label: "Contact Us" },
                { href: "/dashboard", label: "Dashboard" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[#ff9167] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#ff9167] transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services/Features */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#ff9167] to-[#df6839] rounded-full"></span>
            </h4>
            <ul className="space-y-2">
              {[
                {
                  icon: <Heart size={14} />,
                  label: "Premium Quality Products",
                },
                { icon: <Clock size={14} />, label: "24/7 Customer Support" },
                { icon: <Send size={14} />, label: "Free Worldwide Shipping" },
                { icon: <Mail size={14} />, label: "30-Day Returns" },
                { icon: <MapPin size={14} />, label: "Vet Approved Products" },
              ].map((service, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-400">
                  <span className="text-[#ff9167]">{service.icon}</span>
                  <span className="text-sm">{service.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact & Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#ff9167] to-[#df6839] rounded-full"></span>
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone
                  size={16}
                  className="text-[#ff9167] mt-0.5 flex-shrink-0"
                />
                <span className="text-sm">+61 2 1234 5678</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail
                  size={16}
                  className="text-[#ff9167] mt-0.5 flex-shrink-0"
                />
                <span className="text-sm break-all">hello@ausdog.com.au</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                <MapPin
                  size={16}
                  className="text-[#ff9167] mt-0.5 flex-shrink-0"
                />
                <span className="text-sm">
                  123 George Street, Sydney NSW 2000, Australia
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-4">
              <h5 className="text-white font-semibold text-sm mb-2">
                Subscribe to our newsletter
              </h5>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#ff9167] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#ff9167] to-[#df6839] text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                Get exclusive offers and pet care tips
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} AusDog. All rights reserved. |
              Designed with{" "}
              <Heart size={12} className="inline text-[#ff9167]" /> for dogs and
              their humans
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 text-xs hover:text-[#ff9167] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 text-xs hover:text-[#ff9167] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/shipping"
                className="text-gray-500 text-xs hover:text-[#ff9167] transition-colors"
              >
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
