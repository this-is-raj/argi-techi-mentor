"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    enquiry: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your enquiry! We will contact you soon.");
    setFormData({ name: "", email: "", phone: "", city: "", enquiry: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-8 rounded-2xl shadow-lg"
    >
      <div>
        <label className="block text-sm font-semibold mb-2">
          Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Email <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="+91 XXXXXXXXXX"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Your city"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Enquiry <span className="text-primary">*</span>
        </label>
        <textarea
          name="enquiry"
          value={formData.enquiry}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Tell us about your inquiry..."
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        Submit Enquiry
      </Button>
    </form>
  );
};
