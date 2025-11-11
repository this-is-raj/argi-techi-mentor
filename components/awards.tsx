"use client"

export default function Awards() {
  return (
    <section id="quality" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">Awards & Accreditations</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Spices Board India */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🏅</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Spices Board India</h3>
            <p className="text-muted-foreground leading-relaxed">
              We have specialized license and necessary certificates from Spices Board India, we can ensure our
              standards and export of all spices from the Spices Board of India.
            </p>
          </div>

          {/* APEDA Export Award */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🏆</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">APEDA Export Award</h3>
            <p className="text-muted-foreground leading-relaxed">
              We have been awarded by Agricultural and Processed Food Products Export Development Authority. We are
              registered to serve our clients with the best quality products.
            </p>
          </div>

          {/* Quality Focus */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Our Quality Focus</h3>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to quality and fresh produce in our customers and enhance the customer satisfaction
              levels through improved value addition and stringent commitment on our processes.
            </p>
          </div>

          {/* Harvest Calendar */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">📅</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Harvest Calendar</h3>
            <p className="text-muted-foreground leading-relaxed">
              The harvest calendar provides you with details on which crop comes in which month round the year. Based on
              the seasonal crop harvest calendar, you will understand best seasons for different crops that we export.
            </p>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-8 text-center">Our Certifications & Standards</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            {[
              "ISO 22000:2018",
              "HACCP Certified",
              "FSSAI Licensed",
              "Organic Certified",
              "Fair Trade Certified",
              "FDA Approved",
            ].map((cert, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 hover:from-primary/20 hover:to-primary/10 transition"
              >
                <p className="font-semibold text-foreground text-sm">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
