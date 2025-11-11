"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  image: string
  details?: string
  benefits?: string
  specifications?: string
  category?: string
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const featured = [
    { name: "Cardamom", icon: "🫘" },
    { name: "Turmeric", icon: "🧡" },
    { name: "Rice", icon: "🍚" },
    { name: "Chilies", icon: "🌶️" },
    { name: "Cumin Seeds", icon: "🟤" },
  ]

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <section id="products" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary uppercase tracking-widest text-xs md:text-sm font-semibold mb-2">Products</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">BY CATEGORIES</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            We bring you the finest selection over the years with a huge customer base worldwide. We offer a wide range
            of products without compromising on quality. We ensure the goodwill and the trust of our global clients is
            highly prioritized.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {loading ? (
            <div className="col-span-full text-center py-8">Loading products...</div>
          ) : (
            products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{product.name}</h3>
                  <p className="text-white/90 text-xs md:text-sm line-clamp-2">{product.description}</p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Featured Products */}
        <div className="mt-12 md:mt-20 pt-12 md:pt-16 border-t border-border">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center text-foreground px-2">
            Procured from the finest producers...
          </h3>
          <p className="text-center text-muted-foreground mb-8 md:mb-12 uppercase text-xs md:text-sm tracking-widest font-semibold">
            PACKED AND DISPATCHED WITH PERFECTION
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {featured.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 md:p-6 text-center hover:from-primary/20 hover:to-primary/10 transition group cursor-pointer"
              >
                <div className="text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition transform">
                  {item.icon}
                </div>
                <p className="font-semibold text-foreground text-sm md:text-base">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal - kept for quick preview when clicked */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-border px-4 md:px-6 py-3 md:py-4 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">{selectedProduct.name}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-full h-48 md:h-64 object-cover rounded-xl"
              />

              <div className="space-y-3 md:space-y-4">
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Description
                  </h3>
                  <p className="text-foreground text-sm md:text-base leading-relaxed">{selectedProduct.description}</p>
                </div>

                {selectedProduct.details && (
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Product Details
                    </h3>
                    <p className="text-foreground text-sm md:text-base leading-relaxed">{selectedProduct.details}</p>
                  </div>
                )}

                {selectedProduct.benefits && (
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Benefits
                    </h3>
                    <p className="text-foreground text-sm md:text-base leading-relaxed">{selectedProduct.benefits}</p>
                  </div>
                )}

                {selectedProduct.specifications && (
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Specifications
                    </h3>
                    <p className="text-foreground text-sm md:text-base leading-relaxed">
                      {selectedProduct.specifications}
                    </p>
                  </div>
                )}
              </div>

              <Link
                href={`/products/${selectedProduct.id}`}
                className="block w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-orange-700 transition text-sm md:text-base text-center"
              >
                View Full Details
              </Link>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-secondary text-foreground py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
