"use client";

export default function QualityPage() {
  const qualityTree = {
    foundations: [
      {
        name: "Organic Farming",
        icon: "🌱",
        description: "100% natural cultivation methods",
        color: "from-green-400 to-emerald-500",
        gradient: "bg-gradient-to-br from-green-400 to-emerald-500",
      },
      {
        name: "Soil Health",
        icon: "🪴",
        description: "Rich nutrient soil management",
        color: "from-amber-400 to-orange-500",
        gradient: "bg-gradient-to-br from-amber-400 to-orange-500",
      },
      {
        name: "Water Management",
        icon: "💧",
        description: "Sustainable irrigation systems",
        color: "from-blue-400 to-cyan-500",
        gradient: "bg-gradient-to-br from-blue-400 to-cyan-500",
      },
      {
        name: "Seed Quality",
        icon: "🌾",
        description: "Premium certified seeds",
        color: "from-green-500 to-emerald-600",
        gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
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
        color: "hover:border-green-300",
        bgColor: "bg-green-50/50",
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
        color: "hover:border-amber-300",
        bgColor: "bg-amber-50/50",
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
        color: "hover:border-gray-300",
        bgColor: "bg-gray-50/50",
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
        color: "hover:border-orange-300",
        bgColor: "bg-orange-50/50",
      },
    ],
    certifications: [
      {
        name: "Quality Certified",
        icon: "🏆",
        description: "ISO 9001:2015",
        color: "text-blue-600",
      },
      {
        name: "Organic Certified",
        icon: "📜",
        description: "USDA Organic",
        color: "text-green-600",
      },
      {
        name: "Export Ready",
        icon: "🌍",
        description: "Global Standards",
        color: "text-purple-600",
      },
      {
        name: "Customer Trust",
        icon: "🤝",
        description: "98% Satisfaction",
        color: "text-orange-600",
      },
    ],
  };

  const journeySteps = [
    {
      icon: "🌱",
      step: "Seed Selection",
      desc: "Premium quality seeds",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: "🪴",
      step: "Cultivation",
      desc: "Natural farming methods",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: "🌧️",
      step: "Growth",
      desc: "Optimal conditions",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: "👨‍🌾",
      step: "Harvest",
      desc: "Perfect timing",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: "🏭",
      step: "Processing",
      desc: "Quality control",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
    {
      icon: "📦",
      step: "Packaging",
      desc: "Safe delivery",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-60 h-60 sm:w-80 sm:h-80 bg-green-100 rounded-full blur-3xl opacity-20 sm:opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-60 h-60 sm:w-80 sm:h-80 bg-emerald-100 rounded-full blur-3xl opacity-20 sm:opacity-30"></div>
        <div className="absolute top-1/2 left-10 sm:left-1/4 w-40 h-40 sm:w-60 sm:h-60 bg-amber-100 rounded-full blur-3xl opacity-10 sm:opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-28 relative">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-100 text-green-600 text-xs sm:text-sm font-medium">
              🌿 Quality Excellence
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Cultivating{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-green-600">Perfection</span>
              <div className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-green-200/50 -rotate-1 z-0"></div>
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
            We blend sustainable farming with uncompromising quality standards
            to deliver exceptional agricultural products that nourish
            communities worldwide.
          </p>

          <div className="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
            {[
              { value: "100%", label: "Organic" },
              { value: "24/7", label: "Quality Check" },
              { value: "50+", label: "Countries" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center px-2 sm:px-0">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 sm:w-12 h-0.5 bg-green-400"></div>
              <span className="text-green-600 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                Our Pillars
              </span>
              <div className="w-8 sm:w-12 h-0.5 bg-green-400"></div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Quality <span className="text-green-600">Foundations</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
              The bedrock principles that guide every step of our agricultural
              journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {qualityTree.foundations.map((foundation, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"></div>

                <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-sm group-hover:border-green-200 transition-all duration-500">
                  <div className="relative mb-4 sm:mb-6">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl ${foundation.gradient} flex items-center justify-center text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                    >
                      {foundation.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-700 shadow-md">
                      0{index + 1}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-700 transition-colors">
                    {foundation.name}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                    {foundation.description}
                  </p>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-green-600 text-xs sm:text-sm font-medium">
                      <span>Learn more</span>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 sm:w-12 h-0.5 bg-green-400"></div>
              <span className="text-green-600 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                Our Journey
              </span>
              <div className="w-8 sm:w-12 h-0.5 bg-green-400"></div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              From <span className="text-green-600">Farm</span> to{" "}
              <span className="text-orange-600">Table</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
              A meticulous process ensuring excellence at every stage
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 via-green-400 to-green-200"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {qualityTree.process.map((stage, index) => (
                <div
                  key={index}
                  className={`group relative ${
                    index % 2 === 0 ? "lg:pr-10 xl:pr-12" : "lg:pl-10 xl:pl-12"
                  } ${index > 0 ? "lg:mt-10 xl:mt-12" : ""}`}
                >
                  <div className="hidden lg:block absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-white border-3 sm:border-4 border-green-500 rounded-full z-10 shadow-lg"></div>

                  <div
                    className={`relative rounded-xl sm:rounded-2xl xl:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-gray-100 ${stage.bgColor} backdrop-blur-sm hover:shadow-xl sm:hover:shadow-2xl hover:border-green-200 transition-all duration-500 group-hover:scale-[1.02] sm:group-hover:scale-105`}
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div
                        className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl xl:rounded-2xl bg-white shadow-lg flex items-center justify-center text-lg sm:text-xl md:text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ${stage.color}`}
                      >
                        {stage.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div
                              className={`w-6 sm:w-8 h-1 ${
                                index % 2 === 0
                                  ? "bg-green-400"
                                  : "bg-orange-400"
                              }`}
                            ></div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                              {stage.title}
                            </h3>
                          </div>
                          <span className="self-start sm:self-center text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-white text-gray-600 border border-gray-200">
                            Step 0{index + 1}
                          </span>
                        </div>

                        <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                          {stage.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 hover:bg-white transition-colors duration-300"
                            >
                              <div
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                  index % 2 === 0
                                    ? "bg-green-500"
                                    : "bg-orange-500"
                                }`}
                              ></div>
                              <span className="text-gray-700 text-sm sm:text-base font-medium">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl xl:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 border-2 border-gray-100 shadow-lg">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 sm:w-12 h-0.5 bg-green-400"></div>
                <span className="text-green-600 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                  Complete Journey
                </span>
                <div className="w-8 sm:w-12 h-0.5 bg-green-400"></div>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Seed to <span className="text-green-600">Market</span>{" "}
                Excellence
              </h2>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
                Every step meticulously designed for maximum quality and
                freshness
              </p>
            </div>

            <div className="relative">
              <div className="hidden sm:block absolute top-10 sm:top-12 left-0 right-0 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-orange-400"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {journeySteps.map((item, index) => (
                  <div key={index} className="group relative text-center">
                    <div className="relative mb-3 sm:mb-4">
                      {index < journeySteps.length - 1 && (
                        <div className="hidden sm:block lg:hidden absolute top-4 sm:top-6 left-full w-3 sm:w-4 md:w-6 h-0.5 bg-gradient-to-r from-green-200 to-blue-200"></div>
                      )}

                      <div className="relative inline-block">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-20 rounded-lg sm:rounded-xl xl:rounded-2xl ${item.bgColor} flex items-center justify-center text-lg sm:text-xl md:text-2xl xl:text-3xl mb-2 sm:mb-3 md:mb-4 transform group-hover:scale-110 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 transition-all duration-500 shadow-lg`}
                        >
                          <span className={item.color}>{item.icon}</span>
                        </div>

                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white border-2 border-green-500 text-green-600 text-xs sm:text-sm rounded-full flex items-center justify-center font-bold shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg group-hover:text-green-700 transition-colors">
                        {item.step}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 px-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="absolute inset-0 rounded-lg sm:rounded-xl xl:rounded-2xl border-2 border-transparent group-hover:border-green-200/50 transition-all duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
