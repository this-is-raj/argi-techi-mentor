// Updated AdminDashboard component
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ProductsTab = dynamic(() => import("./tabs/ProductTab"), { ssr: false });
const CalendarTab = dynamic(() => import("./tabs/HarvestCalendarTab"), {
  ssr: false,
});
const EnquiriesTab = dynamic(() => import("./tabs/Enquiries"), { ssr: false });
const HeroTab = dynamic(() => import("./tabs/HeroTab"), { ssr: false });

const TABS = [
  { id: "products", label: "Products" },
  { id: "calendar", label: "Calendar" },
  { id: "hero", label: "Hero Section" },
  { id: "enquiries", label: "Enquiries" },
];

export default function AdminDashboard() {
  const [active, setActive] = useState<string>("products");
  const [products, setProducts] = useState([]);
  const [heroData, setHeroData] = useState<any>(null);
  const [savedMsg, setSavedMsg] = useState("");

  // Load hero data on component mount
  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setHeroData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r hidden md:flex flex-col">
        <div className="px-6 py-6 border-b">
          <h1 className="text-2xl font-bold">agritechimentoradmin</h1>
          <p className="text-sm text-gray-500 mt-1">Admin panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between hover:bg-gray-100 ${
                active === tab.id ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {TABS.find((t) => t.id === active)?.label}
          </h2>
          {savedMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
              {savedMsg}
            </div>
          )}
        </header>

        <section className="bg-white rounded-2xl p-6 shadow-sm border">
          {active === "products" ? (
            <ProductsTab
              products={products}
              setProducts={setProducts}
              setSavedMsg={setSavedMsg}
            />
          ) : active === "calendar" ? (
            <CalendarTab />
          ) : active === "hero" ? (
            <HeroTab
              heroData={heroData}
              setHeroData={setHeroData}
              setSavedMsg={setSavedMsg}
            />
          ) : active === "enquiries" ? (
            <EnquiriesTab />
          ) : null}
        </section>
      </main>
    </div>
  );
}
