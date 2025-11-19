"use client";

import { useState, useEffect } from "react";
import { clearAdminSession } from "@/lib/auth";
import {
  getHeroData,
  getProducts,
  getContactData,
  getAboutData,
  getHeaderFooterData,
  updateHeroData,
  updateProducts,
  updateContactData,
  updateAboutData,
  updateHeaderFooterData,
  addProduct,
  deleteProduct,
} from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, ImageIcon, Info } from "lucide-react";
export interface Product {
  id: string;
  name: string;
  subtitle: string;

  image?: File | null;
  botanicalName: string;
  form: string;
  packaging: string;
  origin: string;
  gallery?: File[];
  specifications: Record<string, string>;
  description: string;
  benefits: string;
  details: string;
  metaTitle?: string;
  metaDescription?: string;
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("hero");
  const [heroData, setHeroData] = useState<any>(null);
  const [products, setProductsState] = useState<any[]>([]);
  const [contactData, setContactDataState] = useState<any>(null);
  const [aboutData, setAboutDataState] = useState<any>(null);
  const [headerFooterData, setHeaderFooterData] = useState<any>(null);
  const [savedMsg, setSavedMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    subtitle: "",
    botanicalName: "",
    form: "",
    packaging: "",
    origin: "",
    specifications: {},
    description: "",
    benefits: "",
    details: "",
    image: null,
    gallery: [],
    metaTitle: "", // ✅ added for SEO title
    metaDescription: "", // ✅ added for SEO description
  });

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [hero, prods, contact, about, headerFooter] = await Promise.all([
          getHeroData(),
          getProducts(),
          getContactData(),
          getAboutData(),
          getHeaderFooterData(),
        ]);
        setHeroData(hero);
        setProductsState(prods);
        setContactDataState(contact);
        setAboutDataState(about);
        setHeaderFooterData(headerFooter);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };
    loadAllData();
  }, []);

  const handleSaveHero = async () => {
    await updateHeroData(heroData);
    setSavedMsg("Hero section updated!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleSaveProducts = async () => {
    await updateProducts(products);
    setSavedMsg("Products updated!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleSaveContact = async () => {
    await updateContactData(contactData);
    setSavedMsg("Contact info updated!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleSaveAbout = async () => {
    await updateAboutData(aboutData);
    setSavedMsg("About section updated!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleLogout = () => {
    clearAdminSession();
    onLogout();
  };

  const updateProductField = (
    id: string,
    field: keyof Product,
    value: string | string[] | Record<string, string>
  ) => {
    setProductsState(
      products.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewProduct({ ...newProduct, image: file });
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setNewProduct({ ...newProduct, gallery: files });
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.description) {
      try {
        const formData = new FormData();

        formData.append("id", newProduct.id);
        formData.append("name", newProduct.name);
        formData.append("subtitle", newProduct.subtitle || "");
        formData.append("botanicalName", newProduct.botanicalName || "");
        formData.append("form", newProduct.form || "");
        formData.append("packaging", newProduct.packaging || "");
        formData.append("origin", newProduct.origin || "");
        formData.append("description", newProduct.description || "");
        formData.append("benefits", newProduct.benefits || "");
        formData.append("details", newProduct.details || "");
        formData.append("metaTitle", newProduct.metaTitle || "");
        formData.append("metaDescription", newProduct.metaDescription || "");

        // ✅ Convert specifications to JSON string
        formData.append(
          "specifications",
          JSON.stringify(newProduct.specifications || {})
        );

        // ✅ Add main image if present
        if (newProduct.image instanceof File) {
          formData.append("image", newProduct.image);
        }

        // ✅ Add gallery images
        if (
          Array.isArray(newProduct.gallery) &&
          newProduct.gallery.length > 0
        ) {
          newProduct.gallery.forEach((file) => {
            if (file instanceof File) formData.append("gallery", file);
          });
        }

        // ✅ Send FormData directly (no JSON.stringify)
        const res = await fetch(`${process.env.NEXT_PUBLIC_}/api/products`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to create product");

        const added = await res.json();

        if (added) {
          setProductsState((prev) => [...prev, added]);

          // ✅ Reset form after success
          setNewProduct({
            id: "",
            name: "",
            subtitle: "",
            botanicalName: "",
            form: "",
            packaging: "",
            origin: "",
            specifications: {},
            description: "",
            benefits: "",
            details: "",
            image: null,
            gallery: [],
            metaTitle: "",
            metaDescription: "",
          });

          setSavedMsg("✅ Product added successfully!");
          setTimeout(() => setSavedMsg(""), 3000);
        }
      } catch (error) {
        console.error("❌ Error adding product:", error);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProductsState(products.filter((p) => p.id !== id));
    setSavedMsg("Product deleted!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleSaveHeaderFooter = async () => {
    await updateHeaderFooterData(headerFooterData);
    setSavedMsg("Header & Footer updated!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white p-3 md:p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-lg md:text-2xl font-bold truncate">
          Admin Dashboard - Agro TechieMentor
        </h1>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-white text-orange-600 hover:bg-gray-100 text-sm md:text-base"
        >
          Logout
        </Button>
      </div>

      {savedMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-3 md:px-4 py-2 md:py-3 m-3 md:m-4 rounded text-sm md:text-base">
          {savedMsg}
        </div>
      )}

      <div className="p-3 md:p-8 overflow-x-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 md:mb-8 text-xs md:text-sm">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="headerFooter">Header/Footer</TabsTrigger>
          </TabsList>

          {/* Hero Tab */}
          <TabsContent value="hero">
            {heroData && (
              <Card className="p-4 md:p-6 space-y-3 md:space-y-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Hero Section
                </h2>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Title
                  </label>
                  <Input
                    value={heroData.title}
                    onChange={(e) =>
                      setHeroData({ ...heroData, title: e.target.value })
                    }
                    placeholder="Hero title"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Subtitle
                  </label>
                  <Textarea
                    value={heroData.subtitle}
                    onChange={(e) =>
                      setHeroData({ ...heroData, subtitle: e.target.value })
                    }
                    placeholder="Hero subtitle"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    CTA Button Text
                  </label>
                  <Input
                    value={heroData.cta_text}
                    onChange={(e) =>
                      setHeroData({ ...heroData, cta_text: e.target.value })
                    }
                    placeholder="Button text"
                    className="w-full text-sm"
                  />
                </div>
                <Button
                  onClick={handleSaveHero}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base"
                >
                  Save Hero Section
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl space-y-5">
                <CardHeader className="pb-2 border-b border-blue-100">
                  <CardTitle className="flex items-center gap-2 text-blue-700 text-xl font-semibold">
                    <Plus size={22} /> Add New Product
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Product Info Section */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Info size={18} /> Basic Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Subtitle"
                        value={newProduct.subtitle || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            subtitle: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Botanical Name"
                        value={newProduct.botanicalName || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            botanicalName: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Form"
                        value={newProduct.form || ""}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, form: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Packaging"
                        value={newProduct.packaging || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            packaging: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Origin"
                        value={newProduct.origin || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            origin: e.target.value,
                          })
                        }
                      />
                      {/* ✅ New Meta Title Field */}
                      <Input
                        placeholder="Meta Title"
                        value={newProduct.metaTitle || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            metaTitle: e.target.value,
                          })
                        }
                      />
                      {/* ✅ New Meta Description Field */}
                      <Textarea
                        placeholder="Meta Description"
                        value={newProduct.metaDescription || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            metaDescription: e.target.value,
                          })
                        }
                        rows={2}
                        className="resize-none border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <ImageIcon size={18} /> Upload Images
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="border border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 rounded-lg p-3 flex items-center justify-center cursor-pointer">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="border border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 rounded-lg p-3 flex items-center justify-center cursor-pointer">
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleGalleryChange}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      📋 Specifications
                    </h4>
                    <Textarea
                      placeholder="Enter specifications (e.g., Color: Yellow, Moisture: 10%)"
                      value={Object.entries(newProduct.specifications || {})
                        .map(([key, val]) => `${key}: ${val}`)
                        .join(", ")}
                      onChange={(e) => {
                        const text = e.target.value;
                        const pairs = text.split(",").map((pair) => {
                          const [key, ...rest] = pair.split(":");
                          const value = rest.join(":").trim();
                          return [key?.trim(), value];
                        });
                        const validEntries = pairs.filter(
                          ([key]) => key && key.length > 0
                        );
                        const obj = Object.fromEntries(validEntries);
                        setNewProduct({
                          ...newProduct,
                          specifications: obj,
                        });
                      }}
                      rows={3}
                      className="resize-none border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg"
                    />
                  </div>

                  {/* Description Section */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Description"
                      value={newProduct.description || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                    />
                    <Textarea
                      placeholder="Benefits"
                      value={newProduct.benefits || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          benefits: e.target.value,
                        })
                      }
                    />
                    <Textarea
                      placeholder="Details"
                      value={newProduct.details || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          details: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Add Button */}
                  <Button
                    onClick={handleAddProduct}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Add Product
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Products */}
              {products.map((product) => (
                <Card key={product.id} className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <Button
                      onClick={() => handleDeleteProduct(product.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 size={16} /> Delete
                    </Button>
                  </div>

                  {/* Editable Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      value={product.name}
                      onChange={(e) =>
                        updateProductField(product.id, "name", e.target.value)
                      }
                      placeholder="Name"
                    />
                    <Input
                      value={product.subtitle || ""}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "subtitle",
                          e.target.value
                        )
                      }
                      placeholder="Subtitle"
                    />
                    <Input
                      value={product.image || ""}
                      onChange={(e) =>
                        updateProductField(product.id, "image", e.target.value)
                      }
                      placeholder="Main Image URL"
                    />
                    <Input
                      value={product.botanicalName || ""}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "botanicalName",
                          e.target.value
                        )
                      }
                      placeholder="Botanical Name"
                    />
                    <Input
                      value={product.form || ""}
                      onChange={(e) =>
                        updateProductField(product.id, "form", e.target.value)
                      }
                      placeholder="Form"
                    />
                    <Input
                      value={product.packaging || ""}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "packaging",
                          e.target.value
                        )
                      }
                      placeholder="Packaging"
                    />
                    <Input
                      value={product.origin || ""}
                      onChange={(e) =>
                        updateProductField(product.id, "origin", e.target.value)
                      }
                      placeholder="Origin"
                    />
                  </div>

                  <Textarea
                    value={(product.gallery || []).join(", ")}
                    onChange={(e) =>
                      updateProductField(
                        product.id,
                        "gallery",
                        e.target.value.split(",").map((url) => url.trim())
                      )
                    }
                    placeholder="Gallery URLs (comma separated)"
                    rows={2}
                  />

                  <Textarea
                    value={
                      product.specifications
                        ? Object.entries(product.specifications)
                            .map(([key, val]) => `${key}: ${val}`)
                            .join(", ")
                        : ""
                    }
                    onChange={(e) => {
                      const entries = e.target.value
                        .split(",")
                        .map((pair) => pair.split(":"));
                      const obj = Object.fromEntries(
                        entries.map(([k, v]) => [k?.trim(), v?.trim()])
                      );
                      updateProductField(product.id, "specifications", obj);
                    }}
                    placeholder="Specifications (key: value)"
                    rows={2}
                  />

                  <Textarea
                    value={product.description || ""}
                    onChange={(e) =>
                      updateProductField(
                        product.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description"
                    rows={2}
                  />
                  <Textarea
                    value={product.benefits || ""}
                    onChange={(e) =>
                      updateProductField(product.id, "benefits", e.target.value)
                    }
                    placeholder="Benefits"
                    rows={2}
                  />
                  <Textarea
                    value={product.details || ""}
                    onChange={(e) =>
                      updateProductField(product.id, "details", e.target.value)
                    }
                    placeholder="Details"
                    rows={2}
                  />
                </Card>
              ))}

              <Button
                onClick={handleSaveProducts}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                Save All Products
              </Button>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            {contactData && (
              <Card className="p-4 md:p-6 space-y-3 md:space-y-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Contact Information
                </h2>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={contactData.email}
                    onChange={(e) =>
                      setContactDataState({
                        ...contactData,
                        email: e.target.value,
                      })
                    }
                    placeholder="Contact email"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Phone
                  </label>
                  <Input
                    value={contactData.phone}
                    onChange={(e) =>
                      setContactDataState({
                        ...contactData,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Contact phone"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Address
                  </label>
                  <Textarea
                    value={contactData.address}
                    onChange={(e) =>
                      setContactDataState({
                        ...contactData,
                        address: e.target.value,
                      })
                    }
                    placeholder="Contact address"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Website
                  </label>
                  <Input
                    value={contactData.website}
                    onChange={(e) =>
                      setContactDataState({
                        ...contactData,
                        website: e.target.value,
                      })
                    }
                    placeholder="Website URL"
                    className="w-full text-sm"
                  />
                </div>
                <Button
                  onClick={handleSaveContact}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base"
                >
                  Save Contact Information
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            {aboutData && (
              <Card className="p-4 md:p-6 space-y-3 md:space-y-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  About Section
                </h2>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Title
                  </label>
                  <Input
                    value={aboutData.title}
                    onChange={(e) =>
                      setAboutDataState({ ...aboutData, title: e.target.value })
                    }
                    placeholder="About title"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Description
                  </label>
                  <Textarea
                    value={aboutData.description}
                    onChange={(e) =>
                      setAboutDataState({
                        ...aboutData,
                        description: e.target.value,
                      })
                    }
                    placeholder="About description"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Mission
                  </label>
                  <Textarea
                    value={aboutData.mission}
                    onChange={(e) =>
                      setAboutDataState({
                        ...aboutData,
                        mission: e.target.value,
                      })
                    }
                    placeholder="Company mission"
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Vision
                  </label>
                  <Textarea
                    value={aboutData.vision}
                    onChange={(e) =>
                      setAboutDataState({
                        ...aboutData,
                        vision: e.target.value,
                      })
                    }
                    placeholder="Company vision"
                    className="w-full text-sm"
                  />
                </div>
                <Button
                  onClick={handleSaveAbout}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base"
                >
                  Save About Section
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Header & Footer Tab */}
          <TabsContent value="headerFooter">
            {headerFooterData && (
              <Card className="p-4 md:p-6 space-y-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Header & Footer Settings
                </h2>

                <div className="border-t pt-4">
                  <h3 className="font-bold text-gray-800 mb-4">General</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                        Website Name
                      </label>
                      <Input
                        value={headerFooterData.websiteName}
                        onChange={(e) =>
                          setHeaderFooterData({
                            ...headerFooterData,
                            websiteName: e.target.value,
                          })
                        }
                        placeholder="Website name"
                        className="w-full text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                        Logo URL
                      </label>
                      <Input
                        value={headerFooterData.logo}
                        onChange={(e) =>
                          setHeaderFooterData({
                            ...headerFooterData,
                            logo: e.target.value,
                          })
                        }
                        placeholder="Logo image URL"
                        className="w-full text-sm"
                      />
                      {headerFooterData.logo && (
                        <img
                          src={headerFooterData.logo || "/placeholder.svg"}
                          alt="Logo preview"
                          className="mt-2 h-12 w-12 rounded object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-bold text-gray-800 mb-4">Header Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                        Phone
                      </label>
                      <Input
                        value={headerFooterData.headerPhone}
                        onChange={(e) =>
                          setHeaderFooterData({
                            ...headerFooterData,
                            headerPhone: e.target.value,
                          })
                        }
                        placeholder="Header phone"
                        className="w-full text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={headerFooterData.headerEmail}
                        onChange={(e) =>
                          setHeaderFooterData({
                            ...headerFooterData,
                            headerEmail: e.target.value,
                          })
                        }
                        placeholder="Header email"
                        className="w-full text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-bold text-gray-800 mb-4">Footer Info</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                        Description
                      </label>
                      <Textarea
                        value={headerFooterData.footerDescription}
                        onChange={(e) =>
                          setHeaderFooterData({
                            ...headerFooterData,
                            footerDescription: e.target.value,
                          })
                        }
                        placeholder="Footer description"
                        className="w-full text-sm"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Address
                        </label>
                        <Input
                          value={headerFooterData.footerAddress}
                          onChange={(e) =>
                            setHeaderFooterData({
                              ...headerFooterData,
                              footerAddress: e.target.value,
                            })
                          }
                          placeholder="Footer address"
                          className="w-full text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Phone
                        </label>
                        <Input
                          value={headerFooterData.footerPhone}
                          onChange={(e) =>
                            setHeaderFooterData({
                              ...headerFooterData,
                              footerPhone: e.target.value,
                            })
                          }
                          placeholder="Footer phone"
                          className="w-full text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={headerFooterData.footerEmail}
                          onChange={(e) =>
                            setHeaderFooterData({
                              ...headerFooterData,
                              footerEmail: e.target.value,
                            })
                          }
                          placeholder="Footer email"
                          className="w-full text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Website
                        </label>
                        <Input
                          value={headerFooterData.website}
                          onChange={(e) =>
                            setHeaderFooterData({
                              ...headerFooterData,
                              website: e.target.value,
                            })
                          }
                          placeholder="Website URL"
                          className="w-full text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSaveHeaderFooter}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base"
                >
                  Save Header & Footer
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
