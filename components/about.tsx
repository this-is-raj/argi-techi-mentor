import { getAboutData } from "@/lib/db";
import { AboutData } from "@/types/about";

export default async function About() {
  const aboutData: AboutData = await getAboutData();
  if (!aboutData) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-20">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-gray-900 leading-tight">
            {aboutData.title}
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-5 text-lg leading-relaxed">
            {aboutData.description}
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {aboutData.mission}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {aboutData.vision}
            </p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mt-24 border-t pt-20">
          <h3 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-14">
            Why Choose Us
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏆",
                title: "Quality Assured",
                desc: "100% certified premium products",
              },
              {
                icon: "🌏",
                title: "Global Reach",
                desc: "Exporting to 50+ countries worldwide",
              },
              {
                icon: "📦",
                title: "Fast Delivery",
                desc: "Secure & reliable shipping services",
              },
              {
                icon: "🤝",
                title: "Trusted Partner",
                desc: "Customer-first export experience",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
