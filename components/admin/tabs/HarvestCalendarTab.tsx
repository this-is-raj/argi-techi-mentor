"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Calendar, Loader2, Edit2, X } from "lucide-react";

interface HarvestProduct {
  _id: string;
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
  const [newProduct, setNewProduct] = useState<
    Omit<HarvestProduct, "_id"> & { _id?: string }
  >({
    name: "",
    months: [],
    color: "bg-gray-500",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState<HarvestProduct | null>(
    null
  );
  const [savedMsg, setSavedMsg] = useState("");
  const [activeTab, setActiveTab] = useState("view");
  const [loading, setLoading] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);

  const api_BASE = `/api/harvest-calendar`;

  useEffect(() => {
    fetchHarvestData();
  }, []);

  const fetchHarvestData = async () => {
    setLoading(true);
    try {
      const response = await fetch(api_BASE);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setHarvestData(data);
    } catch (error) {
      console.error("Error fetching harvest data:", error);
      showMessage("Error loading harvest data", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setSavedMsg(message);
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || newProduct.months.length === 0) {
      showMessage("Please fill all required fields", "error");
      return;
    }

    setAddingProduct(true);
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("color", newProduct.color);
    formData.append("months", JSON.stringify(newProduct.months));

    // Handle image file
    const imageInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;
    if (imageInput?.files?.[0]) {
      formData.append("image", imageInput.files[0]);
    }

    try {
      const response = await fetch(api_BASE, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      await fetchHarvestData();
      setNewProduct({
        name: "",
        months: [],
        color: "bg-gray-500",
        image: "",
      });

      // Clear file input
      if (imageInput) imageInput.value = "";

      showMessage("Product added successfully!");
    } catch (error: any) {
      console.error("Error adding product:", error);
      showMessage(error.message || "Error adding product", "error");
    } finally {
      setAddingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`${api_BASE}?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      setHarvestData(harvestData.filter((product) => product._id !== id));
      showMessage("Product deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting product:", error);
      showMessage(error.message || "Error deleting product", "error");
    }
  };

  const handleUpdateProduct = async (product: HarvestProduct) => {
    if (!product._id || !product.name || product.months.length === 0) {
      showMessage("Please fill all required fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("color", product.color);
    formData.append("months", JSON.stringify(product.months));

    // Handle image file for update
    const imageInput = document.getElementById(
      `imageInput-${product._id}`
    ) as HTMLInputElement;
    if (imageInput?.files?.[0]) {
      formData.append("image", imageInput.files[0]);
    }

    try {
      const response = await fetch(`${api_BASE}?id=${product._id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      await fetchHarvestData();
      setEditingProduct(null);
      showMessage("Product updated successfully!");
    } catch (error: any) {
      console.error("Error updating product:", error);
      showMessage(error.message || "Error updating product", "error");
    }
  };

  const toggleMonth = (monthIndex: number, product?: HarvestProduct) => {
    if (product && editingProduct?._id === product._id && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        months: editingProduct.months.includes(monthIndex)
          ? editingProduct.months.filter((m) => m !== monthIndex)
          : [...editingProduct.months, monthIndex].sort((a, b) => a - b),
      });
    } else {
      setNewProduct((prev) => ({
        ...prev,
        months: prev.months.includes(monthIndex)
          ? prev.months.filter((m) => m !== monthIndex)
          : [...prev.months, monthIndex].sort((a, b) => a - b),
      }));
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
    { value: "bg-white border border-gray-300", label: "White" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
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
                      <div className="text-center mb-12">
                        <span className="text-green-600 uppercase tracking-widest text-sm font-semibold mb-3 block">
                          Farming Schedule
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                          Harvest Calendar
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                          Track the optimal harvesting periods for our premium
                          agricultural products.
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                              {harvestData.map((product) => (
                                <tr
                                  key={product._id}
                                  className="border-b border-gray-100 hover:bg-green-50/50 transition-colors duration-200"
                                >
                                  <td className="py-4 px-6">
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className={`w-10 h-10 rounded-lg ${product.color} flex items-center justify-center shadow-sm`}
                                      >
                                        {product.image ? (
                                          <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-8 h-8 object-contain"
                                            onError={(e) => {
                                              (
                                                e.target as HTMLImageElement
                                              ).style.display = "none";
                                              const parent = (
                                                e.target as HTMLImageElement
                                              ).parentElement;
                                              if (parent) {
                                                parent.innerHTML = `<span class="text-white text-sm font-bold">${product.name.charAt(
                                                  0
                                                )}</span>`;
                                              }
                                            }}
                                          />
                                        ) : (
                                          <span className="text-white text-sm font-bold">
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

                                  {months.map((_, monthIndex) => {
                                    const isHarvestMonth =
                                      product.months.includes(monthIndex);
                                    const isPeakMonth =
                                      isHarvestMonth &&
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
                      Product Name *
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
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: JPG, PNG, WebP
                    </p>
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
                      Harvest Months *
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
                      {newProduct.months
                        .map((m) => months[m].name)
                        .join(", ") || "None"}
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

              <Card>
                <CardHeader>
                  <CardTitle>Manage Products ({harvestData.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                    </div>
                  ) : harvestData.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No products added yet
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {harvestData.map((product) => (
                        <div
                          key={product._id}
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
                                    className="w-5 h-5 object-contain"
                                    onError={(e) => {
                                      (
                                        e.target as HTMLImageElement
                                      ).style.display = "none";
                                      const parent = (
                                        e.target as HTMLImageElement
                                      ).parentElement;
                                      if (parent) {
                                        parent.innerHTML = `<span class="text-white text-xs font-bold">${product.name.charAt(
                                          0
                                        )}</span>`;
                                      }
                                    }}
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
                            <div className="flex items-center gap-2">
                              {editingProduct?._id === product._id ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingProduct(null)}
                                >
                                  <X size={16} />
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingProduct(product)}
                                >
                                  <Edit2 size={16} />
                                </Button>
                              )}
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteProduct(product._id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>

                          {editingProduct?._id === product._id ? (
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm text-gray-600">
                                  Product Name *
                                </label>
                                <Input
                                  value={editingProduct.name}
                                  onChange={(e) =>
                                    setEditingProduct(
                                      editingProduct
                                        ? {
                                            ...editingProduct,
                                            name: e.target.value,
                                          }
                                        : null
                                    )
                                  }
                                  className="text-sm mt-1"
                                />
                              </div>

                              <div>
                                <label className="text-sm text-gray-600">
                                  Update Image
                                </label>
                                <input
                                  id={`imageInput-${product._id}`}
                                  type="file"
                                  accept="image/*"
                                  className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Leave empty to keep current image
                                </p>
                              </div>

                              <div>
                                <label className="text-sm text-gray-600">
                                  Color
                                </label>
                                <select
                                  value={editingProduct.color}
                                  onChange={(e) =>
                                    setEditingProduct(
                                      editingProduct
                                        ? {
                                            ...editingProduct,
                                            color: e.target.value,
                                          }
                                        : null
                                    )
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm mt-1"
                                >
                                  {colorOptions.map((color) => (
                                    <option
                                      key={color.value}
                                      value={color.value}
                                    >
                                      {color.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="text-sm text-gray-600">
                                  Harvest Months *
                                </label>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {months.map((month, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() =>
                                        toggleMonth(index, product)
                                      }
                                      className={`px-2 py-1 text-xs rounded transition-colors ${
                                        editingProduct.months.includes(index)
                                          ? "bg-green-500 text-white"
                                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                      }`}
                                    >
                                      {month.name}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <Button
                                onClick={() =>
                                  editingProduct &&
                                  handleUpdateProduct(editingProduct)
                                }
                                disabled={
                                  !editingProduct?.name ||
                                  editingProduct.months.length === 0
                                }
                                className="w-full"
                              >
                                Update Product
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm text-gray-600">
                                  Image:
                                </span>
                                <p className="text-sm truncate">
                                  {product.image || "No image"}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-600">
                                  Color:
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                  <div
                                    className={`w-4 h-4 rounded ${product.color}`}
                                  ></div>
                                  <span className="text-sm">
                                    {product.color}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className="text-sm text-gray-600">
                                  Harvest Months:
                                </span>
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
                          )}
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
