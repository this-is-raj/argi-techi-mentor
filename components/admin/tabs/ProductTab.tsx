// components/admin/tabs/ProductsTab.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ImageIcon, Info } from "lucide-react";
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

  const handleSaveProducts = async () => {
    await updateProducts(products);
    setSavedMsg("Products updated!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
    setSavedMsg("Product deleted!");
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

          setSavedMsg("✅ Product added successfully!");
          setTimeout(() => setSavedMsg(""), 3000);
        }
      } catch (error) {
        console.error("❌ Error adding product:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Add New Product Form */}
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
    </div>
  );
}
