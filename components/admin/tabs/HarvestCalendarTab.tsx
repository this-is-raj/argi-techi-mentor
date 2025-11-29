"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, ImageIcon, Calendar, Loader2 } from "lucide-react";

interface HarvestProduct {
  id?: string;
  _id?: string;
  name: string;
  months: number[];
  color: string;
  image: string;
}

export default function HarvestCalendarTab() {
  const months = [
    { name: "Jan", full: "January" },
    { name: "Feb", full: "February" },
    { name: "Mar", full: "March" },
    { name: "Apr", full: "April" },
    { name: "May", full: "May" },
    { name: "Jun", full: "June" },
    { name: "Jul", full: "July" },
    { name: "Aug", full: "August" },
    { name: "Sep", full: "September" },
    { name: "Oct", full: "October" },
    { name: "Nov", full: "November" },
    { name: "Dec", full: "December" },
  ];

  const [harvestData, setHarvestData] = useState<HarvestProduct[]>([]);
  const [newProduct, setNewProduct] = useState<HarvestProduct>({
    name: "",
    months: [],
    color: "bg-gray-500",
    image: "",
  });
  const [savedMsg, setSavedMsg] = useState("");
  const [activeTab, setActiveTab] = useState("view");
  const [loading, setLoading] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);

  // API base URL
  const API_BASE = "/api/harvest-calendar";

  // Load data from API on component mount
  useEffect(() => {
    fetchHarvestData();
  }, []);

  const fetchHarvestData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setHarvestData(data);
    } catch (error) {
      console.error("Error fetching harvest data:", error);
      setSavedMsg("Error loading harvest data");
      setTimeout(() => setSavedMsg(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.months.length > 0) {
      setAddingProduct(true);
      try {
        const response = await fetch(API_BASE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
          throw new Error("Failed to add product");
        }

        const result = await response.json();

        if (result.success) {
          // Refresh the data to get the new product with _id
          await fetchHarvestData();
          setNewProduct({
            name: "",
            months: [],
            color: "bg-gray-500",
            image: "",
          });
          setSavedMsg("Product added successfully!");
          setTimeout(() => setSavedMsg(""), 3000);
        }
      } catch (error) {
        console.error("Error adding product:", error);
        setSavedMsg("Error adding product");
        setTimeout(() => setSavedMsg(""), 3000);
      } finally {
        setAddingProduct(false);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const result = await response.json();

      if (result.success) {
        setHarvestData(
          harvestData.filter(
            (product) => product._id !== id && product.id !== id
          )
        );
        setSavedMsg("Product deleted!");
        setTimeout(() => setSavedMsg(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setSavedMsg("Error deleting product");
      setTimeout(() => setSavedMsg(""), 3000);
    }
  };

  const toggleMonth = (monthIndex: number) => {
    setNewProduct((prev) => ({
      ...prev,
      months: prev.months.includes(monthIndex)
        ? prev.months.filter((m) => m !== monthIndex)
        : [...prev.months, monthIndex].sort((a, b) => a - b),
    }));
  };

  const updateProductField = async (
    id: string,
    field: keyof HarvestProduct,
    value: any
  ) => {
    try {
      const response = await fetch(API_BASE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          field,
          value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const result = await response.json();

      if (result.success) {
        const updatedData = harvestData.map((product) =>
          product._id === id || product.id === id
            ? { ...product, [field]: value }
            : product
        );
        setHarvestData(updatedData);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setSavedMsg("Error updating product");
      setTimeout(() => setSavedMsg(""), 3000);
    }
  };

  const colorOptions = [
    { value: "bg-red-500", label: "Red" },
    { value: "bg-amber-500", label: "Amber" },
    { value: "bg-yellow-500", label: "Yellow" },
    { value: "bg-emerald-500", label: "Emerald" },
    { value: "bg-green-500", label: "Green" },
    { value: "bg-blue-500", label: "Blue" },
    { value: "bg-indigo-500", label: "Indigo" },
    { value: "bg-purple-500", label: "Purple" },
    { value: "bg-pink-500", label: "Pink" },
    { value: "bg-gray-800", label: "Dark Gray" },
    { value: "bg-orange-500", label: "Orange" },
    { value: "bg-teal-500", label: "Teal" },
  ];

  // Helper function to get product ID (handles both _id and id)
  const getProductId = (product: HarvestProduct) => {
    return product._id || product.id || "";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Harvest Calendar Admin
          </h1>
          <p className="text-gray-600">
            Manage harvest seasons and product availability
          </p>
        </div>

        {savedMsg && (
          <div
            className={`px-4 py-3 rounded mb-6 ${
              savedMsg.includes("Error")
                ? "bg-red-100 border border-red-400 text-red-700"
                : "bg-green-100 border border-green-400 text-green-700"
            }`}
          >
            {savedMsg}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="view" className="flex items-center gap-2">
              <Calendar size={16} />
              View Calendar
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Plus size={16} />
              Manage Products
            </TabsTrigger>
          </TabsList>

          {/* View Calendar Tab */}
          <TabsContent value="view">
            <Card>
              <CardHeader>
                <CardTitle>Harvest Calendar Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                  </div>
                ) : (
                  <section className="py-8 px-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                    <div className="max-w-7xl mx-auto">
                      {/* Header Section */}
                      <div className="text-center mb-12">
                        <span className="text-green-600 uppercase tracking-widest text-sm font-semibold mb-3 block">
                          Farming Schedule
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                          Harvest Calendar
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                          Track the optimal harvesting periods for our premium
                          agricultural products. Freshness guaranteed through
                          seasonal farming practices.
                        </p>
                      </div>

                      {/* Calendar Container */}
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-white text-xl font-semibold">
                              Harvest Timeline
                            </h3>
                            <div className="flex items-center space-x-2 text-white/90 text-sm">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                                <span>Peak Season</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Calendar Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="py-4 px-6 text-left font-semibold text-gray-700 min-w-[200px]">
                                  Product
                                </th>
                                {months.map((month, index) => (
                                  <th
                                    key={index}
                                    className="py-4 px-3 text-center font-medium text-gray-600 text-sm border-l border-gray-200"
                                  >
                                    <div className="flex flex-col items-center">
                                      <span className="font-semibold">
                                        {month.name}
                                      </span>
                                      <span className="text-xs text-gray-500 mt-1">
                                        {month.full}
                                      </span>
                                    </div>
                                  </th>
                                ))}
                              </tr>
                            </thead>

                            <tbody>
                              {harvestData.map((product, rowIndex) => (
                                <tr
                                  key={getProductId(product)}
                                  className="border-b border-gray-100 hover:bg-green-50/50 transition-colors duration-200"
                                >
                                  {/* Product Cell */}
                                  <td className="py-4 px-6">
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className={`w-10 h-10 rounded-lg ${product.color} flex items-center justify-center shadow-sm`}
                                      >
                                        {product.image ? (
                                          <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-6 h-6 object-contain"
                                          />
                                        ) : (
                                          <span className="text-white text-xs font-bold">
                                            {product.name.charAt(0)}
                                          </span>
                                        )}
                                      </div>
                                      <div>
                                        <span className="font-semibold text-gray-900 block">
                                          {product.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {product.months.length} month
                                          {product.months.length > 1 ? "s" : ""}
                                        </span>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Month Cells */}
                                  {months.map((_, monthIndex) => {
                                    const isHarvestMonth =
                                      product.months.includes(monthIndex);
                                    const isPeakMonth =
                                      product.months.includes(monthIndex) &&
                                      (monthIndex === product.months[0] ||
                                        monthIndex ===
                                          product.months[
                                            product.months.length - 1
                                          ]);

                                    return (
                                      <td
                                        key={monthIndex}
                                        className="py-3 px-2 text-center border-l border-gray-100"
                                      >
                                        {isHarvestMonth ? (
                                          <div className="flex flex-col items-center">
                                            <div
                                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                isPeakMonth
                                                  ? "bg-green-500 animate-pulse"
                                                  : "bg-green-400"
                                              } shadow-sm`}
                                            >
                                              <svg
                                                className="w-4 h-4 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            </div>
                                            {isPeakMonth && (
                                              <span className="text-xs text-green-600 font-medium mt-1">
                                                Peak
                                              </span>
                                            )}
                                          </div>
                                        ) : (
                                          <div className="w-8 h-8 rounded-full bg-gray-100 mx-auto"></div>
                                        )}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Table Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>Peak Harvest</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <span>Harvest Season</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-100 rounded-full border border-gray-300"></div>
                                <span>Off Season</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Products Tab */}
          <TabsContent value="manage">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add New Product Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus size={20} />
                    Add New Product
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <Input
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Image
                    </label>

                    {/* Image Preview */}
                    {newProduct.image && (
                      <div className="mb-3">
                        <img
                          src={newProduct.image}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded border"
                        />
                      </div>
                    )}

                    {/* File Selector */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const imageURL = URL.createObjectURL(file);
                          setNewProduct({ ...newProduct, image: imageURL });
                        }
                      }}
                      className="block w-full text-sm text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <select
                      value={newProduct.color}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, color: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {colorOptions.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded ${newProduct.color}`}
                      ></div>
                      <span className="text-sm text-gray-600">
                        Preview color
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harvest Months
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {months.map((month, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => toggleMonth(index)}
                          className={`p-2 rounded text-sm font-medium transition-colors ${
                            newProduct.months.includes(index)
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {month.name}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Selected:{" "}
                      {newProduct.months.map((m) => months[m].name).join(", ")}
                    </div>
                  </div>

                  <Button
                    onClick={handleAddProduct}
                    disabled={
                      !newProduct.name ||
                      newProduct.months.length === 0 ||
                      addingProduct
                    }
                    className="w-full"
                  >
                    {addingProduct ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Adding...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Products List */}
              <Card>
                <CardHeader>
                  <CardTitle>Manage Products ({harvestData.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {harvestData.map((product) => (
                        <div
                          key={getProductId(product)}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded ${product.color} flex items-center justify-center`}
                              >
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-4 h-4 object-contain"
                                  />
                                ) : (
                                  <span className="text-white text-xs font-bold">
                                    {product.name.charAt(0)}
                                  </span>
                                )}
                              </div>
                              <span className="font-semibold">
                                {product.name}
                              </span>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                handleDeleteProduct(getProductId(product))
                              }
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <label className="text-sm text-gray-600">
                                Image URL
                              </label>
                              <Input
                                value={product.image}
                                onChange={(e) =>
                                  updateProductField(
                                    getProductId(product),
                                    "image",
                                    e.target.value
                                  )
                                }
                                className="text-sm"
                              />
                            </div>

                            <div>
                              <label className="text-sm text-gray-600">
                                Color
                              </label>
                              <select
                                value={product.color}
                                onChange={(e) =>
                                  updateProductField(
                                    getProductId(product),
                                    "color",
                                    e.target.value
                                  )
                                }
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                              >
                                {colorOptions.map((color) => (
                                  <option key={color.value} value={color.value}>
                                    {color.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="text-sm text-gray-600">
                                Harvest Months
                              </label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {product.months.map((monthIndex) => (
                                  <span
                                    key={monthIndex}
                                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                                  >
                                    {months[monthIndex].name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
