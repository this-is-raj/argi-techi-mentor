import {
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Star,
  Globe,
  Shield,
  Award,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed scale-105 animate-zoomInOut"
        style={{
          backgroundImage:
            "url('/agricultural-products-spices-vegetables-colorful-d.jpg')",
        }}
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-emerald-900/40 to-orange-600/30 animate-gradientShift" />

      {/* Floating Particles Animation - Reduced on Mobile */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-green-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center w-full max-w-4xl">
          <div className="inline-flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 animate-fadeInUp">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
            <span className="text-white text-xs sm:text-sm font-medium">
              Trusted by 50+ Countries
            </span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            <span className="block animate-typing overflow-hidden whitespace-nowrap border-r-2 sm:border-r-4 border-r-white pr-1">
              Premium Indian
            </span>
            <span className="block bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent animate-gradientText mt-2 sm:mt-4">
              Spices & Agro Products
            </span>
          </h1>

          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light animate-fadeInUp animation-delay-300 leading-relaxed">
              Certified Quality Exporter Since 2022
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base text-gray-300 animate-fadeInUp animation-delay-500">
              <div className="flex items-center gap-1 bg-white/5 rounded-full px-2 sm:px-3 py-1">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 rounded-full px-2 sm:px-3 py-1">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                <span>HACCP</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 rounded-full px-2 sm:px-3 py-1">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span>Organic</span>
              </div>
            </div>
          </div>

          {/* Buttons - Stack on Mobile */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fadeInUp animation-delay-700">
            <Link href="#products" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm sm:text-lg py-4 sm:py-7 px-6 sm:px-10 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold border-2 border-green-500/30 flex items-center justify-center gap-2">
                Explore Our Products
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link
              href="https://wa.me/919549235277"
              target="_blank"
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm sm:text-lg py-4 sm:py-7 px-6 sm:px-10 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold border-2 border-orange-400/30 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>WhatsApp Quote</span>
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Grid Layout for All Screens */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-12 animate-fadeInUp animation-delay-1000">
            {[
              { icon: Award, label: "Quality", value: "100%" },
              { icon: Globe, label: "Countries", value: "50+" },
              { icon: Star, label: "Clients", value: "500+" },
              { icon: CheckCircle, label: "Products", value: "100+" },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300 p-2 sm:p-0"
              >
                <div className="flex justify-center mb-1 sm:mb-2">
                  <div className="p-1 sm:p-2 bg-white/10 rounded-full group-hover:bg-green-500/20 transition-colors">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" />
                  </div>
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">
                  {item.value}
                </div>
                <div className="text-[10px] xs:text-xs text-gray-300 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Contact Info - Mobile Optimized */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 animate-fadeInRight">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-2xl p-2 sm:p-4 shadow-lg sm:shadow-2xl">
          <div className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-3 hover:text-green-300 transition-colors cursor-pointer group">
              <div className="p-1 sm:p-2 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              </div>
              <span className="group-hover:underline font-medium whitespace-nowrap">
                +91 95492 35277
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 hover:text-orange-300 transition-colors cursor-pointer group">
              <div className="p-1 sm:p-2 bg-orange-500/20 rounded-full group-hover:bg-orange-500/30 transition-colors">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
              </div>
              <span className="group-hover:underline font-medium whitespace-nowrap text-xs sm:text-sm">
                info@agritechmentor.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Badges - Mobile Optimized */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 animate-fadeInLeft">
        <div className="flex flex-col gap-2 sm:gap-3">
          {[
            { icon: Award, text: "ISO", color: "text-blue-400" },
            { icon: Shield, text: "HACCP", color: "text-green-400" },
            { icon: CheckCircle, text: "Organic", color: "text-emerald-400" },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 sm:px-3 py-1 sm:py-2 animate-fadeInLeft"
              style={{ animationDelay: `${1200 + index * 200}ms` }}
            >
              <badge.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${badge.color}`} />
              <span className="text-white text-xs font-medium hidden xs:inline">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/70 mt-1 sm:mt-2 animate-pulse" />
        </div>
      </div>

      {/* Mobile Bottom Bar for Important Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-md border-t border-white/20 sm:hidden">
        <div className="flex justify-around items-center p-3">
          <Link
            href="tel:+919549235277"
            className="flex flex-col items-center gap-1 text-white"
          >
            <Phone className="w-5 h-5 text-green-400" />
            <span className="text-xs">Call</span>
          </Link>
          <Link
            href="https://wa.me/919549235277"
            className="flex flex-col items-center gap-1 text-white"
          >
            <MessageCircle className="w-5 h-5 text-green-400" />
            <span className="text-xs">WhatsApp</span>
          </Link>
          <Link
            href="mailto:info@agritechmentor.com"
            className="flex flex-col items-center gap-1 text-white"
          >
            <Mail className="w-5 h-5 text-orange-400" />
            <span className="text-xs">Email</span>
          </Link>
          <Link
            href="#products"
            className="flex flex-col items-center gap-1 text-white"
          >
            <Award className="w-5 h-5 text-green-400" />
            <span className="text-xs">Products</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
