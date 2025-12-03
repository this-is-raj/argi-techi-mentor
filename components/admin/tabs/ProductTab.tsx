import { useState, useEffect } from "react";
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
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ProductForm } from "@/types/product";
import Image from "next/image";

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
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setSavedMsg("❌ Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProducts = async () => {
    await fetchProducts();
    setSavedMsg("Products refreshed successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        setSavedMsg("Product deleted successfully!");
        setTimeout(() => setSavedMsg(""), 3000);
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setSavedMsg("❌ Failed to delete product");
    }
  };

  const handleUpdateProduct = async (product: any) => {
    try {
      const res = await fetch(`/api/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        setProducts(
          products.map((p) => (p.id === product.id ? { ...p, ...product } : p))
        );
        setEditingProductId(null);
        setSavedMsg("Product updated successfully!");
        setTimeout(() => setSavedMsg(""), 3000);
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setSavedMsg("❌ Failed to update product");
    }
  };

  const toggleProductExpansion = (productId: string) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
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

        const res = await fetch(`/api/products`, {
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

  const renderProductCard = (product: any) => {
    const isExpanded = expandedProducts.has(product.id);
    const isEditing = editingProductId === product.id;

    return (
      <Card
        key={product.id}
        className="border-2 border-emerald-100 shadow-sm rounded-xl overflow-hidden mb-4"
      >
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Package className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-emerald-900">
                  {isEditing ? (
                    <Input
                      value={product.name}
                      onChange={(e) =>
                        updateProductField(product.id, "name", e.target.value)
                      }
                      className="border-emerald-300"
                    />
                  ) : (
                    product.name
                  )}
                </CardTitle>
                <p className="text-sm text-emerald-600 mt-1">
                  {isEditing ? (
                    <Input
                      value={product.subtitle || ""}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "subtitle",
                          e.target.value
                        )
                      }
                      className="border-emerald-300 text-sm mt-1"
                    />
                  ) : (
                    product.subtitle
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleProductExpansion(product.id)}
                className="text-emerald-700 border-emerald-300 hover:bg-emerald-50"
              >
                {isExpanded ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-1" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </>
                )}
              </Button>
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleUpdateProduct(product)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProductId(null)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProductId(product.id)}
                    className="text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="p-6">
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                Main Image
              </h4>
              {product.image ? (
                <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden border border-emerald-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full max-w-md h-48 border-2 border-dashed border-emerald-300 rounded-lg flex items-center justify-center bg-emerald-50">
                  <ImageIcon className="w-12 h-12 text-emerald-400" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-emerald-800">
                  Botanical Name
                </label>
                {isEditing ? (
                  <Input
                    value={product.botanicalName || ""}
                    onChange={(e) =>
                      updateProductField(
                        product.id,
                        "botanicalName",
                        e.target.value
                      )
                    }
                    className="border-emerald-300 mt-1"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{product.botanicalName}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-emerald-800">
                  Form
                </label>
                {isEditing ? (
                  <Input
                    value={product.form || ""}
                    onChange={(e) =>
                      updateProductField(product.id, "form", e.target.value)
                    }
                    className="border-emerald-300 mt-1"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{product.form}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-emerald-800">
                  Packaging
                </label>
                {isEditing ? (
                  <Input
                    value={product.packaging || ""}
                    onChange={(e) =>
                      updateProductField(
                        product.id,
                        "packaging",
                        e.target.value
                      )
                    }
                    className="border-emerald-300 mt-1"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{product.packaging}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-emerald-800">
                  Origin
                </label>
                {isEditing ? (
                  <Input
                    value={product.origin || ""}
                    onChange={(e) =>
                      updateProductField(product.id, "origin", e.target.value)
                    }
                    className="border-emerald-300 mt-1"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{product.origin}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                SEO Information
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-emerald-800">
                    Meta Title
                  </label>
                  {isEditing ? (
                    <Input
                      value={product.metaTitle || ""}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "metaTitle",
                          e.target.value
                        )
                      }
                      className="border-emerald-300 mt-1"
                    />
                  ) : (
                    <p className="text-gray-700 mt-1 text-sm">
                      {product.metaTitle}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-emerald-800">
                    Meta Description
                  </label>
                  {isEditing ? (
                    <Textarea
                      value={product.metaDescription || ""}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "metaDescription",
                          e.target.value
                        )
                      }
                      className="border-emerald-300 mt-1"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-700 mt-1 text-sm">
                      {product.metaDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                Specifications
              </h4>
              {isEditing ? (
                <Textarea
                  value={Object.entries(product.specifications || {})
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

                    updateProductField(product.id, "specifications", obj);
                  }}
                  rows={4}
                  className="border-emerald-300 font-mono text-sm"
                />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications || {}).map(
                    ([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-sm font-medium text-emerald-800">
                          {key}:
                        </span>
                        <span className="text-sm text-gray-700">
                          {value as string}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-emerald-800">
                  Description
                </label>
                {isEditing ? (
                  <Textarea
                    value={product.description || ""}
                    onChange={(e) =>
                      updateProductField(
                        product.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="border-emerald-300 mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{product.description}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-emerald-800">
                  Benefits
                </label>
                {isEditing ? (
                  <Textarea
                    value={product.benefits || ""}
                    onChange={(e) =>
                      updateProductField(product.id, "benefits", e.target.value)
                    }
                    className="border-emerald-300 mt-1"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{product.benefits}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-emerald-800">
                  Additional Details
                </label>
                {isEditing ? (
                  <Textarea
                    value={product.details || ""}
                    onChange={(e) =>
                      updateProductField(product.id, "details", e.target.value)
                    }
                    className="border-emerald-300 mt-1"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{product.details}</p>
                )}
              </div>
            </div>

            {product.gallery && product.gallery.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                  Gallery Images
                </h4>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.gallery.map((img: string, index: number) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded-lg overflow-hidden border border-emerald-200 flex-shrink-0"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-1">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900">
            Product Management
          </h2>
          <p className="text-emerald-600">
            Add, edit, and manage your agricultural products
          </p>
        </div>
        <Button
          onClick={handleSaveProducts}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Refresh Products
        </Button>
      </div>

      <Card className="border-2 border-emerald-100 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
          <CardTitle className="flex items-center gap-3 text-emerald-900 text-xl font-bold">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Package className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              All Products ({products.length})
              <p className="text-sm font-normal text-emerald-600 mt-1">
                View and manage all products in your catalog
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-emerald-600 mt-2">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <p className="text-emerald-600">No products found</p>
              <p className="text-sm text-emerald-500 mt-1">
                Add your first product using the form below
              </p>
            </div>
          ) : (
            <div className="space-y-4">{products.map(renderProductCard)}</div>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 border-emerald-100 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-b from-white to-emerald-50/30">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
          <CardTitle className="flex items-center gap-3 text-emerald-900 text-2xl font-bold">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-sm">
              <Plus className="w-6 h-6 text-white" />
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
