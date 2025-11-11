"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getHeroData, getHeaderFooterData } from "@/lib/db"

interface HeroData {
  title: string
  subtitle: string
  cta_text: string
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [websiteName, setWebsiteName] = useState("")

  useEffect(() => {
    let mounted = true

    async function loadData() {
      const data = await getHeroData()
      if (mounted) setHeroData(data)

      const headerData = await getHeaderFooterData()
      if (mounted) setWebsiteName(headerData.websiteName)
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [])

  if (!heroData) return null

  return (
    <section className="bg-linear-to-r from-yellow-50 to-orange-50 py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <p className="text-xs md:text-sm text-primary font-semibold mb-3 md:mb-4">{websiteName}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pretty leading-tight text-foreground">
              {heroData.title}
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">{heroData.subtitle}</p>

            {/* Trust Badges */}
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex gap-3 items-start">
                <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground">Premium Quality</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">Certified and tested products</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground">Global Shipping</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">Fast and reliable worldwide delivery</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground">Certified Products</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">All necessary certifications</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 text-sm md:text-base w-full sm:w-auto">
                {heroData.cta_text} →
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-orange-50 bg-transparent text-sm md:text-base w-full sm:w-auto"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative order-1 md:order-2">
            <div className="bg-gradient-to-br from-orange-900 to-orange-700 rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
              <img
                src="/agricultural-products-spices-vegetables-colorful-d.jpg"
                alt="Premium agricultural products"
                className="w-full h-auto md:h-96 object-cover"
              />
            </div>

            {/* Stats Badges */}
            <div className="absolute top-3 right-3 md:top-6 md:right-6 bg-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-lg">
              <p className="text-lg md:text-2xl font-bold text-primary">50+</p>
              <p className="text-xs md:text-sm text-muted-foreground">Countries</p>
            </div>

            <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 bg-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-lg">
              <p className="text-lg md:text-2xl font-bold text-primary">15+</p>
              <p className="text-xs md:text-sm text-muted-foreground">Years</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
