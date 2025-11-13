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
} from "lucide-react";
import Head from "next/head";
import About from "@/components/about";
import Contact from "@/components/contact";
import { redirect } from "next/navigation";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  botanicalName: string;
  form: string;
  packaging: string;
  origin: string;
  gallery: string[];
  specifications: Record<string, string>;
  description: string;
  benefits: string;
  details: string;
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_HOST}/api/products?id=${id}`
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

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center px-4 pb-10">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-80 md:h-[420px] object-cover rounded-2xl shadow-md mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {product?.name?.toUpperCase()}
          </h1>
          <p className="text-lg text-gray-600 font-medium mt-2">
            {product?.subtitle}
          </p>

          <button className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition">
            Request Quote <BookCheckIcon size={20} />
          </button>
        </section>

        {/* Product Summary */}

        <section className="bg-gray-50 py-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              PRODUCT SUMMARY
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white rounded-xl p-6 shadow-sm">
              {/* Botanical Name */}
              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition">
                <div className="bg-green-100 p-3 rounded-full">
                  <FlaskConical className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Botanical Name
                  </p>
                  <p className="font-semibold text-gray-900">
                    {product?.botanicalName}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Leaf className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Form</p>
                  <p className="font-semibold text-gray-900">{product?.form}</p>
                </div>
              </div>

              {/* Packaging */}
              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Package className="text-yellow-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Packaging</p>
                  <p className="font-semibold text-gray-900">
                    {product?.packaging}
                  </p>
                </div>
              </div>

              {/* Origin */}
              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition">
                <div className="bg-red-100 p-3 rounded-full">
                  <MapPin className="text-red-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Origin</p>
                  <p className="font-semibold text-gray-900">
                    {product?.origin}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Product Gallery */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              PRODUCT GALLERY
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {product?.gallery?.map((img: string, index: number) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-sm"
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

        {/* Specifications */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              SPECIFICATIONS
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg shadow-sm bg-white">
                <tbody>
                  {Object.entries({ ...product?.specifications }).map(
                    ([key, value], index) => (
                      <tr
                        key={index}
                        className={`border-b border-gray-100 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="py-3 px-4 font-semibold text-gray-700">
                          {key}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
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
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
