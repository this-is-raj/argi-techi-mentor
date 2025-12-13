"use client";

import { useState, useEffect } from "react";
import { getHeaderFooterData } from "@/lib/db";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Shield,
  Leaf,
  Truck,
  CheckCircle,
  ArrowUpRight,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

interface HeaderFooterData {
  websiteName: string;
  footerDescription: string;
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  website: string;
}

export default function Footer() {
  const [footerData, setFooterData] = useState<HeaderFooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHeaderFooterData();
        setFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
        setFooterData({
          websiteName: "Agro TechieMentor",
          footerDescription:
            "Leading exporter of premium agricultural products from India to global markets. Quality assured, globally trusted.",
          footerAddress:
            "E-9/508 Chitrakoot, Jaipur, Rajasthan, India - 302021",
          footerPhone: "+91 9549235277",
          footerEmail: "techiementor.co@gmail.com",
          website: "www.agritechimentor.com",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <footer className="bg-white border-t border-gray-200 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-3 text-sm text-gray-500">Loading footer...</p>
          </div>
        </div>
      </footer>
    );
  }

  const safeData = footerData || {
    websiteName: "Agro TechieMentor",
    footerDescription:
      "Leading exporter of premium agricultural products from India to global markets. Quality assured, globally trusted.",
    footerAddress: "E-9/508 Chitrakoot, Jaipur, Rajasthan, India - 302021",
    footerPhone: "+91 9549235277",
    footerEmail: "techiementor.co@gmail.com",
    website: "www.agritechimentor.com",
  };

  const quickLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/#about" },
        { name: "Our Story", href: "/#about" },
        { name: "Mission & Vision", href: "/#about" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "Spices", href: "/#products" },
        { name: "Oil Seeds", href: "/#products" },
        { name: "Pulses", href: "/#products" },
        { name: "Grains", href: "/#products" },
        { name: "All Products", href: "/#products" },
      ],
    },
    {
      title: "Quality",
      links: [
        { name: "Certifications", href: "/#certifications" },
        { name: "Quality Assurance", href: "/#quality" },
        { name: "Export Standards", href: "/#quality" },
        { name: "Testing Process", href: "/#quality" },
        { name: "Compliance", href: "/#certifications" },
      ],
    },
  ];

  const qualityBadges = [
    { icon: <Shield className="w-4 h-4" />, text: "ISO Certified" },
    { icon: <Leaf className="w-4 h-4" />, text: "100% Organic" },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Quality Assured" },
    { icon: <Truck className="w-4 h-4" />, text: "Global Shipping" },
  ];

  const phoneNumber = "919549235277";
  const emailAddress = "techiementor.co@gmail.com";

  const socialLinks = [
    {
      icon: <PhoneCall className="w-5 h-5" />,
      href: `tel:${phoneNumber}`,
      label: "Phone",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: `mailto:${emailAddress}`,
      label: "Email",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      href: `https://wa.me/${phoneNumber}`,
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {safeData.websiteName}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
              {safeData.footerDescription}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {qualityBadges.map((badge, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700"
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {quickLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-green-600 transition-colors text-sm flex items-center gap-1 group"
                        >
                          {link.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 mb-12">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Phone
              </h4>
              <a
                href={`tel:${safeData.footerPhone}`}
                className="text-gray-600 hover:text-green-600 text-sm"
              >
                {safeData.footerPhone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Email
              </h4>
              <a
                href={`mailto:${safeData.footerEmail}`}
                className="text-gray-600 hover:text-green-600 text-sm break-all"
              >
                {safeData.footerEmail}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Address
              </h4>
              <p className="text-gray-600 text-sm">{safeData.footerAddress}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Website
              </h4>
              <a
                href={`https://${safeData.website}`}
                className="text-gray-600 hover:text-green-600 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {safeData.website}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-500 text-sm">
                © {currentYear} {safeData.websiteName}. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Proudly serving global markets from India
              </p>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 flex items-center justify-center transition-all hover:scale-105"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <a
                href="/privacy-policy"
                className="text-gray-500 hover:text-gray-900"
              >
                Privacy Policy
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="/terms-conditions"
                className="text-gray-500 hover:text-gray-900"
              >
                Terms & Conditions
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-xs">
              Registered with FSSAI, APEDA, and other regulatory authorities
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">Made in</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                🇮🇳 India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
      >
        ↑
      </button>
    </footer>
  );
}
