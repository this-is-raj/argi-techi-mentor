"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AboutData {
  title: string;
  description: string;
  mission: string;
  vision: string;
  stats: {
    countries: number;
    clients: number;
    experience: number;
    support: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
    bgColor: string;
  }>;
}

export default function UpdateAboutUs() {
  const [aboutData, setAboutData] = useState<AboutData>({
    title: "",
    description: "",
    mission: "",
    vision: "",
    stats: {
      countries: 10,
      clients: 45,
      experience: 5,
      support: "24/7",
    },
    features: [
      {
        title: "Quality Assured",
        description: "100% certified premium products",
        icon: "/AboutUsImage/QualityAssured.jpg",
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
      },
      {
        title: "Global Reach",
        description: "Exporting to 50+ countries worldwide",
        icon: "/AboutUsImage/Global-Reach.jpg",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
      },
      {
        title: "Fast Delivery",
        description: "Secure & reliable shipping services",
        icon: "/AboutUsImage/FastDelivery.jpeg",
        color: "text-green-500",
        bgColor: "bg-green-500/10",
      },
      {
        title: "Trusted Partner",
        description: "Customer-first export experience",
        icon: "/AboutUsImage/Trusted-partner.jpg",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const adminToken = localStorage.getItem("adminToken");
      setIsAdmin(!!adminToken);
    };

    checkAdmin();
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/updateAboutUs");
      if (response.ok) {
        const data = await response.json();
        setAboutData((prev) => ({
          ...prev,
          ...data,
          stats: data.stats || prev.stats,
          features: data.features || prev.features,
        }));
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
      toast.error("Failed to load about data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch("/api/updateAboutUs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aboutData),
      });

      if (!response.ok) {
        throw new Error("Failed to update about data");
      }

      const result = await response.json();

      if (result.success) {
        toast.success("About data updated successfully!");
      } else {
        toast.error("Failed to update about data");
      }
    } catch (error) {
      console.error("Error updating about data:", error);
      toast.error("Failed to update about data");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof AboutData, value: string) => {
    setAboutData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatChange = (stat: keyof AboutData["stats"], value: string) => {
    setAboutData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: stat === "support" ? value : parseInt(value) || 0,
      },
    }));
  };

  const handleFeatureChange = (
    index: number,
    field: keyof AboutData["features"][0],
    value: string
  ) => {
    setAboutData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      ),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          <p className="text-gray-600">Loading about data...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            Admin access required to edit about page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              About Us Page Editor
            </h1>
            <p className="text-gray-600">
              Update the content of your About Us page
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={previewMode}
                onCheckedChange={setPreviewMode}
                id="preview-mode"
              />
              <Label
                htmlFor="preview-mode"
                className="flex items-center gap-2 cursor-pointer"
              >
                {previewMode ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                Preview Mode
              </Label>
            </div>

            <Button
              variant="outline"
              onClick={fetchAboutData}
              disabled={saving}
              className="border-primary/20 hover:bg-primary/5"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${saving ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="content">Main Content</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="mb-2 block">
                      Page Title
                    </Label>
                    <Input
                      id="title"
                      value={aboutData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter page title"
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="mb-2 block">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={aboutData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Enter page description"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="mission" className="mb-2 block">
                        Our Mission
                      </Label>
                      <Textarea
                        id="mission"
                        value={aboutData.mission}
                        onChange={(e) =>
                          handleInputChange("mission", e.target.value)
                        }
                        placeholder="Enter mission statement"
                        rows={6}
                      />
                    </div>

                    <div>
                      <Label htmlFor="vision" className="mb-2 block">
                        Our Vision
                      </Label>
                      <Textarea
                        id="vision"
                        value={aboutData.vision}
                        onChange={(e) =>
                          handleInputChange("vision", e.target.value)
                        }
                        placeholder="Enter vision statement"
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Us Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aboutData.features.map((feature, index) => (
                    <Card key={index} className="border-gray-200">
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            Feature {index + 1}
                          </h3>
                          <span className="text-sm text-gray-500">
                            Order: {index + 1}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor={`feature-title-${index}`}
                              className="mb-2 block"
                            >
                              Title
                            </Label>
                            <Input
                              id={`feature-title-${index}`}
                              value={feature.title}
                              onChange={(e) =>
                                handleFeatureChange(
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Feature title"
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor={`feature-desc-${index}`}
                              className="mb-2 block"
                            >
                              Description
                            </Label>
                            <Input
                              id={`feature-desc-${index}`}
                              value={feature.description}
                              onChange={(e) =>
                                handleFeatureChange(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Feature description"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor={`feature-color-${index}`}
                                className="mb-2 block"
                              >
                                Text Color Class
                              </Label>
                              <Input
                                id={`feature-color-${index}`}
                                value={feature.color}
                                onChange={(e) =>
                                  handleFeatureChange(
                                    index,
                                    "color",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., text-orange-500"
                              />
                            </div>

                            <div>
                              <Label
                                htmlFor={`feature-bgcolor-${index}`}
                                className="mb-2 block"
                              >
                                BG Color Class
                              </Label>
                              <Input
                                id={`feature-bgcolor-${index}`}
                                value={feature.bgColor}
                                onChange={(e) =>
                                  handleFeatureChange(
                                    index,
                                    "bgColor",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., bg-orange-500/10"
                              />
                            </div>
                          </div>

                          <div>
                            <Label
                              htmlFor={`feature-icon-${index}`}
                              className="mb-2 block"
                            >
                              Icon Image Path
                            </Label>
                            <Input
                              id={`feature-icon-${index}`}
                              value={feature.icon}
                              onChange={(e) =>
                                handleFeatureChange(
                                  index,
                                  "icon",
                                  e.target.value
                                )
                              }
                              placeholder="/path/to/icon.jpg"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistics Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="countries" className="mb-2 block">
                        Countries Served
                      </Label>
                      <Input
                        id="countries"
                        type="number"
                        value={aboutData.stats.countries}
                        onChange={(e) =>
                          handleStatChange("countries", e.target.value)
                        }
                        placeholder="Number of countries"
                      />
                    </div>

                    <div>
                      <Label htmlFor="clients" className="mb-2 block">
                        Happy Clients
                      </Label>
                      <Input
                        id="clients"
                        type="number"
                        value={aboutData.stats.clients}
                        onChange={(e) =>
                          handleStatChange("clients", e.target.value)
                        }
                        placeholder="Number of clients"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="experience" className="mb-2 block">
                        Years Experience
                      </Label>
                      <Input
                        id="experience"
                        type="number"
                        value={aboutData.stats.experience}
                        onChange={(e) =>
                          handleStatChange("experience", e.target.value)
                        }
                        placeholder="Years of experience"
                      />
                    </div>

                    <div>
                      <Label htmlFor="support" className="mb-2 block">
                        Customer Support
                      </Label>
                      <Input
                        id="support"
                        value={aboutData.stats.support}
                        onChange={(e) =>
                          handleStatChange("support", e.target.value)
                        }
                        placeholder="e.g., 24/7"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Preview Section */}
        {previewMode && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              {/* Preview header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {aboutData.title}
                </h2>
                <p className="text-gray-600">{aboutData.description}</p>
              </div>

              {/* Preview mission/vision */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Mission
                  </h3>
                  <p className="text-gray-600">{aboutData.mission}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Vision
                  </h3>
                  <p className="text-gray-600">{aboutData.vision}</p>
                </div>
              </div>

              {/* Preview features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Choose Us
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {aboutData.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview stats */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {aboutData.stats.countries}+
                    </div>
                    <div className="text-sm text-gray-600">
                      Countries Served
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {aboutData.stats.clients}+
                    </div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {aboutData.stats.experience}+
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {aboutData.stats.support}
                    </div>
                    <div className="text-sm text-gray-600">
                      Customer Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
