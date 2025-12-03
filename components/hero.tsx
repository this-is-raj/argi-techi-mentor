"use client";

import {
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Star,
  Globe,
  Award,
  ChevronDown,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroData {
  liveLabel: string;
  typewriterText: string;
  headingMain: string;
  headingGradient: string;
  description: string;
  highlightText: string;
  cta_text: string;
  image: string;
}

export default function Hero() {
  const [data, setData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/hero");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const heroData = await response.json();
        setData(heroData);
      } catch (err) {
        console.error("Error fetching hero data:", err);
        setData({
          liveLabel: "LIVE",
          typewriterText:
            "Export Quality Guaranteed • Farm Fresh • Global Shipping",
          headingMain: "Premium Agricultural",
          headingGradient: "Products & Exports",
          description: "Direct from farms to global markets with",
          highlightText: "100% quality assurance",
          cta_text: "Explore Our Products",
          image: "/agricultural-products-spices-vegetables-colorful-d.jpg",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (isLoading) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-green-900 to-emerald-800">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Hero Section...</p>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-105"
        style={{
          backgroundImage: `url('${data.image}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/60 to-green-700/40 backdrop-blur-[1px]" />

      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center w-full max-w-4xl">
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 mb-6 animate-fadeInUp 
    max-w-full overflow-hidden"
          >
            <div className="flex items-center gap-1 bg-green-600/20 px-2 py-0.5 rounded-lg border border-green-400/30 shrink-0">
              <Sprout className="w-3 h-3 text-green-300" />
              <span className="text-green-200 text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                {data.liveLabel}
              </span>
            </div>

            <span
              className="text-white text-xs sm:text-sm md:text-base font-medium loop-typewriter 
      truncate max-w-[150px] sm:max-w-[220px] md:max-w-none"
            >
              {data.typewriterText}
            </span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block animate-fadeInUp">{data.headingMain}</span>
            <span className="block bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent mt-4 animate-gradientText">
              {data.headingGradient}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-300">
            {data.description}{" "}
            <span className="text-green-300 font-semibold">
              {data.highlightText}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-500">
            <Link href="#products" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-base sm:text-lg py-6 sm:py-7 px-8 sm:px-12 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold border-2 border-green-500/30 flex items-center justify-center gap-3 group">
                <span>{data.cta_text}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link
              href="https://wa.me/919549235277"
              target="_blank"
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-base sm:text-lg py-6 sm:py-7 px-8 sm:px-12 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold border-2 border-white/20 flex items-center justify-center gap-3 group">
                <MessageCircle className="w-5 h-5" />
                <span>Export Enquiry</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 animate-fadeInUp animation-delay-700">
            {[
              {
                icon: Award,
                label: "Quality Certified",
                value: "100%",
                color: "text-green-400",
              },
              {
                icon: Globe,
                label: "Export Countries",
                value: "10+",
                color: "text-blue-400",
              },
              {
                icon: Star,
                label: "Happy Clients",
                value: "45+",
                color: "text-yellow-400",
              },
              {
                icon: CheckCircle,
                label: "Farm Products",
                value: "20+",
                color: "text-emerald-400",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-400/30"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-white/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {item.value}
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wider font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fadeInUp animation-delay-900">
            {[
              "Farm Fresh Quality",
              "Global Shipping",
              "ISO Certified",
              "Best Prices",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"
              >
                <span className="text-green-400 text-sm">✓</span>
                <span className="text-white text-sm font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/90 backdrop-blur-md border-t border-green-500/20 sm:hidden">
        <div className="flex justify-around items-center p-3">
          {[
            {
              icon: Phone,
              label: "Call",
              href: "tel:+919549235277",
              color: "text-green-400",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              href: "https://wa.me/919549235277",
              color: "text-green-400",
            },
            {
              icon: Mail,
              label: "Email",
              href: "mailto:info@agrotechiementor.com",
              color: "text-green-400",
            },
            {
              icon: Award,
              label: "Products",
              href: "#products",
              color: "text-green-400",
            },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col items-center gap-1 text-white group"
            >
              <div className="p-2 bg-green-600/20 rounded-lg group-hover:bg-green-600/30 transition-colors">
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
