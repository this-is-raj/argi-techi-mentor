// components/admin/tabs/ProductsTab.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  ImageIcon,
  Info,
  Package,
  Trash2,
  Edit,
  Check,
  X,
  Upload,
  FileImage,
  Tag,
  Globe,
} from "lucide-react";
import { ProductForm } from "@/types/product";
import { updateProducts, deleteProduct } from "@/lib/db";

interface ProductsTabProps {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  setSavedMsg: (msg: string) => void;
}

export default function ProductsTab({
  products,
  setProducts,
  setSavedMsg,
}: ProductsTabProps) {
  const [newProduct, setNewProduct] = useState<ProductForm>({
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

  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSaveProducts = async () => {
    await updateProducts(products);
    setSavedMsg("Products updated successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
    setSavedMsg("Product deleted successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const updateProductField = (
    id: string,
    field: keyof ProductForm,
    value: any
  ) => {
    setProducts(
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
    setSelectedFiles(files);
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.description) {
      setUploading(true);
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

        formData.append(
          "specifications",
          JSON.stringify(newProduct.specifications || {})
        );

        if (newProduct.image instanceof File) {
          formData.append("image", newProduct.image);
        }

        if (
          Array.isArray(newProduct.gallery) &&
          newProduct.gallery.length > 0
        ) {
          newProduct.gallery.forEach((file) => {
            if (file instanceof File) formData.append("gallery", file);
          });
        }

        const res = await fetch(`${process.env.APP_HOST}/api/products`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to create product");

        const added = await res.json();

        if (added) {
          setProducts([...products, added]);

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
          setSelectedFiles([]);

          setSavedMsg("🎉 Product added successfully!");
          setTimeout(() => setSavedMsg(""), 3000);
        }
      } catch (error) {
        console.error("❌ Error adding product:", error);
        setSavedMsg("❌ Failed to add product");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="space-y-6 p-1">
      {/* Add New Product Form */}
      <Card className="border-2 border-emerald-100 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-b from-white to-emerald-50/30">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
          <CardTitle className="flex items-center gap-3 text-emerald-900 text-2xl font-bold">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-sm">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              Add New Product
              <p className="text-sm font-normal text-emerald-600 mt-1">
                Fill in the details to add a new agricultural product
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {/* Product Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <Info className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Product Name *
                </label>
                <Input
                  placeholder="e.g., Organic Turmeric Powder"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Subtitle
                </label>
                <Input
                  placeholder="Short description"
                  value={newProduct.subtitle || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      subtitle: e.target.value,
                    })
                  }
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Botanical Name
                </label>
                <Input
                  placeholder="e.g., Curcuma longa"
                  value={newProduct.botanicalName || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      botanicalName: e.target.value,
                    })
                  }
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Form
                </label>
                <Input
                  placeholder="e.g., Powder, Whole, Extract"
                  value={newProduct.form || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, form: e.target.value })
                  }
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Packaging
                </label>
                <Input
                  placeholder="e.g., 1kg pouch, 25kg bag"
                  value={newProduct.packaging || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      packaging: e.target.value,
                    })
                  }
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Origin
                </label>
                <Input
                  placeholder="e.g., Madhya Pradesh, India"
                  value={newProduct.origin || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      origin: e.target.value,
                    })
                  }
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl py-6"
                />
              </div>
            </div>
          </div>

          {/* SEO Meta Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <Globe className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900">
                SEO Meta Information
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Meta Title
                </label>
                <Input
                  placeholder="Optimized title for search engines"
                  value={newProduct.metaTitle || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      metaTitle: e.target.value,
                    })
                  }
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Meta Description
                </label>
                <Textarea
                  placeholder="Brief description for search engine results"
                  value={newProduct.metaDescription || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      metaDescription: e.target.value,
                    })
                  }
                  rows={3}
                  className="resize-none border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <ImageIcon className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900">
                Product Images
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Main Image
                </label>
                <div className="border-2 border-dashed border-emerald-300 bg-emerald-50 hover:bg-emerald-100 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:border-emerald-400">
                  <Upload className="w-8 h-8 text-emerald-500 mb-2" />
                  <p className="text-emerald-700 font-medium">
                    Upload Main Image
                  </p>
                  <p className="text-sm text-emerald-500 mt-1">
                    Recommended: 800x600px
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer mt-4 border-none bg-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Gallery Images
                </label>
                <div className="border-2 border-dashed border-emerald-300 bg-emerald-50 hover:bg-emerald-100 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:border-emerald-400">
                  <FileImage className="w-8 h-8 text-emerald-500 mb-2" />
                  <p className="text-emerald-700 font-medium">
                    Upload Gallery Images
                  </p>
                  <p className="text-sm text-emerald-500 mt-1">
                    Select multiple images
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryChange}
                    className="cursor-pointer mt-4 border-none bg-transparent"
                  />
                </div>
                {selectedFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-emerald-700">
                      {selectedFiles.length} file(s) selected
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <Tag className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900">
                Specifications
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-800">
                Enter specifications as key-value pairs
              </label>
              <Textarea
                placeholder="Format: key: value
Example:
Color: Yellow
Moisture: 10% max
Purity: 98%
Ash Content: 5% max"
                value={Object.entries(newProduct.specifications || {})
                  .map(([key, val]) => `${key}: ${val}`)
                  .join("\n")}
                onChange={(e) => {
                  const text = e.target.value;
                  const lines = text.split("\n");
                  const obj: Record<string, string> = {};

                  lines.forEach((line) => {
                    const [key, ...rest] = line.split(":");
                    const value = rest.join(":").trim();
                    if (key?.trim()) {
                      obj[key.trim()] = value;
                    }
                  });

                  setNewProduct({
                    ...newProduct,
                    specifications: obj,
                  });
                }}
                rows={6}
                className="resize-none border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl font-mono text-sm"
              />
              <p className="text-xs text-emerald-500">
                Enter each specification on a new line in "key: value" format
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <Edit className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900">
                Product Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Description *
                </label>
                <Textarea
                  placeholder="Detailed description of the product..."
                  value={newProduct.description || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="resize-none border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Benefits
                </label>
                <Textarea
                  placeholder="Health benefits, uses, advantages..."
                  value={newProduct.benefits || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      benefits: e.target.value,
                    })
                  }
                  rows={3}
                  className="resize-none border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-800">
                  Additional Details
                </label>
                <Textarea
                  placeholder="Storage instructions, shelf life, handling..."
                  value={newProduct.details || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      details: e.target.value,
                    })
                  }
                  rows={3}
                  className="resize-none border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Add Button */}
          <div className="pt-4">
            <Button
              onClick={handleAddProduct}
              disabled={
                uploading || !newProduct.name || !newProduct.description
              }
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding Product...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Product
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
