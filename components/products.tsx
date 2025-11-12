import Link from "next/link";
import { Product } from "@/app/products/[id]/page";

export default async function Products() {
  const response = await fetch(`${process.env.APP_HOST}/api/products`);

  const products = response.ok
    ? (((await response.json()) || []) as Product[])
    : [];

  const featured = [
    { name: "Cardamom", icon: "🫘" },
    { name: "Turmeric", icon: "🧡" },
    { name: "Rice", icon: "🍚" },
    { name: "Chilies", icon: "🌶️" },
    { name: "Cumin Seeds", icon: "🟤" },
  ];

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
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                      {product.name}
                    </h3>
                    <p className="text-white/90 text-xs md:text-sm line-clamp-2">
                      {product.description}
                    </p>
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

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {featured.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 md:p-6 text-center hover:from-primary/20 hover:to-primary/10 transition group cursor-pointer"
                >
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition transform">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-foreground text-sm md:text-base">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
