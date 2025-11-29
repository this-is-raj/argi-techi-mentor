"use client";
export const dynamic = "force-dynamic";
import {
  Phone,
  Mail,
  Globe,
  Menu,
  MessageCircle,
  X,
  Sprout,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HeaderData } from "@/types/header";

export default function HeaderComponent() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingLoop, setTypingLoop] = useState(0);

  const headerData: HeaderData = {
    headerPhone: "+91 9549235277",
    headerEmail: "info@agrotechiementor.com",
    websiteName: "Agro TechieMentor",
    website: "https://agritechiementor.com",
    logo: "/Logo.png",
  };

  const typingMessages = [
    "Premium Farm Fresh Potatoes & Onions",
    "Global Export Standards • Trusted Since 2010",
    "Fresh Vegetables Direct from Farms",
    "Quality Certified Agricultural Products",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentMessage = typingMessages[typingLoop];

    if (typingIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setTypingText(currentMessage.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypingIndex(0);
        setTypingLoop((typingLoop + 1) % typingMessages.length);
        setTypingText("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, typingLoop]);

  return (
    <>
      {/* Premium Agricultural Top Bar */}
      {/* <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 text-white py-2 px-4 text-sm border-b border-green-600">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 bg-green-900/30 px-2 py-1 rounded-lg border border-green-600/30">
                <Sprout className="w-3 h-3 text-green-300" />
                <span className="text-green-200 text-xs font-semibold">
                  LIVE
                </span>
              </div>
              <div className="min-h-[20px] flex items-center">
                <span className="text-green-100 font-medium">
                  {typingText}
                  <span className="ml-0.5 animate-pulse">|</span>
                </span>
              </div>
            </div>

           
            <div className="flex items-center gap-4 text-xs">
              <div className="hidden sm:flex items-center gap-1">
                <Truck className="w-3 h-3 text-green-300" />
                <span className="text-green-200">Global Export</span>
              </div>
              <div className="hidden md:flex items-center gap-1">
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                <span className="text-green-100">ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Navigation */}
      <nav
        className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled ? "shadow-lg py-1 border-gray-200" : "py-3 border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Premium Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur-sm group-hover:blur-md transition-all duration-300 opacity-70"></div>
                <img
                  src={headerData.logo}
                  alt="Agro TechieMentor Logo"
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  Agro TechieMentor
                </span>
                <span className="text-xs text-gray-500 font-medium mt-[-2px] flex items-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Growing Excellence Since 2010
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { href: "/", label: "Home" },
                { href: "#products", label: "Products" },
                { href: "#about", label: "About" },
                { href: "#quality", label: "Quality" },
                { href: "#certifications", label: "Certifications" },
                { href: "#harvest-calendar", label: "Harvest" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-green-50 transition-colors duration-200 border border-gray-200"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {openMenu && (
            <div className="lg:hidden bg-white/95 backdrop-blur-md border border-gray-200 mt-3 py-4 rounded-xl shadow-2xl animate-fadeIn">
              <div className="flex flex-col space-y-1 px-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "#products", label: "Products" },
                  { href: "#about", label: "About Us" },
                  { href: "#quality", label: "Quality" },
                  { href: "#certifications", label: "Certifications" },
                  { href: "#harvest-calendar", label: "Harvest Calendar" },
                  { href: "#contact", label: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpenMenu(false)}
                    className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 border-l-3 border-transparent hover:border-green-500 hover:pl-5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Contact Info */}
              <div className="mt-4 pt-4 border-t border-gray-200 px-4 space-y-3">
                <a
                  href={`tel:${headerData.headerPhone}`}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <div className="p-1.5 bg-green-100 rounded-lg">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">{headerData.headerPhone}</span>
                </a>
                <a
                  href={`mailto:${headerData.headerEmail}`}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <div className="p-1.5 bg-green-100 rounded-lg">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">{headerData.headerEmail}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Premium WhatsApp Button */}
      <a
        href="https://wa.me/919549235277"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-2xl shadow-2xl hover:shadow-3xl z-[999] group transition-all duration-300 hover:scale-110 border border-green-500"
        aria-label="Contact on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-white" />
          <div className="absolute -top-10 -left-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg border border-gray-700">
            🚀 Export Enquiry
            <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
      </a>
    </>
  );
}
