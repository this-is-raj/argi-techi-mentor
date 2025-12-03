"use client";

import { useState } from "react";
import { countries, type Country } from "@/data/countries";

interface PhoneInputProps {
  value: string;
  onChange: (value: string, countryData: Country) => void;
  defaultCountry?: string;
  className?: string;
  inputClass?: string;
}

export const PhoneInput = ({
  value,
  onChange,
  defaultCountry = "IN",
  className = "",
  inputClass = "",
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.code === defaultCountry) || countries[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);

    if (!value) {
      onChange(`+${country.dialCode}`, country);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneValue = e.target.value;

    // Extract digits only (ignore + and country code)
    const digitsOnly = phoneValue.replace(/\D/g, "");

    // Apply max length based on selected country
    if (digitsOnly.length > selectedCountry.maxLength) {
      return; // ❌ Stop if exceeding limit
    }

    // Auto select country from + code
    if (phoneValue.startsWith("+")) {
      const dialCode = phoneValue.match(/^\+\d+/)?.[0] || "";
      const country = countries.find((c) => `+${c.dialCode}` === dialCode);
      if (country) {
        setSelectedCountry(country);
      }
    }

    onChange(phoneValue, selectedCountry);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        {/* Country Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-white hover:bg-gray-50"
          >
            <span className="mr-2 text-lg">{selectedCountry.flag}</span>
            <span className="mr-1">+{selectedCountry.dialCode}</span>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                >
                  <span className="mr-3 text-lg">{country.flag}</span>
                  <span className="mr-2">{country.name}</span>
                  <span className="ml-auto text-gray-500">
                    +{country.dialCode}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <input
          type="tel"
          value={value}
          onChange={handlePhoneChange}
          placeholder={`Enter ${selectedCountry.maxLength}-digit number`}
          className={`flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${inputClass}`}
        />
      </div>
    </div>
  );
};
