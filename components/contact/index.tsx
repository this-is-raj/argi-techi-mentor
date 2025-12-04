import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Building,
  Users,
  Target,
  ShieldCheck,
  Clock,
  Lock,
  Headphones,
} from "lucide-react";
import { getContactData } from "@/lib/db";
import { ContactForm } from "./ContactForm";
import { ContactData } from "@/types/contact";

interface Product {
  id: string;
  name: string;
}

export default async function Contact() {
  const contactData: ContactData = await getContactData();

  let products: Product[] = [];
  try {
    const response = await fetch(`${process.env.APP_HOST}/api/products`, {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const productsData = await response.json();
      products = Array.isArray(productsData) ? productsData : [];
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  if (!contactData) return null;

  return (
    <section
      id="contact"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-full mb-4 sm:mb-5 md:mb-6">
            <Building
              className="text-green-600"
              size={20}
              sm-size={24}
              md-size={28}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Connect With Us
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
            Ready to collaborate? Get in touch for wholesale inquiries, export
            opportunities, and personalized product solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 pb-3 sm:pb-4 border-b border-gray-200">
                Contact Information
              </h2>

              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin
                      className="text-green-600"
                      size={18}
                      sm-size={20}
                      md-size={22}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-0.5 sm:mb-1">
                      Our Location
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                      {contactData.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone
                      className="text-green-600"
                      size={18}
                      sm-size={20}
                      md-size={22}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-0.5 sm:mb-1">
                      Phone Number
                    </h3>
                    <a
                      href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
                      className="text-gray-600 hover:text-green-600 transition-colors text-xs sm:text-sm md:text-base break-all"
                    >
                      {contactData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail
                      className="text-green-600"
                      size={18}
                      sm-size={20}
                      md-size={22}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-0.5 sm:mb-1">
                      Email Address
                    </h3>
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-gray-600 hover:text-green-600 transition-colors text-xs sm:text-sm md:text-base break-all"
                    >
                      {contactData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe
                      className="text-green-600"
                      size={18}
                      sm-size={20}
                      md-size={22}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-0.5 sm:mb-1">
                      Website
                    </h3>
                    <a
                      href={`https://${contactData.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors text-xs sm:text-sm md:text-base break-all"
                    >
                      {contactData.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                  <Target className="text-green-600" size={16} sm-size={18} />
                  Business Hours
                </h3>
                <div className="space-y-1.5 sm:space-y-2 text-gray-600">
                  <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-green-100">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 flex items-center gap-2">
                <ShieldCheck
                  className="text-green-600"
                  size={20}
                  sm-size={22}
                  md-size={24}
                />
                Why Choose Us
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-100 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users
                      className="text-green-600"
                      size={12}
                      sm-size={14}
                      md-size={16}
                    />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-sm flex-1">
                    <span className="font-semibold text-gray-800">
                      Expert Support:
                    </span>{" "}
                    Dedicated team for personalized assistance
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-100 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target
                      className="text-green-600"
                      size={12}
                      sm-size={14}
                      md-size={16}
                    />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-sm flex-1">
                    <span className="font-semibold text-gray-800">
                      Quality Assurance:
                    </span>{" "}
                    Premium products with strict quality control
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-100 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck
                      className="text-green-600"
                      size={12}
                      sm-size={14}
                      md-size={16}
                    />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-sm flex-1">
                    <span className="font-semibold text-gray-800">
                      Secure Partnership:
                    </span>{" "}
                    Trusted by businesses worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                  Send Us Your Inquiry
                </h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-base">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>
              </div>
              <ContactForm products={products} />
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gradient-to-r from-green-50 to-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-green-100">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-100 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock
                      className="text-green-600"
                      size={16}
                      sm-size={18}
                      md-size={20}
                    />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Quick Response
                  </h4>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  We guarantee a response within 24 hours on business days.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-green-100">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-100 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock
                      className="text-green-600"
                      size={16}
                      sm-size={18}
                      md-size={20}
                    />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Data Security
                  </h4>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Your information is encrypted and never shared with third
                  parties.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-green-100 xs:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-100 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                    <Headphones
                      className="text-green-600"
                      size={16}
                      sm-size={18}
                      md-size={20}
                    />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Support
                  </h4>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Need immediate help? Call us directly during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-gray-600 text-xs sm:text-sm bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full max-w-2xl mx-auto">
            <ShieldCheck
              size={14}
              sm-size={16}
              className="text-green-600 flex-shrink-0"
            />
            <span className="text-center">
              We are committed to providing the best service and quality
              products to our partners.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
