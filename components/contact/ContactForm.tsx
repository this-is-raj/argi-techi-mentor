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
  ChevronDown,
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
      className="space-y-6 sm:space-y-8 bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 w-full max-w-6xl mx-auto"
    >
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
          Product Enquiry Form
        </h2>
        <p className="text-gray-600 text-sm sm:text-base px-2 sm:px-0">
          Fill in your details below and we'll get back to you within 24 hours
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-gray-800">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white`}
              placeholder="John Doe"
            />
            {!errors.name && formData.name && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            )}
          </div>
          {errors.name && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-gray-800">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white`}
              placeholder="john@example.com"
            />
            {!errors.email && formData.email && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            )}
          </div>
          {errors.email && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-gray-800">
            Phone Number
          </label>
          <div className="relative">
            <PhoneInput
              value={formData.phone}
              onChange={handlePhoneChange}
              defaultCountry="IN"
              className="w-full"
              inputClass={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-gray-800">
            Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border ${
                errors.country ? "border-red-500" : "border-gray-300"
              } rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white appearance-none pr-10`}
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
          </div>
          {errors.country && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              {errors.country}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <label className="block text-xs sm:text-sm font-semibold text-gray-800">
            Products of Interest <span className="text-red-500">*</span>
          </label>
          <span className="text-xs sm:text-sm font-normal text-gray-600">
            (Select one or more)
          </span>
        </div>

        {errors.products && (
          <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            {errors.products}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.selectedProducts.includes(product.id)
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleProductChange(product.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 text-sm sm:text-base truncate pr-2">
                    {product.name}
                  </span>
                  {formData.selectedProducts.includes(product.id) && (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
              No products available at the moment
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <label className="block text-xs sm:text-sm font-semibold text-gray-800">
            Enquiry Details <span className="text-red-500">*</span>
          </label>
          <span
            className={`text-xs sm:text-sm ${
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
            rows={4}
            maxLength={500}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border ${
              errors.enquiry ? "border-red-500" : "border-gray-300"
            } rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white resize-none`}
            placeholder="Please tell us about your requirements, quantity, timeline, and any other details..."
          />
          {characterCount < 20 && (
            <p className="text-xs text-red-500 mt-1.5 sm:mt-2 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 flex-shrink-0" />
              Minimum 20 characters required
            </p>
          )}
          {errors.enquiry && (
            <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              {errors.enquiry}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2 sm:pt-4">
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-sm sm:text-base">Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Submit Enquiry</span>
            </div>
          )}
        </Button>
      </div>

      <div className="pt-4 sm:pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
            <span className="truncate">24-hour response</span>
          </div>
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
            <span className="truncate">Secure & confidential</span>
          </div>
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 col-span-2 xs:col-span-1">
            <PhoneIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
            <span className="truncate">Direct support</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 leading-relaxed px-2 sm:px-0">
          Your information is protected and will only be used to respond to your
          enquiry. We never share your data with third parties.
        </p>
      </div>
    </form>
  );
};
