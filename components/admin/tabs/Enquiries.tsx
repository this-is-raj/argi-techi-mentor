"use client";

import { useEffect, useState } from "react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  enquiry: string;
  createdAt: string;
  status?: "new" | "read" | "replied";
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">(
    "all"
  );

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiry");
      if (!res.ok) {
        setError("Failed to load enquiries");
        return;
      }
      const data = await res.json();
      setEnquiries(data);
    } catch (error) {
      setError("Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const openEnquiryDetails = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  const filteredEnquiries = enquiries.filter(
    (enquiry) => filter === "all" || enquiry.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-orange-100 text-orange-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contact Enquiries
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and review all customer inquiries
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors 
               bg-orange-500 text-white shadow-sm`}
            >
              All
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {enquiries.length}
            </div>
            <div className="text-gray-600 text-sm">Total Enquiries</div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 text-lg font-medium">{error}</div>
            <button
              onClick={fetchEnquiries}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredEnquiries.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <div className="text-gray-500 text-xl font-medium mb-2">
              No enquiries found
            </div>
            <div className="text-gray-400">
              {filter === "all"
                ? "No enquiries have been submitted yet."
                : `No ${filter} enquiries found.`}
            </div>
          </div>
        )}

        {/* Enquiries Table */}
        {!loading && filteredEnquiries.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Contact
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Enquiry
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEnquiries.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors group"
                      onClick={() => openEnquiryDetails(item)}
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-900">{item.email}</div>
                        {item.phone && (
                          <div className="text-gray-600 text-sm">
                            {item.phone}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-gray-700">{item.city || "-"}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-700 line-clamp-2 max-w-xs">
                          {item.enquiry}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-700">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "-"}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            item.status || "new"
                          )}`}
                        >
                          {item.status || "new"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedEnquiry.name}</h2>
                  <p className="text-orange-100 mt-1">Enquiry Details</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-orange-200 transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Contact Information
                  </h3>
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="text-gray-900 font-medium">
                      {selectedEnquiry.email}
                    </div>
                  </div>
                  {selectedEnquiry.phone && (
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="text-gray-900 font-medium">
                        {selectedEnquiry.phone}
                      </div>
                    </div>
                  )}
                  {selectedEnquiry.city && (
                    <div>
                      <div className="text-sm text-gray-600">City</div>
                      <div className="text-gray-900 font-medium">
                        {selectedEnquiry.city}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Enquiry Details
                  </h3>
                  <div>
                    <div className="text-sm text-gray-600">Date Submitted</div>
                    <div className="text-gray-900 font-medium">
                      {selectedEnquiry.createdAt
                        ? new Date(selectedEnquiry.createdAt).toLocaleString()
                        : "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedEnquiry.status || "new"
                      )}`}
                    >
                      {selectedEnquiry.status || "new"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enquiry Message */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Message
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedEnquiry.enquiry}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
