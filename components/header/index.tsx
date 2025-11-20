"use client";
export const dynamic = "force-dynamic";
import { Phone, Mail, Globe, Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HeaderData } from "@/types/header";
export default function HeaderComponent() {
  const [openMenu, setOpenMenu] = useState(false);

  const headerData: HeaderData = {
    headerPhone: "+91 9549235277",
    headerEmail: "info@agrotechiementor.com",
    websiteName: "Agro TechieMentor",
    website: "https://agritechiementor.com",
    logo: "/Logo.png",
  };

  return (
    <>
      {/* 🔵 TOP BAR */}
      <div className="bg-primary text-primary-foreground w-full py-2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs md:text-sm">
          {/* LEFT – phone + email */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              <Phone size={14} />
              <span>{headerData.headerPhone}</span>
            </div>

            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span>{headerData.headerEmail}</span>
            </div>
          </div>

          {/* RIGHT – worldwide + WhatsApp */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              <Globe size={14} />
              <span>Exporting Worldwide</span>
            </div>

            {/* WhatsApp Direct Chat */}
            <a
              href="https://wa.me/919549235277"
              target="_blank"
              className="bg-green-500 hover:bg-green-600 p-1.5 rounded-full"
            >
              <img
                src="/whatsappLogo.png"
                alt="WhatsApp"
                className="w-5 h-5 object-contain rounded-full"
              />
            </a>
          </div>
        </div>
      </div>

      {/* 🔥 MAIN NAVBAR – white bar fixed */}
      <nav className="bg-white shadow-md sticky top-[40px] z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* LEFT – LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src={headerData.logo}
              alt="Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
            <span className="font-bold text-lg hidden sm:block">
              {headerData.websiteName}
            </span>
          </Link>

          {/* CENTER MENU – DESKTOP ONLY */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <Link href="#products" className="hover:text-green-600">
              Products
            </Link>
            <Link href="#about" className="hover:text-green-600">
              About Us
            </Link>
            <Link href="#quality" className="hover:text-green-600">
              Quality
            </Link>
            <Link href="#certifications" className="hover:text-green-600">
              Certifications
            </Link>
            <Link href="#harvest-calendar" className="hover:text-green-600">
              Harvest Calendar
            </Link>
            <Link href="#contact" className="hover:text-green-600">
              Contact
            </Link>
          </div>

          {/* RIGHT – MOBILE HAMBURGER */}
          <button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
            <Menu size={28} />
          </button>
        </div>

        {/* MOBILE MENU */}
        {openMenu && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 text-sm font-medium">
            <Link href="/" onClick={() => setOpenMenu(false)}>
              Home
            </Link>
            <Link href="#products" onClick={() => setOpenMenu(false)}>
              Products
            </Link>
            <Link href="/about" onClick={() => setOpenMenu(false)}>
              About Us
            </Link>
            <Link href="#quality" onClick={() => setOpenMenu(false)}>
              Quality
            </Link>
            <Link href="#certifications" onClick={() => setOpenMenu(false)}>
              Certifications
            </Link>
            <Link href="#harvest-calendar" onClick={() => setOpenMenu(false)}>
              Harvest Calendar
            </Link>
            <Link href="#contact" onClick={() => setOpenMenu(false)}>
              Contact
            </Link>
          </div>
        )}
      </nav>

      {/* 🟢 FLOATING WHATSAPP BUTTON – always visible */}
      <a
        href="https://wa.me/919549235277"
        target="_blank"
        className="fixed bottom-5 right-5 bg-green-600 p-3 rounded-full shadow-xl hover:bg-green-700 z-[999]"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </>
  );
}
