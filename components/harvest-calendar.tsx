"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface HarvestProduct {
  _id?: string;
  name: string;
  months: number[];
  color: string;
  image: string;
}

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

  const [harvestData, setHarvestData] = useState<HarvestProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHarvestData();
  }, []);

  const fetchHarvestData = async () => {
    try {
      const response = await fetch(`/api/harvest-calendar`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setHarvestData(data);
    } catch (error) {
      console.error("Error fetching harvest data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
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

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                {harvestData.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-100 hover:bg-green-50/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${product.color} flex items-center justify-center shadow-sm`}
                        >
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-8 h-8 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                                const parent = (e.target as HTMLImageElement)
                                  .parentElement;
                                if (parent) {
                                  parent.innerHTML = `<span class="text-white text-sm font-bold">${product.name.charAt(
                                    0
                                  )}</span>`;
                                }
                              }}
                            />
                          ) : (
                            <span className="text-white text-sm font-bold">
                              {product.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 block">
                            {product.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {months.map((_, monthIndex) => {
                      const isHarvestMonth =
                        product.months.includes(monthIndex);
                      const isPeakMonth =
                        isHarvestMonth &&
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
      </div>
    </section>
  );
}
