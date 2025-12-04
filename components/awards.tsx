"use client";
import { useState, useEffect } from "react";
import { AwardItem, Certification, Compliance } from "@/types/award";
export default function Awards() {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [compliances, setCompliances] = useState<Compliance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAwardsData();
  }, []);

  const fetchAwardsData = async () => {
    try {
      const response = await fetch("/api/awards");
      const data = await response.json();

      const featuredAwards = (data.awards || []).filter(
        (a: AwardItem) => a.featured
      );
      setAwards(featuredAwards.slice(0, 4));

      const featuredCerts = (data.certifications || []).filter(
        (c: Certification) => c.featured
      );
      setCertifications(featuredCerts);

      setCompliances(data.compliances || []);
    } catch (error) {
      console.error("Error fetching awards data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="quality" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading awards...</div>
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {awards.map((award, index) => (
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
      </div>
    </section>
  );
}
