export const dynamic = "force-dynamic";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import {
  ArrowLeft,
  BookCheckIcon,
  FlaskConical,
  Leaf,
  MapPin,
  Package,
  ZoomIn,
} from "lucide-react";
import Head from "next/head";
import Contact from "@/components/contact";
import { redirect } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.APP_HOST}/api/products?id=${id}`
  ).catch(() => ({ ok: false } as any));

  const product = response.ok ? await response.json() : null;

  if (!product) redirect("/");

  return (
    <>
      <Head>
        <title>
          {product?.metaTitle
            ? product.metaTitle
            : "Premium Agricultural Products | Agritech"}
        </title>
        <meta
          name="description"
          content={
            product?.metaDescription ||
            "Explore premium-quality agricultural exports including spices, pulses, and grains — sourced from India's trusted farms and delivered worldwide."
          }
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={product?.metaTitle || "Agritech Products"}
        />
        <meta
          property="og:description"
          content={product?.metaDescription || "Premium agricultural exports"}
        />
        <meta
          property="og:image"
          content={product?.image || "/default-og-image.jpg"}
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-orange-700 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-80 md:h-96 object-contain p-4 hover:scale-105 transition-transform duration-300"
                />
                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2 backdrop-blur-sm">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {product?.gallery && product.gallery.length > 0 && (
                <div className="px-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    More Views
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.gallery.map((img: string, index: number) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-20 h-20 border-2 border-gray-200 rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product?.name}
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  {product?.subtitle}
                </p>
              </div>

              {/* Product Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Botanical Name */}
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FlaskConical className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Botanical Name
                    </p>
                    <p className="font-semibold text-gray-900">
                      {product?.botanicalName || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Leaf className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Form</p>
                    <p className="font-semibold text-gray-900">
                      {product?.form || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Packaging */}
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Package className="text-yellow-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Packaging
                    </p>
                    <p className="font-semibold text-gray-900">
                      {product?.packaging || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Origin */}
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="bg-red-100 p-3 rounded-full">
                    <MapPin className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Origin</p>
                    <p className="font-semibold text-gray-900">
                      {product?.origin || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product?.description && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Product Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        {product?.specifications &&
          Object.keys(product.specifications).length > 0 && (
            <section className="bg-gray-50 py-12 mt-8">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  TECHNICAL SPECIFICATIONS
                </h2>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(
                        ([key, value], index) => (
                          <tr
                            key={index}
                            className={`border-b border-gray-100 ${
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-100 transition-colors`}
                          >
                            <td className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                              {key}
                            </td>
                            <td className="py-4 px-6 text-gray-600">
                              {value as string}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

        {/* Additional Gallery Section for More Images */}
        {product?.gallery && product.gallery.length > 0 && (
          <section className="py-12">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                PRODUCT GALLERY
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {product.gallery.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition"
                  >
                    <img
                      src={img}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Contact />
      </main>
      <Footer />
    </>
  );
}
