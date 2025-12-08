import Link from "next/link";
import { Product } from "@/types/product";
import { ArrowRight } from "lucide-react";

async function getSectionContent() {
  try {
    const response = await fetch(
      `${process.env.APP_HOST}/api/section-content`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch section content");
    }

    const data = await response.json();
    return data.productsSection;
  } catch (error) {
    return {
      title: "BY CATEGORIES",
      description:
        "We bring you the finest selection over the years with a huge customer base worldwide. We offer a wide range of products without compromising on quality. We ensure the goodwill and trust of our global clients are highly prioritized.",
    };
  }
}

export default async function Products() {
  const [productsResponse, sectionContent] = await Promise.all([
    fetch(`${process.env.APP_HOST}/api/products`),
    getSectionContent(),
  ]);

  const products = productsResponse.ok
    ? (((await productsResponse.json()) || []) as Product[])
    : [];

  // Show only first 4 products on home page
  const displayedProducts = products.slice(0, 4);
  const hasMoreProducts = products.length > 4;

  return (
    <section
      id="products"
      className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-green-500"></div>
            <span className="text-sm font-semibold tracking-wider text-emerald-600 uppercase">
              Our Collection
            </span>
            <div className="w-12 h-[2px] bg-gradient-to-r from-green-500 to-emerald-500"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            {sectionContent.title}
            <span className="block text-3xl md:text-4xl font-normal mt-2 text-emerald-600">
              Premium Selection
            </span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {sectionContent.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          {displayedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-100/0 to-emerald-50/0 group-hover:from-emerald-50/30 group-hover:via-emerald-100/20 group-hover:to-emerald-50/30 transition-all duration-700"></div>

                <div className="relative h-64 bg-gradient-to-br from-white to-emerald-50 flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100/20 to-transparent"></div>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-600/10 border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                      <span className="text-xs font-medium text-emerald-700">
                        Premium
                      </span>
                    </span>
                  </div>
                </div>

                <div className="relative p-6 bg-white">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      Explore Details
                    </span>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 group-hover:from-emerald-100 group-hover:to-green-100 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMoreProducts && (
          <div className="text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

              <Link
                href="/all-products"
                className="relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-full hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl border border-emerald-500/20"
              >
                Explore Full Collection
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            <div className="mt-8 flex justify-center items-center gap-4">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="text-sm text-gray-500 font-medium">
                Discover Excellence
              </span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute left-0 right-0 -z-10">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-green-100/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
