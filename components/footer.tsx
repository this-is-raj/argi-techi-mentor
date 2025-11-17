"use client";
import { getHeaderFooterData } from "@/lib/db";

interface HeaderFooterData {
  websiteName: string;
  footerDescription: string;
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  website: string;
}

export default async function Footer() {
  const footerData: HeaderFooterData = await getHeaderFooterData();

  if (!footerData) return null;

  return (
    <footer className="bg-foreground text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
          {/* Brand - Show websiteName */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-primary rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                {footerData.websiteName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-white text-xs md:text-base">
                  {footerData.websiteName}
                </h3>
                <p className="text-xs text-white/60">Premium Ag. Products</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed">
              {footerData.footerDescription}
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-sm md:text-lg mb-2 md:mb-4">About</h3>
            <ul className="space-y-1 md:space-y-2 text-white/80 text-xs md:text-sm">
              <li>
                <a href="/about" className="hover:text-white transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  Mission & Vision
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-sm md:text-lg mb-2 md:mb-4">
              Products
            </h3>
            <ul className="space-y-1 md:space-y-2 text-white/80 text-xs md:text-sm">
              <li>
                <a href="#products" className="hover:text-white transition">
                  Spices
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Oil Seeds
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Pulses
                </a>
              </li>
            </ul>
          </div>

          {/* Quality */}
          <div>
            <h3 className="font-bold text-sm md:text-lg mb-2 md:mb-4">
              Quality
            </h3>
            <ul className="space-y-1 md:space-y-2 text-white/80 text-xs md:text-sm">
              <li>
                <a href="/about" className="hover:text-white transition">
                  Certifications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Assurance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Standards
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm md:text-lg mb-2 md:mb-4">
              Get In Touch
            </h3>
            <div className="space-y-1 text-white/80 text-xs md:text-sm">
              <p>{footerData.footerAddress}</p>
              <p className="mt-2 md:mt-3">
                <a
                  href={`tel:${footerData.footerPhone}`}
                  className="hover:text-white transition"
                >
                  {footerData.footerPhone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${footerData.footerEmail}`}
                  className="hover:text-white transition truncate"
                >
                  {footerData.footerEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 md:pt-6 lg:pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm text-white/60">
            <p>&copy; 2025, {footerData.websiteName}. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 lg:gap-6 sm:justify-end">
              <a href="/sitemap" className="hover:text-white transition">
                Sitemap
              </a>
              <a href="#" className="hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
