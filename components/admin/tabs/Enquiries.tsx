"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  Filter,
  Search,
  ChevronDown,
  MessageSquare,
  Package,
  X,
  Download,
  Send,
  Shield,
  AlertCircle,
} from "lucide-react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  enquiry: string;
  selectedProducts?: string[];
  createdAt: string;
  status: "new" | "contacted" | "resolved";
  read: boolean;
}

interface Product {
  id: string;
  name: string;
  image: string;
  botanicalName?: string;
  form?: string;
  packaging?: string;
}

export default function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "new" | "contacted" | "resolved"
  >("all");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchEnquiries();
    fetchProducts();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiry");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      const normalizedData = data.map((enquiry: Enquiry) => ({
        ...enquiry,
        selectedProducts: enquiry.selectedProducts || [],
      }));

      setEnquiries(normalizedData);
    } catch (err) {
      setError("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const productsData = await res.json();
        setProducts(productsData);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const openEnquiryDetails = (enquiry: Enquiry) => {
    setSelectedEnquiry({
      ...enquiry,
      selectedProducts: enquiry.selectedProducts || [],
    });
    setIsModalOpen(true);
    if (!enquiry.read) {
      markAsRead(enquiry._id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/enquiry?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      fetchEnquiries();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/enquiry?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchEnquiries();
      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: status as any });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getProductById = (productId: string): Product | undefined => {
    return products.find((product) => product.id === productId);
  };

  const filteredEnquiries = enquiries
    .filter((enquiry) => filter === "all" || enquiry.status === filter)
    .filter((enquiry) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        enquiry.name.toLowerCase().includes(query) ||
        enquiry.email.toLowerCase().includes(query) ||
        enquiry.city?.toLowerCase().includes(query) ||
        enquiry.country?.toLowerCase().includes(query) ||
        enquiry.enquiry.toLowerCase().includes(query)
      );
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200";
      case "contacted":
        return "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 border border-blue-200";
      case "resolved":
        return "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 border border-emerald-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-800 border border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="w-3.5 h-3.5" />;
      case "contacted":
        return <Send className="w-3.5 h-3.5" />;
      case "resolved":
        return <CheckCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const getStatusCount = (status: string) => {
    return enquiries.filter((enquiry) => enquiry.status === status).length;
  };

  const getUnreadCount = () => {
    return enquiries.filter((enquiry) => !enquiry.read).length;
  };

  const getSelectedProducts = (enquiry: Enquiry): string[] => {
    return enquiry.selectedProducts || [];
  };

  const exportEnquiries = () => {
    const data = JSON.stringify(filteredEnquiries, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendReply = (email: string) => {
    window.open(`mailto:${email}`, "_blank");
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-900">
            Customer Enquiries
          </h1>
          <p className="text-emerald-600 mt-2">
            Manage all customer inquiries and follow-ups
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportEnquiries}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search enquiries by name, email, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-3 bg-white text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors border border-emerald-200"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === "all"
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md"
                    : "bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                }`}
              >
                All ({enquiries.length})
              </button>
              <button
                onClick={() => setFilter("new")}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  filter === "new"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                    : "bg-white text-amber-700 hover:bg-amber-50 border border-amber-200"
                }`}
              >
                <Clock className="w-4 h-4" />
                New ({getStatusCount("new")})
              </button>
              <button
                onClick={() => setFilter("contacted")}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  filter === "contacted"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                    : "bg-white text-blue-700 hover:bg-blue-50 border border-blue-200"
                }`}
              >
                <Send className="w-4 h-4" />
                Contacted ({getStatusCount("contacted")})
              </button>
              <button
                onClick={() => setFilter("resolved")}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  filter === "resolved"
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md"
                    : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Resolved ({getStatusCount("resolved")})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-emerald-900">
                {enquiries.length}
              </div>
              <div className="text-emerald-600 text-sm font-medium">
                Total Enquiries
              </div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-amber-900">
                {getUnreadCount()}
              </div>
              <div className="text-amber-600 text-sm font-medium">Unread</div>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl">
              <Eye className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-900">
                {getStatusCount("new")}
              </div>
              <div className="text-blue-600 text-sm font-medium">New</div>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-900">
                {getStatusCount("resolved")}
              </div>
              <div className="text-green-600 text-sm font-medium">Resolved</div>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-emerald-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <div className="mt-4 text-emerald-700 font-medium">
            Loading enquiries...
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <div className="text-red-700 text-lg font-medium mb-4">{error}</div>
          <button
            onClick={fetchEnquiries}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredEnquiries.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-emerald-100">
          <div className="text-emerald-400 text-6xl mb-4">📭</div>
          <div className="text-emerald-900 text-xl font-medium mb-2">
            No enquiries found
          </div>
          <div className="text-emerald-600">
            {filter === "all"
              ? "No enquiries have been submitted yet."
              : `No ${filter} enquiries found.`}
          </div>
        </div>
      )}

      {/* Enquiries List */}
      {!loading && filteredEnquiries.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900">
                    Customer
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900">
                    Contact
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900">
                    Date
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900">
                    Products
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {filteredEnquiries.map((item) => {
                  const selectedProducts = getSelectedProducts(item);
                  return (
                    <tr
                      key={item._id}
                      className={`hover:bg-emerald-50/50 cursor-pointer transition-all ${
                        !item.read ? "bg-amber-50/50" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              !item.read ? "bg-amber-100" : "bg-emerald-100"
                            }`}
                          >
                            <span
                              className={`font-semibold ${
                                !item.read
                                  ? "text-amber-700"
                                  : "text-emerald-700"
                              }`}
                            >
                              {item.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-emerald-900 group-hover:text-emerald-600 transition-colors">
                              {item.name}
                              {!item.read && (
                                <span className="ml-2 inline-flex h-2 w-2 bg-amber-500 rounded-full animate-pulse"></span>
                              )}
                            </div>
                            <div className="text-sm text-emerald-600 flex items-center gap-1 mt-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {item.city && item.country
                                ? `${item.city}, ${item.country}`
                                : item.city ||
                                  item.country ||
                                  "Location not specified"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-emerald-900">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="text-sm truncate">
                              {item.email}
                            </span>
                          </div>
                          {item.phone && (
                            <div className="flex items-center gap-2 text-emerald-700">
                              <Phone className="w-3.5 h-3.5" />
                              <span className="text-sm">{item.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-emerald-700">
                          <Calendar className="w-3.5 h-3.5" />
                          <div className="text-sm">
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "-"}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {selectedProducts.length > 0 ? (
                            <>
                              {selectedProducts.slice(0, 1).map((productId) => {
                                const product = getProductById(productId);
                                return (
                                  <span
                                    key={productId}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  >
                                    <Package className="w-3 h-3" />
                                    {product?.name || "Product"}
                                  </span>
                                );
                              })}
                              {selectedProducts.length > 1 && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-600 border border-emerald-100">
                                  +{selectedProducts.length - 1} more
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-emerald-400 text-sm">-</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                              item.status || "new"
                            )}`}
                          >
                            {getStatusIcon(item.status || "new")}
                            {item.status || "new"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEnquiryDetails(item)}
                            className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                          >
                            View
                          </button>
                          <button
                            onClick={() => sendReply(item.email)}
                            className="px-3 py-1.5 bg-white text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors border border-emerald-200 text-sm font-medium"
                          >
                            Reply
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedEnquiry.name}
                    </h2>
                    <p className="text-emerald-100 mt-1">Enquiry Details</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-emerald-200 transition-colors p-2 hover:bg-white/10 rounded-xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Customer Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-900 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Mail className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-sm text-emerald-600">Email</div>
                        <div className="text-emerald-900 font-medium">
                          {selectedEnquiry.email}
                        </div>
                      </div>
                    </div>
                    {selectedEnquiry.phone && (
                      <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Phone className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-sm text-emerald-600">Phone</div>
                          <div className="text-emerald-900 font-medium">
                            {selectedEnquiry.phone}
                          </div>
                        </div>
                      </div>
                    )}
                    {(selectedEnquiry.city || selectedEnquiry.country) && (
                      <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-sm text-emerald-600">
                            Location
                          </div>
                          <div className="text-emerald-900 font-medium">
                            {selectedEnquiry.city && selectedEnquiry.country
                              ? `${selectedEnquiry.city}, ${selectedEnquiry.country}`
                              : selectedEnquiry.city || selectedEnquiry.country}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Enquiry Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-sm text-emerald-600">
                          Date Submitted
                        </div>
                        <div className="text-emerald-900 font-medium">
                          {selectedEnquiry.createdAt
                            ? new Date(
                                selectedEnquiry.createdAt
                              ).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "-"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        {getStatusIcon(selectedEnquiry.status || "new")}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-emerald-600">Status</div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                              selectedEnquiry.status || "new"
                            )}`}
                          >
                            {getStatusIcon(selectedEnquiry.status || "new")}
                            {selectedEnquiry.status || "new"}
                          </span>
                          <select
                            value={selectedEnquiry.status || "new"}
                            onChange={(e) =>
                              updateStatus(selectedEnquiry._id, e.target.value)
                            }
                            className="text-sm border border-emerald-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 bg-white"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Section */}
              {selectedEnquiry.selectedProducts &&
                selectedEnquiry.selectedProducts.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-900 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Interested Products (
                      {selectedEnquiry.selectedProducts.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEnquiry.selectedProducts.map((productId) => {
                        const product = getProductById(productId);
                        return (
                          <div
                            key={productId}
                            className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 hover:border-emerald-200 transition-all"
                          >
                            <div className="flex-shrink-0 w-20 h-20 relative">
                              <Image
                                src={
                                  product?.image || "/placeholder-product.jpg"
                                }
                                alt={product?.name || "Product"}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover border-2 border-white shadow-sm"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-emerald-900 truncate">
                                {product?.name || "Unknown Product"}
                              </div>
                              {product?.botanicalName && (
                                <div className="text-sm text-emerald-600 truncate">
                                  {product.botanicalName}
                                </div>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                {product?.form && (
                                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                                    {product.form}
                                  </span>
                                )}
                                {product?.packaging && (
                                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                                    {product.packaging}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* No Products Selected */}
              {(!selectedEnquiry.selectedProducts ||
                selectedEnquiry.selectedProducts.length === 0) && (
                <div className="text-center py-8 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                  <Package className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                  <div className="text-emerald-700 font-medium">
                    No products selected
                  </div>
                  <div className="text-emerald-500 text-sm">
                    Customer didn't select any specific products
                  </div>
                </div>
              )}

              {/* Enquiry Message */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Message
                </h3>
                <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100">
                  <p className="text-emerald-700 whitespace-pre-wrap leading-relaxed">
                    {selectedEnquiry.enquiry}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-emerald-100 p-6 bg-emerald-50/30">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-emerald-600">
                  Enquiry ID:{" "}
                  <span className="font-mono text-emerald-700">
                    {selectedEnquiry._id}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => sendReply(selectedEnquiry.email)}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Reply via Email
                  </button>
                  <button
                    onClick={() =>
                      updateStatus(
                        selectedEnquiry._id,
                        selectedEnquiry.status === "resolved"
                          ? "new"
                          : "resolved"
                      )
                    }
                    className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                      selectedEnquiry.status === "resolved"
                        ? "bg-gradient-to-r from-gray-500 to-slate-500 text-white hover:shadow-lg"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg"
                    }`}
                  >
                    {selectedEnquiry.status === "resolved" ? (
                      <>
                        <Clock className="w-4 h-4" />
                        Reopen
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Mark Resolved
                      </>
                    )}
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 bg-white text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors border border-emerald-200 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
