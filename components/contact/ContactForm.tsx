"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
}

interface ContactFormProps {
  products: Product[];
}

export const ContactForm = ({ products }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    enquiry: "",
    selectedProducts: [] as string[],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (productId: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedProducts.includes(productId);
      if (isSelected) {
        return {
          ...prev,
          selectedProducts: prev.selectedProducts.filter(
            (id) => id !== productId
          ),
        };
      } else {
        return {
          ...prev,
          selectedProducts: [...prev.selectedProducts, productId],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to submit enquiry.");
        setLoading(false);
        return;
      }

      alert("Thank you for your enquiry! We will contact you soon.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        enquiry: "",
        selectedProducts: [],
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Your city"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="Your country"
        />
      </div>

      {/* Products Dropdown */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Products of Interest
        </label>
        <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-2 space-y-2">
          {products.length > 0 ? (
            products.map((product) => (
              <label
                key={product.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.selectedProducts.includes(product.id)}
                  onChange={() => handleProductChange(product.id)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{product.name}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No products available
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Select one or multiple products you're interested in
        </p>
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          placeholder="Tell us about your inquiry, quantity requirements, shipping details, etc..."
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-[1.02]"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Submitting...
          </div>
        ) : (
          "Submit Enquiry"
        )}
      </Button>
    </form>
  );
};
