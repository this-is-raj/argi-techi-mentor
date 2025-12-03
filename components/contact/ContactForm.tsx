"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { countries, type Country } from "@/data/countries";
import { PhoneInput } from "../ui/phone-input";
import {
  Check,
  AlertCircle,
  Send,
  Shield,
  Clock,
  Phone as PhoneIcon,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
}

interface ContactFormProps {
  products: Product[];
}

export const ContactForm = ({ products }: ContactFormProps) => {
  const defaultCountry = countries.find((c) => c.code === "IN") || countries[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: defaultCountry.name,
    enquiry: "",
    selectedProducts: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (formData.country) {
      const countryObj = countries.find((c) => c.name === formData.country);
      if (countryObj) {
        setSelectedCountry(countryObj);
      }
    }
  }, []);

  useEffect(() => {
    setCharacterCount(formData.enquiry.length);
  }, [formData.enquiry]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone.trim()) {
      const digitsOnly = formData.phone.replace(/\D/g, "");
      if (digitsOnly.length < 7) {
        newErrors.phone = "Phone number is too short";
      } else if (digitsOnly.length > selectedCountry.maxLength) {
        newErrors.phone = `Phone number should not exceed ${selectedCountry.maxLength} digits`;
      }
    }

    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    if (formData.selectedProducts.length === 0) {
      newErrors.products = "Please select at least one product";
    }

    if (!formData.enquiry.trim()) {
      newErrors.enquiry = "Enquiry details are required";
    } else if (formData.enquiry.length < 20) {
      newErrors.enquiry = "Please provide more details (minimum 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === "country") {
      const countryObj = countries.find((c) => c.name === value);
      if (countryObj) {
        setSelectedCountry(countryObj);

        if (formData.phone) {
          const digitsOnly = formData.phone.replace(/\D/g, "");
          setFormData((prev) => ({
            ...prev,
            phone: `+${countryObj.dialCode}${digitsOnly.slice(
              countryObj.dialCode.length
            )}`,
          }));
        }
      }
    }
  };

  const handlePhoneChange = (value: string, countryData: Country) => {
    if (errors.phone) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }

    setFormData((prev) => ({ ...prev, phone: value }));
    setSelectedCountry(countryData);

    if (countryData.name !== formData.country) {
      setFormData((prev) => ({ ...prev, country: countryData.name }));
    }
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

    if (errors.products) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.products;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorKey}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    try {
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: formData.country,
        enquiry: formData.enquiry.trim(),
        productIds: formData.selectedProducts,
        timestamp: new Date().toISOString(),
      };

      console.log("Submitting enquiry:", submissionData);

      const res = await fetch(`/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }
      alert(
        "✨ Enquiry Submitted Successfully ✨\n\n" +
          `👤 Name: ${formData.name}\n` +
          `📧 Email: ${formData.email}\n` +
          `📞 Phone: ${formData.phone || "Not Provided"}\n\n` +
          "📩 Our team will contact you within 24 hours.\n" +
          "Thank you for reaching out! 🙌"
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        country: defaultCountry.name,
        enquiry: "",
        selectedProducts: [],
      });
      setSelectedCountry(defaultCountry);
      setErrors({});
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Product Enquiry Form
        </h2>
        <p className="text-gray-600">
          Fill in your details below and we'll get back to you within 24 hours
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3.5 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white`}
              placeholder="John Doe"
            />
            {!errors.name && formData.name && (
              <Check className="absolute right-3 top-3.5 h-5 w-5 text-green-500" />
            )}
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3.5 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white`}
              placeholder="john@example.com"
            />
            {!errors.email && formData.email && (
              <Check className="absolute right-3 top-3.5 h-5 w-5 text-green-500" />
            )}
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Phone Number
          </label>
          <PhoneInput
            value={formData.phone}
            onChange={handlePhoneChange}
            defaultCountry="IN"
            className="w-full"
            inputClass={`w-full px-4 py-3.5 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Country Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-3.5 border ${
                errors.country ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white appearance-none`}
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.country && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.country}
            </p>
          )}
        </div>
      </div>

      {/* Products Selection Section */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-800">
          Products of Interest <span className="text-red-500">*</span>
          <span className="ml-2 text-sm font-normal text-gray-600">
            (Select one or more)
          </span>
        </label>

        {errors.products && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.products}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.selectedProducts.includes(product.id)
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleProductChange(product.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {product.name}
                  </span>
                  {formData.selectedProducts.includes(product.id) && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-6 text-gray-500">
              No products available at the moment
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-semibold text-gray-800">
            Enquiry Details <span className="text-red-500">*</span>
          </label>
          <span
            className={`text-sm ${
              characterCount < 20 ? "text-red-500" : "text-green-600"
            }`}
          >
            {characterCount}/500
          </span>
        </div>

        <div className="relative">
          <textarea
            name="enquiry"
            value={formData.enquiry}
            onChange={handleChange}
            required
            rows={5}
            maxLength={500}
            className={`w-full px-4 py-3.5 border ${
              errors.enquiry ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white resize-none`}
            placeholder="Please tell us about your requirements, quantity, timeline, and any other details..."
          />
          {characterCount < 20 && (
            <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Minimum 20 characters required
            </p>
          )}
          {errors.enquiry && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.enquiry}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Send className="h-5 w-5" />
              Submit Enquiry
            </div>
          )}
        </Button>
      </div>

      {/* Form Footer */}
      <div className="pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-green-600" />
            <span>24-hour response</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Secure & confidential</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <PhoneIcon className="h-4 w-4 text-green-600" />
            <span>Direct support</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4 pt-4 border-t border-gray-100">
          Your information is protected and will only be used to respond to your
          enquiry. We never share your data with third parties.
        </p>
      </div>
    </form>
  );
};
