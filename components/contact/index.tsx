import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Building,
  Users,
  Target,
  ShieldCheck,
} from "lucide-react";
import { getContactData } from "@/lib/db";
import { ContactForm } from "./ContactForm";
import { ContactData } from "@/types/contact";

import { Clock, Lock, Headphones } from "lucide-react";
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
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Building className="text-green-600" size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Connect With Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to collaborate? Get in touch for wholesale inquiries, export
            opportunities, and personalized product solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-green-600" size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Our Location
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {contactData.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-green-600" size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Phone Number
                    </h3>
                    <a
                      href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {contactData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-green-600" size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Email Address
                    </h3>
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {contactData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="text-green-600" size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Website
                    </h3>
                    <a
                      href={`https://${contactData.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {contactData.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Target className="text-green-600" size={18} />
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="text-green-600" size={24} />
                Why Choose Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-green-600" size={16} />
                  </div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-800">
                      Expert Support:
                    </span>{" "}
                    Dedicated team for personalized assistance
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="text-green-600" size={16} />
                  </div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-800">
                      Quality Assurance:
                    </span>{" "}
                    Premium products with strict quality control
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="text-green-600" size={16} />
                  </div>
                  <p className="text-gray-600 text-sm">
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
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us Your Inquiry
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>
              </div>
              <ContactForm products={products} />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-800">
                    Quick Response
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  We guarantee a response within 24 hours on business days.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Lock className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-800">Data Security</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Your information is encrypted and never shared with third
                  parties.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Headphones className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-800">Support</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Need immediate help? Call us directly during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 text-gray-600 text-sm bg-gray-50 px-6 py-3 rounded-full">
            <ShieldCheck size={16} className="text-green-600" />
            <span>
              We are committed to providing the best service and quality
              products to our partners.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
