export default function HarvestCalendar() {
  const months = [
    { name: "Jan", full: "January" },
    { name: "Feb", full: "February" },
    { name: "Mar", full: "March" },
    { name: "Apr", full: "April" },
    { name: "May", full: "May" },
    { name: "Jun", full: "June" },
    { name: "Jul", full: "July" },
    { name: "Aug", full: "August" },
    { name: "Sep", full: "September" },
    { name: "Oct", full: "October" },
    { name: "Nov", full: "November" },
    { name: "Dec", full: "December" },
  ];

  const harvestData = [
    {
      name: "Turmeric",
      months: [0, 1, 2], // Jan-Mar
      color: "bg-amber-500",
      image: "/turmeric.png",
    },
    {
      name: "Cardamom",
      months: [7, 8, 9, 10], // Aug-Nov
      color: "bg-emerald-500",
      image: "/cardamom.png",
    },
    {
      name: "Black Pepper",
      months: [2, 3, 4], // Mar-May
      color: "bg-gray-800",
      image: "/black-pepper.jpeg",
    },
    {
      name: "Cumin",
      months: [0, 1, 11], // Jan, Feb, Dec
      color: "bg-yellow-600",
      image: "/cumin-seeds.avif",
    },
    {
      name: "Groundnut",
      months: [8, 9, 10], // Sep-Nov
      color: "bg-orange-400",
      image: "/groundnut.png",
    },
    {
      name: "Rice",
      months: [9, 10, 11], // Oct-Dec
      color: "bg-white border border-gray-300",
      image: "/rice.png",
    },
    {
      name: "Chillies",
      months: [1, 2, 3, 10, 11], // Feb-Apr, Nov-Dec
      color: "bg-red-500",
      image: "/chillies.png",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-green-600 uppercase tracking-widest text-sm font-semibold mb-3 block">
            Farming Schedule
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Harvest Calendar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track the optimal harvesting periods for our premium agricultural
            products. Freshness guaranteed through seasonal farming practices.
          </p>
        </div>

        {/* Calendar Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-xl font-semibold">
                Harvest Timeline
              </h3>
              <div className="flex items-center space-x-2 text-white/90 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span>Peak Season</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 min-w-[200px]">
                    Product
                  </th>
                  {months.map((month, index) => (
                    <th
                      key={index}
                      className="py-4 px-3 text-center font-medium text-gray-600 text-sm border-l border-gray-200"
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-semibold">{month.name}</span>
                        <span className="text-xs text-gray-500 mt-1">
                          {month.full}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {harvestData.map((product, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-100 hover:bg-green-50/50 transition-colors duration-200"
                  >
                    {/* Product Cell */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${product.color} flex items-center justify-center shadow-sm`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 block">
                            {product.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {product.months.length} month
                            {product.months.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Month Cells */}
                    {months.map((_, monthIndex) => {
                      const isHarvestMonth =
                        product.months.includes(monthIndex);
                      const isPeakMonth =
                        product.months.includes(monthIndex) &&
                        (monthIndex === product.months[0] ||
                          monthIndex ===
                            product.months[product.months.length - 1]);

                      return (
                        <td
                          key={monthIndex}
                          className="py-3 px-2 text-center border-l border-gray-100"
                        >
                          {isHarvestMonth ? (
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  isPeakMonth
                                    ? "bg-green-500 animate-pulse"
                                    : "bg-green-400"
                                } shadow-sm`}
                              >
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              {isPeakMonth && (
                                <span className="text-xs text-green-600 font-medium mt-1">
                                  Peak
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-100 mx-auto"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Peak Harvest</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Harvest Season</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-100 rounded-full border border-gray-300"></div>
                  <span>Off Season</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Peak Freshness</h4>
            <p className="text-gray-600 text-sm">
              Products harvested at their peak season ensure maximum flavor and
              nutritional value.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Quality Assured
            </h4>
            <p className="text-gray-600 text-sm">
              Each product undergoes rigorous quality checks during harvest
              season.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Seasonal Planning
            </h4>
            <p className="text-gray-600 text-sm">
              Plan your purchases according to harvest seasons for best quality
              and pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
