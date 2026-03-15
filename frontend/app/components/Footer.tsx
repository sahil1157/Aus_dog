import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#cbc1c1] text-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 ">
          <div>
            <Image
              src="/images/belts/logo.png"
              alt="Logo Footer"
              className="mb-5"
              height={50}
              width={150}
            />
            <p className="text-white-400 text-sm">
              Mater Trading Company Pvt. Ltd. supplies military, aviation, GSE, and telecom solutions to Nepal&apos;s key institutions.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="https://www.facebook.com/mtchub" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#763721] rounded-full hover:bg-[#763721]transition-colors">
              </Link>
              <Link href="https://www.linkedin.com/in/dipak-regmi-26043253/" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#763721] rounded-full hover:bg-[#763721] transition-colors">
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-2xl">Quick Links</h4>
            <ul className="space-y-2 text-white-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Import/Products</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-2xl">Features</h4>
            <ul className="space-y-2 text-white-400">
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/singapore" className="hover:text-white transition-colors">Singapore 2024</Link></li>
              <li><Link href="/dubai" className="hover:text-white transition-colors">Dubai 2023</Link></li>
              <li><Link href="/airshow" className="hover:text-white transition-colors">AirShow Expo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-2xl">Contact Us</h4>
            <ul className="space-y-3 text-white-400">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+977 9851081958</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>mtchub@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>Nil Saraswati Street, Lazimpat 2, Kathmandu, Nepal 44600</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-3 pt-4 text-center text-white-400 text-sm">
          &copy;  2025 Mater Trading Company Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
