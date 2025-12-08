"use client";
import { useState, useEffect } from "react";
import { awardService } from "@/service/awards.service";
import { AwardItem, Certification, Compliance } from "@/types/award";
export default function Awards() {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [compliances, setCompliances] = useState<Compliance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAwardsData();
  }, []);

  const fetchAwardsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await awardService.fetchAwardsData();

      const featuredAwards = awardService.getFeaturedAwards(data.awards || []);
      setAwards(featuredAwards);

      const featuredCerts = awardService.getFeaturedCertifications(
        data.certifications || []
      );
      setCertifications(featuredCerts);

      setCompliances(data.compliances || []);
    } catch (error) {
      console.error("Error fetching awards data:", error);
      setError("Failed to load awards data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="quality" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="quality" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchAwardsData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quality" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Awards & Accreditations
        </h2>

        {awards.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {awards.map((award) => (
              <div
                key={award._id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                {award.image && (
                  <img
                    src={award.image}
                    alt={award.title}
                    className="h-20 w-auto mx-auto mb-6 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                <h3 className="text-2xl font-bold mb-3 text-center">
                  {award.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div className="bg-white p-10 rounded-2xl shadow-lg mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 place-items-center">
              {certifications.map((cert) => (
                <img
                  key={cert._id}
                  src={cert.image}
                  alt={cert.name}
                  className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {compliances.length > 0 && (
          <div className="bg-white p-8 md:p-14 lg:p-16 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Official Compliance Details
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Transparent business operations with all required government
                registrations and compliance certifications.
              </p>
            </div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {compliances.map((compliance) => (
                <div
                  key={compliance._id}
                  className="flex flex-col bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <span className="text-gray-500 font-medium text-sm md:text-base">
                    {compliance.title}
                  </span>
                  <span className="text-gray-900 font-bold text-lg md:text-xl mt-1">
                    {compliance.value}
                  </span>
                  {compliance.description && (
                    <span className="text-gray-600 text-sm mt-2">
                      {compliance.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {awards.length === 0 &&
          certifications.length === 0 &&
          compliances.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No awards data available.</p>
            </div>
          )}
      </div>
    </section>
  );
}
