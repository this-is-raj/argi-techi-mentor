export const dynamic = "force-dynamic";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getAboutData } from "@/lib/db";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { AboutData } from "@/types/about";
export default async function AboutPage() {
  const aboutData: AboutData | null = await getAboutData();

  if (!aboutData) return null;

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {aboutData.title}
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Learn about our journey and commitment to excellence
          </p>
          <Link
            href="/"
            className="inline-block mt-6 bg-white text-orange-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-grow py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <Card className="p-8 mb-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {aboutData.description}
            </p>
          </Card>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-orange-50 border-2 border-orange-200 shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-orange-600 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {aboutData.mission}
              </p>
            </Card>

            <Card className="p-8 bg-blue-50 border-2 border-blue-200 shadow-lg">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {aboutData.vision}
              </p>
            </Card>
          </div>

          {/* Values Section */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">✅</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  Quality
                </h4>
                <p className="text-gray-600">
                  Premium products that meet international standards
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">🌱</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  Sustainability
                </h4>
                <p className="text-gray-600">
                  Environmentally responsible agricultural practices
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  Integrity
                </h4>
                <p className="text-gray-600">
                  Honest and transparent dealings with all partners
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
