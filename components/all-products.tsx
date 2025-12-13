import { Product } from "@/types/product";
import Link from "next/link";
import { ArrowRight, Home, Search, Filter, ArrowLeft } from "lucide-react";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.APP_HOST}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return (await res.json()) as Product[];
  } catch (err) {
    return [];
  }

}

export default async function AllProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-10">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 text-emerald-600">
          <Link
            href="/"
            className="text-emerald-600 font-medium flex items-center gap-1"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium"> Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Page title */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          All Products
        </h1>
        <p className="text-gray-600 text-sm">
          Showing {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="group bg-white rounded-xl shadow hover:shadow-xl border border-gray-100 overflow-hidden transition-all cursor-pointer">
              <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-all"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-4 text-emerald-600 font-medium">
                  Enquire Now
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Back button */}
      <div className="text-center mt-16">
        <Link href="/" className="text-emerald-600 font-medium">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
