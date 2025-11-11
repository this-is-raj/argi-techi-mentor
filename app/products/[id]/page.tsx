"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, ShoppingCart, Heart, HelpCircle, Edit, Pen, BookCheckIcon } from "lucide-react"
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

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?id=${productId}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading product details...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link href="/" className="text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-6 md:py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-orange-700 transition">
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Product Details */}
        <section className="max-w-7xl mx-auto px-3 md:px-4 pb-12 md:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto max-h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">{product.name}</h1>

              <p className="text-muted-foreground text-sm uppercase tracking-widest font-semibold mb-6">
                {product.category?.replace("-", " ") || "Premium Product"}
              </p>

              <p className="text-lg text-foreground leading-relaxed mb-8">{product.description}</p>

     
           

              {/* Product Details Sections */}
              <div className="space-y-6">
                {product.details && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Product Details
                    </h3>
                    <p className="text-foreground leading-relaxed">{product.details}</p>
                  </div>
                )}

                {product.benefits && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Benefits
                    </h3>
                    <p className="text-foreground leading-relaxed">{product.benefits}</p>
                  </div>
                )}

                {product.specifications && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Specifications
                    </h3>
                    <p className="text-foreground leading-relaxed">{product.specifications}</p>
                  </div>
                )}
              </div>
                 <div className="flex gap-4 mt-8">
                <button className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition flex items-center justify-center gap-2">
                 
                  <span>Request Quote</span> <BookCheckIcon size={20} />
                </button>
               
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-3 md:px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Placeholder for related products */}
              <Link href="/" className="text-primary hover:underline text-center py-8">
                View all products
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
