export default function Awards() {
  return (
    <section id="quality" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Awards Section */}
        <h2 className="text-4xl font-bold mb-16 text-center">
          Awards & Accreditations
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Spices Board India */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <img
              src="/certifications/spices-board.png"
              alt="Spices Board India"
              className="h-20 w-auto mx-auto mb-6 object-contain"
            />
            <h3 className="text-2xl font-bold mb-3 text-center">
              Spices Board India
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center">
              Licensed & certified by Spices Board India, ensuring export
              standards for all Indian spices.
            </p>
          </div>

          {/* APEDA Export Award */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <img
              src="/certifications/apeda.png"
              alt="APEDA Certificate"
              className="h-20 w-auto mx-auto mb-6 object-contain"
            />
            <h3 className="text-2xl font-bold mb-3 text-center">
              APEDA Registered Exporter
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center">
              Registered with Agricultural & Processed Food Products Export
              Development Authority for global food export compliance.
            </p>
          </div>

          {/* Quality Focus */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <img
              src="/certifications/iso22000.png"
              alt="ISO 22000"
              className="h-20 w-auto mx-auto mb-6 object-contain"
            />
            <h3 className="text-2xl font-bold mb-3 text-center">
              International Quality Standards
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center">
              We ensure world-class processing & packing under ISO-guided food
              safety standards.
            </p>
          </div>

          {/* Harvest Calendar */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <img
              src="/certifications/haccp.webp"
              alt="HACCP"
              className="h-20 w-auto mx-auto mb-6 object-contain"
            />
            <h3 className="text-2xl font-bold mb-3 text-center">
              HACCP Certified Facility
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center">
              Our entire process follows HACCP compliance ensuring hygiene,
              safety & freshness.
            </p>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-white p-10 rounded-2xl shadow-lg">
          {/* Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 place-items-center">
            {[
              { src: "/certifications/fssai.jpg", alt: "FSSAI" },
              { src: "/certifications/usda-organic.gif", alt: "USDA Organic" },
              { src: "/certifications/eu-organic.png", alt: "EU Organic" },
              { src: "/certifications/halal.jpg", alt: "Halal" },
              { src: "/certifications/kosher.png", alt: "Kosher" },
              { src: "/certifications/fda.jpeg", alt: "FDA Approved" },
            ].map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.alt}
                className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>
        <div className="bg-white p-12 md:p-16 rounded-3xl shadow-xl border border-gray-100 mt-10">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Official Compliance Details
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transparent business operations with all required government
              registrations and compliance certifications.
            </p>
          </div>

          {/* List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Item */}
            <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <span className="text-gray-700 font-semibold text-lg">
                IEC Number
              </span>
              <span className="text-gray-900 font-bold text-lg">
                AAXFT8546M
              </span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <span className="text-gray-700 font-semibold text-lg">
                APEDA Reg No
              </span>
              <span className="text-gray-900 font-bold text-lg">
                RCMC/APEDA/21325/2025-2026
              </span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <span className="text-gray-700 font-semibold text-lg">
                FSSAI License
              </span>
              <span className="text-gray-900 font-bold text-lg">
                12225999000503
              </span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <span className="text-gray-700 font-semibold text-lg">
                GST Number
              </span>
              <span className="text-gray-900 font-bold text-lg">
                08AAXFT8546M1ZY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
