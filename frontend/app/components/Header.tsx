"use client";
import { Menu, User, X, LayoutDashboard } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CartSheet from "./cart-sheet";
import { useAuth } from "@/context/auth-context";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-xl border-b border-purple-100"
          : "bg-white/90 backdrop-blur-md shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <Link
              href="/"
              className="hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              <Image
                src="/images/belts/logoo.png"
                alt="AusDog"
                height={112}
                width={200}
                className="h-16 w-auto object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {[
              { href: "/", label: "HOME" },
              { href: "/about", label: "ABOUT US" },
              { href: "/products", label: "PRODUCTS" },
              { href: "/contact", label: "CONTACT US" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-700 font-bold tracking-wide text-sm uppercase px-4 py-2 rounded-xl transition-all duration-300 hover:text-[#ff9167] group overflow-hidden"
              >
                <span className="relative z-10 font-['Poppins',sans-serif] tracking-wider">
                  {item.label}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#ff9167] to-[#df6839] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right — Cart + User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <CartSheet />

            <div className="relative group">
              <button
                className="flex items-center gap-2 text-gray-700 font-semibold px-3 py-2 rounded-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff9167] to-[#df6839] flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                  <User
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm font-semibold font-['Inter',sans-serif] tracking-wide">
                  {mounted && isAuthenticated
                    ? (user?.username ?? "Account")
                    : "Account"}
                </span>
              </button>

              <div className="absolute right-0 mt-3 w-56 bg-white border border-purple-100 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:scale-100 scale-95 z-10 overflow-hidden">
                {!mounted ? null : !isAuthenticated ? (
                  <div className="p-2 space-y-1">
                    <Link
                      href="/login"
                      className="block px-3 py-2 rounded-lg hover:bg-purple-50 text-gray-700 font-medium transition-all duration-300 hover:translate-x-1"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block px-3 py-2 rounded-lg hover:bg-purple-50 text-gray-700 font-medium transition-all duration-300 hover:translate-x-1"
                    >
                      Create account
                    </Link>
                  </div>
                ) : (
                  <div className="p-2 space-y-1">
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 rounded-lg hover:bg-purple-50 text-gray-700 font-medium transition-all duration-300 hover:translate-x-1"
                    >
                      <LayoutDashboard size={16} className="inline mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-medium transition-all duration-300 hover:translate-x-1"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button - Fixed hydration by wrapping in conditional */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-[#ff9167]" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Only render on client after mount to prevent hydration mismatch */}
      {mounted && mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white border-t border-purple-100 shadow-2xl z-40">
          <nav className="flex flex-col px-6 py-5 space-y-3">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#ff9167] font-semibold py-3 px-4 rounded-xl hover:bg-purple-50 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-purple-100">
              {!isAuthenticated ? (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    className="flex-1 text-center bg-gradient-to-r from-[#ff9167] to-[#df6839] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 text-center border-2 border-[#ff9167] text-[#ff9167] py-3 rounded-xl font-bold hover:bg-purple-50 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-center bg-gradient-to-r from-[#ff9167] to-[#df6839] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 mb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard size={16} className="inline mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center text-red-600 font-bold py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}