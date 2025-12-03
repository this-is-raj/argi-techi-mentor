"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import {
  Package,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Home,
  CheckCircle,
  Settings,
  Users,
  BarChart3,
  ChevronRight,
  Shield,
  Leaf,
  Sprout,
  File,
  Layers,
  Award,
} from "lucide-react";

const ProductsTab = dynamic(() => import("./tabs/ProductTab"), { ssr: false });
const CalendarTab = dynamic(() => import("./tabs/HarvestCalendarTab"), {
  ssr: false,
});
const EnquiriesTab = dynamic(() => import("./tabs/Enquiries"), { ssr: false });
const HeroTab = dynamic(() => import("./tabs/HeroTab"), { ssr: false });
const AboutTab = dynamic(() => import("./tabs/AboutTab"), { ssr: false });
const ProductsSectionTab = dynamic(() => import("./tabs/ProductsSectionTab"), {
  ssr: false,
});
const AwardsTab = dynamic(() => import("./tabs/Awards"), { ssr: false });

interface AdminDashboardProps {
  onLogout: () => void;
}

const TABS = [
  { id: "products", label: "Products", icon: <Package className="w-5 h-5" /> },
  {
    id: "hero",
    label: "Homepage Hero",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    id: "products-section",
    label: "Product Showcase",
    icon: <Layers className="w-5 h-5" />,
  },

  {
    id: "awards",
    label: "Awards & Recognitions",
    icon: <Award className="w-5 h-5" />,
  },

  {
    id: "calendar",
    label: "Harvest Calendar",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: "about",
    label: "About Us",
    icon: <File className="w-5 h-5" />,
  },

  {
    id: "enquiries",
    label: "Customer Enquiries",
    icon: <MessageSquare className="w-5 h-5" />,
  },
];

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [active, setActive] = useState<string>("products");
  const [products, setProducts] = useState<any[]>([]);
  const [heroData, setHeroData] = useState<any>(null);
  const [sectionData, setSectionData] = useState<any>(null);
  const [savedMsg, setSavedMsg] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetch(`/api/hero`)
      .then((res) => res.json())
      .then((data) => setHeroData(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`/api/section-content`)
      .then((res) => res.json())
      .then((data) => {
        if (data.productsSection) {
          setSectionData(data.productsSection);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (savedMsg) {
      const timer = setTimeout(() => setSavedMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [savedMsg]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 to-green-50/30 flex">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 h-screen bg-gradient-to-b from-emerald-900 to-green-800 border-r border-green-700/20 transform transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        <div className="p-6 border-b border-emerald-800/30">
          <div
            className={`flex items-center ${
              sidebarCollapsed ? "justify-center" : "space-x-3"
            }`}
          >
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2.5 rounded-xl shadow-md">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-white">
                  AgriTech Mentor
                </h1>
                <p className="text-sm text-emerald-200/80 mt-0.5">
                  Admin Panel
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActive(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center ${
                  sidebarCollapsed ? "justify-center px-4" : "px-4"
                } py-3 rounded-xl transition-all duration-200 ${
                  active === tab.id
                    ? "bg-gradient-to-r from-emerald-600/30 to-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 shadow-md"
                    : "text-emerald-100 hover:bg-emerald-800/40 hover:border hover:border-emerald-600/20"
                }`}
              >
                <div
                  className={`${
                    active === tab.id
                      ? "text-white drop-shadow-lg"
                      : "text-emerald-200"
                  }`}
                >
                  {tab.icon}
                </div>
                {!sidebarCollapsed && (
                  <>
                    <span className="ml-3.5 font-medium">{tab.label}</span>
                    {active === tab.id && (
                      <ChevronRight className="w-4 h-4 ml-auto text-emerald-300" />
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-emerald-800/30">
          {!sidebarCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Admin User</p>
                  <p className="text-xs text-emerald-200/70">
                    admin@agritech.com
                  </p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2.5 text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-xl transition-colors border border-emerald-700/30 hover:border-emerald-600/50"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold">A</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2.5 text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-xl transition-colors border border-emerald-700/30 hover:border-emerald-600/50"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex absolute -right-3 top-20 bg-gradient-to-r from-emerald-600 to-green-600 border border-emerald-700 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          <ChevronRight
            className={`w-4 h-4 text-white transition-transform ${
              sidebarCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>

      <main className="flex-1 min-h-screen overflow-auto">
        <header className="sticky top-0 z-10 bg-gradient-to-r from-white to-emerald-50/80 backdrop-blur-sm border-b border-emerald-100 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2.5 text-emerald-700 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl items-center justify-center shadow-md">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-emerald-900">
                    {TABS.find((t) => t.id === active)?.label}
                  </h1>
                  <p className="text-sm text-emerald-600 mt-1">
                    Manage your{" "}
                    <span className="font-medium">
                      {TABS.find((t) => t.id === active)?.label.toLowerCase()}
                    </span>{" "}
                    efficiently
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {savedMsg && (
                <div className="hidden md:flex items-center space-x-2.5 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-4 py-2.5 rounded-xl border border-emerald-200 shadow-sm">
                  <div className="p-1.5 bg-emerald-100 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{savedMsg}</span>
                </div>
              )}
            </div>
          </div>

          {savedMsg && (
            <div className="md:hidden mt-3">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-4 py-2.5 rounded-xl border border-emerald-200 shadow-sm flex items-center space-x-2.5">
                <div className="p-1 bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="font-medium">{savedMsg}</span>
              </div>
            </div>
          )}
        </header>

        <div className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
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
              ) : active === "products-section" ? (
                <ProductsSectionTab
                  sectionData={sectionData}
                  setSectionData={setSectionData}
                  setSavedMsg={setSavedMsg}
                />
              ) : active === "enquiries" ? (
                <EnquiriesTab />
              ) : active === "about" ? (
                <AboutTab />
              ) : active === "awards" ? (
                <AwardsTab />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
