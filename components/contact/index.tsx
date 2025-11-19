import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { getContactData } from "@/lib/db";
import { ContactForm } from "./ContactForm";

import { ContactData } from "@/types/contact";

export default async function Contact() {
  const contactData: ContactData = await getContactData();

  if (!contactData) return null;

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Have a query on our products?
          </h2>
          <p className="text-lg text-muted-foreground">
            Get in touch with us for wholesale inquiries and export
            opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Address</h3>
                <p className="text-muted-foreground">{contactData.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <p className="text-muted-foreground">{contactData.phone}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-muted-foreground">{contactData.email}</p>
              </div>
            </div>

            {/* Website */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Website</h3>
                <p className="text-muted-foreground">{contactData.website}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
