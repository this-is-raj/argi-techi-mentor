import Link from "next/link";
import { Product } from "@/app/products/[id]/page";
import { ArrowRight } from "lucide-react";

export default async function Products() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_}/api/products`);

  const products = response.ok
    ? (((await response.json()) || []) as Product[])
    : [];

  return (
    <>
      <section id="products" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-primary uppercase tracking-widest text-xs md:text-sm font-semibold mb-2">
              Products
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              BY CATEGORIES
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              We bring you the finest selection over the years with a huge
              customer base worldwide. We offer a wide range of products without
              compromising on quality. We ensure the goodwill and trust of our
              global clients are highly prioritized.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:scale-105 overflow-hidden">
                  {/* Top Half - Product Image */}
                  <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Bottom Half - Product Info */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors">
                        Enquire Now
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Products */}
          <div className="mt-12 md:mt-20 pt-12 md:pt-16 border-t border-border">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center text-foreground px-2">
              Procured from the finest producers...
            </h3>
            <p className="text-center text-muted-foreground mb-8 md:mb-12 uppercase text-xs md:text-sm tracking-widest font-semibold">
              PACKED AND DISPATCHED WITH PERFECTION
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
