import { getAboutData } from "@/lib/db";
import { AboutData } from "@/types/about";
import Image from "next/image";

export default async function About() {
  const aboutData: AboutData | null = await getAboutData();
  if (!aboutData) return null;

  // Updated features with green theme
  const defaultFeatures = [
    {
      icon: "/AboutUsImage/QualityAssured.jpg",
      title: "Quality Assured",
      description: "100% certified premium products",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: "/AboutUsImage/Global-Reach.jpg",
      title: "Global Reach",
      description: "Exporting to 50+ countries worldwide",
      color: "text-green-700",
      bgColor: "bg-green-50",
    },
    {
      icon: "/AboutUsImage/FastDelivery.jpeg",
      title: "Fast Delivery",
      description: "Secure & reliable shipping services",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: "/AboutUsImage/Trusted-partner.jpg",
      title: "Trusted Partner",
      description: "Customer-first export experience",
      color: "text-green-700",
      bgColor: "bg-green-50",
    },
  ];

  const features = aboutData.features || defaultFeatures;
  const stats = aboutData.stats || {
    countries: 10,
    clients: 45,
    experience: 5,
    support: "24/7",
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-green-600 font-semibold uppercase tracking-widest text-sm">
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900 leading-tight">
            {aboutData.title}
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            {aboutData.description}
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="relative w-7 h-7">
                  <Image
                    src="/AboutUsImage/Mission.jpeg"
                    alt="Mission"
                    width={90}
                    height={90}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {aboutData.mission}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="relative w-7 h-7">
                  <Image
                    src="/AboutUsImage/Vision.png"
                    alt="Vision"
                    width={90}
                    height={90}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {aboutData.vision}
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16">
          <h3 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Why Choose Us
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 ${item.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={90}
                      height={90}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description || ""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-green-50 rounded-xl p-10 shadow-sm border border-green-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-green-700">
                {stats.countries}+
              </div>
              <div className="text-gray-700 font-medium">Countries Served</div>
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-green-700">
                {stats.clients}+
              </div>
              <div className="text-gray-700 font-medium">Happy Clients</div>
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-green-700">
                {stats.experience}+
              </div>
              <div className="text-gray-700 font-medium">Years Experience</div>
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-green-700">
                {stats.support}
              </div>
              <div className="text-gray-700 font-medium">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
