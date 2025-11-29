// tabs/HeroTab.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, RotateCcw, Eye } from "lucide-react";

interface HeroTabProps {
  heroData: any;
  setHeroData: (data: any) => void;
  setSavedMsg: (msg: string) => void;
}

export default function HeroTab({
  heroData,
  setHeroData,
  setSavedMsg,
}: HeroTabProps) {
  const [formData, setFormData] = useState({
    liveLabel: "",
    typewriterText: "",
    headingMain: "",
    headingGradient: "",
    description: "",
    highlightText: "",
    cta_text: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (heroData) {
      setFormData(heroData);
    } else {
      fetchHeroData();
    }
  }, [heroData]);

  const fetchHeroData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/hero");
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        setHeroData(data);
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
      setSavedMsg("Error loading hero data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setHeroData(formData);
        setSavedMsg("✅ Hero section updated successfully!");
        setTimeout(() => setSavedMsg(""), 3000);
      } else {
        setSavedMsg(`❌ ${result.error || "Error saving hero section"}`);
      }
    } catch (error) {
      console.error("Error saving hero data:", error);
      setSavedMsg("❌ Error saving hero section");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const defaultData = {
      liveLabel: "LIVE",
      typewriterText:
        "Export Quality Guaranteed • Farm Fresh • Global Shipping",
      headingMain: "Premium Agricultural",
      headingGradient: "Products & Exports",
      description: "Direct from farms to global markets with",
      highlightText: "100% quality assurance",
      cta_text: "Explore Our Products",
      image: "/agricultural-products-spices-vegetables-colorful-d.jpg",
    };
    setFormData(defaultData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        <span className="ml-2 text-gray-600">Loading hero data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Hero Section Editor
          </h2>
          <p className="text-gray-600">
            Manage your hero section content and appearance
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Content Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Live Label
                </label>
                <Input
                  name="liveLabel"
                  value={formData.liveLabel}
                  onChange={handleChange}
                  placeholder="e.g., LIVE"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  CTA Button Text
                </label>
                <Input
                  name="cta_text"
                  value={formData.cta_text}
                  onChange={handleChange}
                  placeholder="Explore Our Products"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Typewriter Text
              </label>
              <Input
                name="typewriterText"
                value={formData.typewriterText}
                onChange={handleChange}
                placeholder="Export Quality Guaranteed • Farm Fresh • Global Shipping"
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Use • to separate different phrases
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Main Heading
                </label>
                <Input
                  name="headingMain"
                  value={formData.headingMain}
                  onChange={handleChange}
                  placeholder="Premium Agricultural"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Gradient Heading
                </label>
                <Input
                  name="headingGradient"
                  value={formData.headingGradient}
                  onChange={handleChange}
                  placeholder="Products & Exports"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Direct from farms to global markets with"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Highlight Text
              </label>
              <Input
                name="highlightText"
                value={formData.highlightText}
                onChange={handleChange}
                placeholder="100% quality assurance"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Background Image URL
              </label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/agricultural-products-spices-vegetables-colorful-d.jpg"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg">Live Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gradient-to-br from-green-900 to-emerald-800 rounded-xl p-6 min-h-[500px] flex items-center justify-center">
              <div className="text-center text-white w-full">
                {/* LIVE + Typewriter Preview */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-4">
                  <span className="text-green-200 text-xs font-semibold bg-green-600/20 px-2 py-1 rounded border border-green-400/30">
                    {formData.liveLabel}
                  </span>
                  <span className="text-white text-sm font-medium">
                    {formData.typewriterText}
                  </span>
                </div>

                {/* Heading Preview */}
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                  <span className="block">{formData.headingMain}</span>
                  <span className="block bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent mt-2">
                    {formData.headingGradient}
                  </span>
                </h1>

                {/* Description Preview */}
                <p className="text-gray-200 text-lg mb-6">
                  {formData.description}{" "}
                  <span className="text-green-300 font-semibold">
                    {formData.highlightText}
                  </span>
                </p>

                {/* CTA Buttons Preview */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold">
                    {formData.cta_text}
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white rounded-lg border border-white/20 font-semibold">
                    Export Enquiry
                  </button>
                </div>

                {/* Background Preview */}
                {formData.image && (
                  <div className="mt-6 text-xs text-gray-300">
                    Background: {formData.image}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
