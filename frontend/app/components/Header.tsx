'use client';
import { Menu, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CartSheet
  from "./cart-sheet";
import { useAuth } from "@/context/auth-context";
export default function Header() {

  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthenticated, user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

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
  className={`bg-gray-300 shadow-md sticky top-0 z-50 ${showNavbar ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300 h-20`}>   
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">

        <div className="flex items-center justify-between py-4">

          <div className="flex items-center gap-3 ">
            <Link href="/">
              <Image
                src="/images/belts/logoo.png"
                alt="AusDog"
                height={112}
                width={200}
                className="h-17 w-auto" />

            </Link>
          </div>

          

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-900 font-medium px-3 py-1 rounded transition-all duration-300 
             hover:text-black hover:border-2 hover:rounded-2xl hover:border-black">HOME</Link>
              <Link href="/about" className="text-gray-900 font-medium px-3 py-1 rounded transition-all duration-300 
             hover:text-black hover:border-2 hover:rounded-2xl hover:border-black">ABOUT US</Link>
              <Link href="/products" className="text-gray-900 font-medium px-3 py-1 rounded transition-all duration-300 
             hover:text-black hover:border-2 hover:rounded-2xl hover:border-black">PRODUCTS</Link>

              <Link href="/contact" className="text-gray-900 font-medium px-3 py-1 rounded transition-all duration-300 
              hover:border-2 hover:rounded-2xl hover:text-black hover:border-black">CONTACT US</Link>


            </nav>

            {/* Right — User + Cart */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative group">
                <button
                  className="flex items-center gap-2 text-gray-900 font-medium px-3 py-2 rounded-lg hover:bg-white/30 transition"
                  aria-label="User menu"
                >
                  <User size={18} />
                  <span className="text-sm">
{mounted && isAuthenticated ? (user?.username ?? "Account") : "Account"}                  </span>
                </button>

                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 overflow-hidden">
                  {!mounted ? null : !isAuthenticated ? (
  <div className="p-2">
    <Link
      href="/login"
      className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
    >
      Login
    </Link>
    <Link
      href="/register"
      className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
    >
      Create account
    </Link>
  </div>
) : (
  <div className="p-2">
    <button
      onClick={logout}
      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
    >
      Logout
    </button>
  </div>
)}
                </div>
              </div>

              <CartSheet />
            </div>


            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          
        </div>
      </div>

      {mobileMenuOpen && (
  <div className="md:hidden absolute left-0 top-full w-full bg-white border-t border-gray-200 shadow-lg animate-slideDown z-40">
    <nav className="flex flex-col px-6 py-5 space-y-4">
      <Link
        href="/"
        className="text-gray-700 hover:text-pink-600 font-medium text-lg"
      >
        Home
      </Link>

      <Link
        href="/products"
        className="text-gray-700 hover:text-pink-600 font-medium text-lg"
      >
        Products
      </Link>

      <Link
        href="/about"
        className="text-gray-700 hover:text-pink-600 font-medium text-lg"
      >
        About Us
      </Link>

      <Link
        href="/contact"
        className="text-gray-700 hover:text-pink-600 font-medium text-lg"
      >
        Contact
      </Link>

      <div className="pt-2 border-t">
        {!isAuthenticated ? (
          <div className="flex gap-3">
            <Link
              href="/login"
              className="flex-1 text-center bg-[#ee6d49] text-white py-2 rounded-lg font-semibold"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="flex-1 text-center border py-2 rounded-lg font-semibold"
            >
              Register
            </Link>
          </div>
        ) : (
          <button
            onClick={logout}
            className="w-full text-left text-gray-700 font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  </div>
)}
    </header>
  );
}
