import { getAboutData } from "@/lib/db";

interface AboutData {
  title: string;
  description: string;
  mission: string;
  vision: string;
}

export default async function About() {
  const aboutData: AboutData | null = await getAboutData().catch((err) => {
    console.error("Failed to load about data:", err);
    return null;
  });

  if (!aboutData) return null;

  return (
    <section
      id="about"
      className="py-12 md:py-20 bg-linear-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 md:mb-4">
            About Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground text-pretty">
            {aboutData.title}
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {aboutData.description}
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 md:p-8 border-l-4 border-primary">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-10 md:w-12 h-10 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl md:text-2xl">🎯</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Our Mission
              </h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {aboutData.mission}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 md:p-8 border-l-4 border-primary">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-10 md:w-12 h-10 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl md:text-2xl">🌍</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Our Vision
              </h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {aboutData.vision}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-border">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
            Why Choose Us
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: "✓",
                title: "Quality Assured",
                desc: "100% certified products",
              },
              {
                icon: "🌏",
                title: "Global Reach",
                desc: "Export to 50+ countries",
              },
              {
                icon: "📦",
                title: "Fast Delivery",
                desc: "Reliable shipping services",
              },
              {
                icon: "🤝",
                title: "Customer First",
                desc: "Dedicated support team",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-foreground text-sm md:text-base mb-1 md:mb-2">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-xs md:text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
