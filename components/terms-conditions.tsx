"use client";

import { useState } from "react";
import {
  FileText,
  Scale,
  Shield,
  AlertTriangle,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [readSections, setReadSections] = useState(new Set());

  const markSectionAsRead = (sectionId: any) => {
    setReadSections((prev) => new Set([...prev, sectionId]));
  };

  const navigationSections = [
    { id: "acceptance", label: "Acceptance", icon: CheckCircle },
    { id: "use", label: "Website Use", icon: BookOpen },
    { id: "products", label: "Products & Services", icon: Shield },
    { id: "ip", label: "Intellectual Property", icon: FileText },
    { id: "liability", label: "Liability", icon: AlertTriangle },
    { id: "governance", label: "Governance", icon: Scale },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const handleSectionClick = (sectionId: any) => {
    setActiveSection(sectionId);
    markSectionAsRead(sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <Scale className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-2">
              Effective Date:{" "}
              <span className="font-semibold text-amber-600">
                April 11, 2025
              </span>
            </p>
            <p className="text-gray-600">
              Welcome to TechieMentor International LLP. These Terms govern your
              access to and use of our website and services.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {navigationSections.map((section) => {
                  const Icon = section.icon;
                  const isRead = readSections.has(section.id);
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                        activeSection === section.id
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Icon
                          className={`w-4 h-4 ${
                            activeSection === section.id
                              ? "text-amber-600"
                              : "text-gray-400"
                          }`}
                        />
                        <span>{section.label}</span>
                      </div>
                      {isRead && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Progress Indicator */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Read</span>
                  <span>
                    {readSections.size}/{navigationSections.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (readSections.size / navigationSections.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Acceptance Section */}
              {activeSection === "acceptance" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-amber-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Acceptance of Terms
                    </h2>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                      <p className="text-amber-800 font-medium">
                        By accessing or using our Services, you agree to be
                        bound by these Terms. If you do not agree, please do not
                        use our Services.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-amber-600" />
                          Your Agreement
                        </h3>
                        <p className="text-gray-600">
                          Your use constitutes acceptance of these Terms, our
                          Privacy Policy, and any other policies posted on the
                          site.
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                          Updates & Changes
                        </h3>
                        <p className="text-gray-600">
                          We reserve the right to modify these Terms at any
                          time. Continued use after changes indicates
                          acceptance.
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Additional Agreements
                      </h4>
                      <p className="text-blue-700">
                        These Terms are in addition to any specific agreements
                        for exports or purchases you may enter with us.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Website Use Section */}
              {activeSection === "use" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-8 h-8 text-amber-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Use of the Website
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Permitted Use
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Browse our agricultural products and services
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Submit export inquiries and requests</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Learn about our sustainable farming practices
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Prohibited Activities
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Copy, modify, or distribute content without
                              permission
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>Introduce viruses or harmful code</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>Impersonate others or violate laws</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Eligibility Requirements
                      </h3>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-600 font-bold">18+</span>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            You must be at least <strong>18 years old</strong>{" "}
                            or have legal capacity to enter into agreements to
                            use our services.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Products & Services Section */}
              {activeSection === "products" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-8 h-8 text-amber-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Products and Services
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Our Agricultural Exports
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {[
                          "High-quality groundnuts from Rajasthan's Thar Desert",
                          "Premium spices from Kerala's Western Ghats",
                          "Nutritious pulses and oil seeds",
                          "Farm-fresh vegetables",
                          "Basmati rice from Punjab's Doab",
                          "Indian millets and organic produce",
                        ].map((product, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{product}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          Quality Certifications
                        </h4>
                        <div className="space-y-2">
                          {[
                            "ISO 22000:2018",
                            "HACCP",
                            "FSSAI",
                            "Organic",
                            "Fair Trade",
                            "FDA",
                          ].map((cert, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-blue-600" />
                              <span className="text-blue-700 text-sm">
                                {cert}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border border-amber-200 rounded-xl p-6 bg-amber-50">
                        <h4 className="font-semibold text-amber-800 mb-2">
                          Delivery Information
                        </h4>
                        <p className="text-amber-700 mb-2">
                          We aim for <strong>98% on-time delivery</strong> to
                          ensure your satisfaction.
                        </p>
                        <p className="text-amber-700 text-sm">
                          Note: Not liable for delays due to force majeure
                          (natural disasters, market volatility).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Intellectual Property Section */}
              {activeSection === "ip" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-8 h-8 text-amber-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Intellectual Property
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Protected Content
                      </h3>
                      <p className="text-gray-600 mb-4">
                        All content on our website is owned by us or our
                        licensors and protected by Indian and international
                        laws.
                      </p>

                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          {
                            title: "Text Content",
                            desc: "Product descriptions, articles, and documentation",
                          },
                          {
                            title: "Images & Media",
                            desc: "Photographs, graphics, and visual content",
                          },
                          {
                            title: "Brand Assets",
                            desc: "Logos, trademarks, and business identity",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="text-center p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <FileText className="w-6 h-6 text-amber-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h4 className="font-semibold text-red-800 mb-2">
                        Restrictions
                      </h4>
                      <p className="text-red-700">
                        You may not reproduce, sell, or exploit any content
                        without our written consent. This includes our unique
                        agricultural content and product descriptions.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Liability Section */}
              {activeSection === "liability" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Limitation of Liability
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Important Disclaimers
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-yellow-800 mb-1">
                              Warranty Disclaimer
                            </h4>
                            <p className="text-yellow-700">
                              To the fullest extent permitted by law, we
                              disclaim all warranties, express or implied,
                              regarding the Services.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                          <Shield className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-1">
                              Liability Cap
                            </h4>
                            <p className="text-blue-700">
                              Our total liability shall not exceed the amount
                              paid by you for Services in the preceding 12
                              months.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                          <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-red-800 mb-1">
                              Excluded Damages
                            </h4>
                            <p className="text-red-700">
                              We are not liable for indirect, incidental, or
                              consequential damages arising from your use of the
                              website.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Governance Section */}
              {activeSection === "governance" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <Scale className="w-8 h-8 text-amber-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Governing Law & Dispute Resolution
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Legal Framework
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                              <Scale className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                Governing Law
                              </h4>
                              <p className="text-gray-600">Laws of India</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                Jurisdiction
                              </h4>
                              <p className="text-gray-600">
                                Courts of Jaipur, Rajasthan
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Dispute Resolution
                        </h3>
                        <p className="text-gray-600 mb-4">
                          We encourage informal resolution first before formal
                          proceedings.
                        </p>
                        <div className="flex items-center gap-2 text-green-700">
                          <Mail className="w-4 h-4" />
                          <span>Contact: techiementor.co@gmail.com</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Additional Provisions
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Severability
                          </h4>
                          <p className="text-gray-600 text-sm">
                            If any provision is invalid, the remainder remains
                            enforceable
                          </p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            No Waiver
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Failure to enforce rights doesn't constitute waiver
                          </p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Entire Agreement
                          </h4>
                          <p className="text-gray-600 text-sm">
                            These Terms constitute the full agreement
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeSection === "contact" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="w-8 h-8 text-amber-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Contact Us
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Get In Touch
                      </h3>
                      <p className="text-gray-600 mb-6">
                        For questions about these Terms and Conditions, please
                        contact us:
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                            <Mail className="w-6 h-6 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Email
                            </h4>
                            <p className="text-gray-600">
                              techiementor.co@gmail.com
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                            <Phone className="w-6 h-6 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Phone
                            </h4>
                            <p className="text-gray-600">+91 9549235277</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg md:col-span-2">
                          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Address
                            </h4>
                            <p className="text-gray-600">
                              TechieMentor, E-9/508 Chitrakoot,
                              <br />
                              Vaishali Nagar, Jaipur,
                              <br />
                              Rajasthan, India - 302021
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                      <h4 className="font-semibold text-green-800 mb-2">
                        Thank You for Choosing Us!
                      </h4>
                      <p className="text-green-700">
                        We look forward to serving you and providing the highest
                        quality agricultural products and services.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
