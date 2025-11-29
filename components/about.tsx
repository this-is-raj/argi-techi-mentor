import { getAboutData } from "@/lib/db";
import { AboutData } from "@/types/about";
import Image from "next/image";

export default async function About() {
  const aboutData: AboutData = await getAboutData();
  if (!aboutData) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
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
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="relative w-8 h-8">
                  <Image
                    src="/AboutUsImage/Mission.jpeg"
                    alt="Mission"
                    width={90}
                    height={90}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 ">Our Mission</h3>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {aboutData.mission}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/AboutUsImage/Vision.png"
                    alt="Vision"
                    width={90}
                    height={90}
                    className="w-full h-full object-cover"
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
        <div className="mt-16">
          <h3 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-14">
            Why Choose Us
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "/AboutUsImage/QualityAssured.jpg",
                title: "Quality Assured",
                desc: "100% certified premium products",
                color: "text-orange-500",
                bgColor: "bg-orange-500/10",
              },
              {
                icon: "/AboutUsImage/Global-Reach.jpg",
                title: "Global Reach",
                desc: "Exporting to 50+ countries worldwide",
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
              },
              {
                icon: "/AboutUsImage/FastDelivery.jpeg",
                title: "Fast Delivery",
                desc: "Secure & reliable shipping services",
                color: "text-green-500",
                bgColor: "bg-green-500/10",
              },
              {
                icon: "/AboutUsImage/Trusted-partner.jpg",
                title: "Trusted Partner",
                desc: "Customer-first export experience",
                color: "text-purple-500",
                bgColor: "bg-purple-500/10",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`w-20 h-20 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={90}
                      height={90}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
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

        <div className="mt-20 bg-primary rounded-2xl p-10 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10+</div>
              <div className="text-green-100">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">45+</div>
              <div className="text-green-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">5+</div>
              <div className="text-green-100">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
