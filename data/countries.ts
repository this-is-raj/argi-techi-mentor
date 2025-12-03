export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  maxLength: number;
}

export const countries: Country[] = [
  { name: "India", code: "IN", dialCode: "91", flag: "🇮🇳", maxLength: 10 },
  {
    name: "United States",
    code: "US",
    dialCode: "1",
    flag: "🇺🇸",
    maxLength: 10,
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "44",
    flag: "🇬🇧",
    maxLength: 10,
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    dialCode: "971",
    flag: "🇦🇪",
    maxLength: 9,
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    dialCode: "966",
    flag: "🇸🇦",
    maxLength: 9,
  },
  { name: "Canada", code: "CA", dialCode: "1", flag: "🇨🇦", maxLength: 10 },
  { name: "Australia", code: "AU", dialCode: "61", flag: "🇦🇺", maxLength: 9 },
];
