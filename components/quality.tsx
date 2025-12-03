export default function QualityPage() {
  const qualityTree = {
    foundations: [
      {
        name: "Organic Farming",
        icon: "🌱",
        description: "100% natural cultivation methods",
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "Soil Health",
        icon: "🪴",
        description: "Rich nutrient soil management",
        color: "from-amber-500 to-orange-600",
      },
      {
        name: "Water Management",
        icon: "💧",
        description: "Sustainable irrigation systems",
        color: "from-blue-500 to-cyan-600",
      },
      {
        name: "Seed Quality",
        icon: "🌾",
        description: "Premium certified seeds",
        color: "from-green-600 to-emerald-700",
      },
    ],
    process: [
      {
        title: "Cultivation",
        icon: "👨‍🌾",
        items: [
          "Traditional farming wisdom",
          "Modern agricultural techniques",
          "Seasonal crop rotation",
          "Natural pest control",
        ],
        color: "bg-green-50 border-green-200",
      },
      {
        title: "Harvesting",
        icon: "🪣",
        items: [
          "Optimal harvest timing",
          "Hand-picked selection",
          "Gentle handling",
          "Quality sorting",
        ],
        color: "bg-amber-50 border-amber-200",
      },
      {
        title: "Processing",
        icon: "🏭",
        items: [
          "Hygienic processing units",
          "Temperature control",
          "Quality grading",
          "Moisture management",
        ],
        color: "bg-gray-50 border-gray-200",
      },
      {
        title: "Packaging",
        icon: "📦",
        items: [
          "Eco-friendly materials",
          "Airtight packaging",
          "Proper labeling",
          "Quality assurance",
        ],
        color: "bg-orange-50 border-orange-200",
      },
    ],
    certifications: [
      { name: "Quality Certified", icon: "🏆", description: "ISO 9001:2015" },
      { name: "Organic Certified", icon: "📜", description: "USDA Organic" },
      { name: "Export Ready", icon: "🌍", description: "Global Standards" },
      { name: "Customer Trust", icon: "🤝", description: "98% Satisfaction" },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <div className="text-center mb-16 lg:mb-20">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
          Our <span className="text-green-600">Quality</span> Excellence
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          We cultivate perfection through sustainable farming practices and
          uncompromising quality standards that deliver exceptional agricultural
          products worldwide.
        </p>
      </div>

      <div className="mb-20 lg:mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-600">Foundations</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The core principles that form the bedrock of our quality journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {qualityTree.foundations.map((foundation, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-500"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${foundation.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {foundation.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {foundation.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {foundation.description}
              </p>

              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-500/20 transition-colors duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20 lg:mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Quality <span className="text-green-600">Process</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our meticulous journey from farm to your table
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {qualityTree.process.map((stage, index) => (
            <div
              key={index}
              className={`group rounded-3xl p-6 lg:p-8 border-2 ${stage.color} hover:shadow-2xl transition-all duration-500 hover:scale-105`}
            >
              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl lg:text-2xl group-hover:scale-110 transition-transform duration-300">
                  {stage.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    {stage.title}
                  </h3>
                  <ul className="space-y-3">
                    {stage.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm lg:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 lg:p-12 border-2 border-green-200">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            From <span className="text-green-600">Seed</span> to{" "}
            <span className="text-orange-600">Market</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our complete quality journey ensures you receive the finest
            agricultural products
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {[
            {
              icon: "🌱",
              step: "Seed Selection",
              desc: "Premium quality seeds",
              color: "text-green-600",
            },
            {
              icon: "🪴",
              step: "Cultivation",
              desc: "Natural farming methods",
              color: "text-green-600",
            },
            {
              icon: "🌧️",
              step: "Growth",
              desc: "Optimal conditions",
              color: "text-blue-600",
            },
            {
              icon: "👨‍🌾",
              step: "Harvest",
              desc: "Perfect timing",
              color: "text-orange-600",
            },
            {
              icon: "🏭",
              step: "Processing",
              desc: "Quality control",
              color: "text-gray-600",
            },
            {
              icon: "📦",
              step: "Packaging",
              desc: "Safe delivery",
              color: "text-orange-600",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl lg:text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className={item.color}>{item.icon}</span>
                </div>

                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-base lg:text-lg mb-2">
                {item.step}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
