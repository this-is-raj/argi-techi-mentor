// export default function Awards() {
//   return (
//     <section id="quality" className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Awards Section */}
//         <h2 className="text-4xl font-bold mb-16 text-center">
//           Awards & Accreditations
//         </h2>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {/* Spices Board India */}
//           <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
//             <img
//               src="/certifications/spices-board.png"
//               alt="Spices Board India"
//               className="h-20 w-auto mx-auto mb-6 object-contain"
//             />
//             <h3 className="text-2xl font-bold mb-3 text-center">
//               Spices Board India
//             </h3>
//             <p className="text-muted-foreground leading-relaxed text-center">
//               Licensed & certified by Spices Board India, ensuring export
//               standards for all Indian spices.
//             </p>
//           </div>

//           {/* APEDA Export Award */}
//           <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
//             <img
//               src="/certifications/apeda.png"
//               alt="APEDA Certificate"
//               className="h-20 w-auto mx-auto mb-6 object-contain"
//             />
//             <h3 className="text-2xl font-bold mb-3 text-center">
//               APEDA Registered Exporter
//             </h3>
//             <p className="text-muted-foreground leading-relaxed text-center">
//               Registered with Agricultural & Processed Food Products Export
//               Development Authority for global food export compliance.
//             </p>
//           </div>

//           {/* Quality Focus */}
//           <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
//             <img
//               src="/certifications/iso22000.png"
//               alt="ISO 22000"
//               className="h-20 w-auto mx-auto mb-6 object-contain"
//             />
//             <h3 className="text-2xl font-bold mb-3 text-center">
//               International Quality Standards
//             </h3>
//             <p className="text-muted-foreground leading-relaxed text-center">
//               We ensure world-class processing & packing under ISO-guided food
//               safety standards.
//             </p>
//           </div>

//           {/* Harvest Calendar */}
//           <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
//             <img
//               src="/certifications/haccp.webp"
//               alt="HACCP"
//               className="h-20 w-auto mx-auto mb-6 object-contain"
//             />
//             <h3 className="text-2xl font-bold mb-3 text-center">
//               HACCP Certified Facility
//             </h3>
//             <p className="text-muted-foreground leading-relaxed text-center">
//               Our entire process follows HACCP compliance ensuring hygiene,
//               safety & freshness.
//             </p>
//           </div>
//         </div>

//         {/* Certifications Section */}
//         <div className="bg-white p-10 rounded-2xl shadow-lg">
//           {/* Logo Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 place-items-center">
//             {[
//               { src: "/certifications/fssai.jpg", alt: "FSSAI" },
//               { src: "/certifications/usda-organic.gif", alt: "USDA Organic" },
//               { src: "/certifications/eu-organic.png", alt: "EU Organic" },
//               { src: "/certifications/halal.jpg", alt: "Halal" },
//               { src: "/certifications/kosher.png", alt: "Kosher" },
//               { src: "/certifications/fda.jpeg", alt: "FDA Approved" },
//             ].map((logo, idx) => (
//               <img
//                 key={idx}
//                 src={logo.src}
//                 alt={logo.alt}
//                 className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition"
//               />
//             ))}
//           </div>
//         </div>
//         <div className="bg-white p-8 md:p-14 lg:p-16 rounded-3xl shadow-xl border border-gray-100 mt-10">
//           {/* Heading */}
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
//               Official Compliance Details
//             </h2>
//             <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
//               Transparent business operations with all required government
//               registrations and compliance certifications.
//             </p>
//           </div>

//           {/* List */}
//           <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Item */}
//             <div className="flex flex-col bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:bg-gray-100 transition-all duration-300">
//               <span className="text-gray-500 font-medium text-sm md:text-base">
//                 IEC Number
//               </span>
//               <span className="text-gray-900 font-bold text-lg md:text-xl mt-1">
//                 AAXFT8546M
//               </span>
//             </div>

//             <div className="flex flex-col bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:bg-gray-100 transition-all duration-300">
//               <span className="text-gray-500 font-medium text-sm md:text-base">
//                 APEDA Reg No
//               </span>
//               <span className="text-gray-900 font-bold text-lg md:text-xl mt-1">
//                 RCMC/APEDA/21325/2025-2026
//               </span>
//             </div>

//             <div className="flex flex-col bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:bg-gray-100 transition-all duration-300">
//               <span className="text-gray-500 font-medium text-sm md:text-base">
//                 FSSAI License
//               </span>
//               <span className="text-gray-900 font-bold text-lg md:text-xl mt-1">
//                 12225999000503
//               </span>
//             </div>

//             <div className="flex flex-col bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:bg-gray-100 transition-all duration-300">
//               <span className="text-gray-500 font-medium text-sm md:text-base">
//                 GST Number
//               </span>
//               <span className="text-gray-900 font-bold text-lg md:text-xl mt-1">
//                 08AAXFT8546M1ZY
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState, useEffect } from "react";

interface AwardItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
}

interface Certification {
  _id: string;
  name: string;
  image: string;
  description?: string;
  featured: boolean;
}

interface Compliance {
  _id: string;
  title: string;
  value: string;
  description?: string;
}

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

      // Filter featured awards for main section
      const featuredAwards = (data.awards || []).filter(
        (a: AwardItem) => a.featured
      );
      setAwards(featuredAwards.slice(0, 4)); // Show max 4 in main section

      // Filter featured certifications
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
        {/* Awards Section */}
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

        {/* Certifications Section */}
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

        {/* Compliance Details */}
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
