"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, RotateCcw, Eye } from "lucide-react";

interface ProductsSectionTabProps {
  sectionData: any;
  setSectionData: (data: any) => void;
  setSavedMsg: (msg: string) => void;
}

export default function ProductsSectionTab({
  sectionData,
  setSectionData,
  setSavedMsg,
}: ProductsSectionTabProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData(sectionData);
    } else {
      fetchSectionData();
    }
  }, [sectionData]);

  const fetchSectionData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/section-content`);
      if (response.ok) {
        const data = await response.json();
        if (data.productsSection) {
          setFormData(data.productsSection);
          setSectionData(data.productsSection);
        }
      }
    } catch (error) {
      console.error("Error fetching section data:", error);
      setSavedMsg("Error loading section data");
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
      const response = await fetch(`/api/section-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productsSection: formData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSectionData(formData);
        setSavedMsg("✅ Products section updated successfully!");
        setTimeout(() => setSavedMsg(""), 3000);
      } else {
        setSavedMsg(`❌ ${result.error || "Error saving section content"}`);
      }
    } catch (error) {
      console.error("Error saving section data:", error);
      setSavedMsg("❌ Error saving section content");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const defaultData = {
      title: "BY CATEGORIES",
      description:
        "We bring you the finest selection over the years with a huge customer base worldwide. We offer a wide range of products without compromising on quality. We ensure the goodwill and trust of our global clients are highly prioritized.",
    };
    setFormData(defaultData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        <span className="ml-2 text-gray-600">Loading section data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Products Section Editor
          </h2>
          <p className="text-gray-600">
            Manage the content of your products section heading and description
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
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Content Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Section Title
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="BY CATEGORIES"
                className="w-full text-lg"
              />
              <p className="text-xs text-gray-500">
                Main heading of the products section
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Section Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="We bring you the finest selection over the years..."
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Detailed description below the title
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Note:</h4>
              <p className="text-sm text-blue-600">
                Changes saved here will automatically update on the main
                products page. The products grid will remain unchanged - only
                the heading and description will be updated.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg">Live Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white rounded-lg p-6 min-h-[400px] border border-gray-200">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                  {formData.title || "BY CATEGORIES"}
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
                  {formData.description ||
                    "We bring you the finest selection over the years with a huge customer base worldwide. We offer a wide range of products without compromising on quality. We ensure the goodwill and trust of our global clients are highly prioritized."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
