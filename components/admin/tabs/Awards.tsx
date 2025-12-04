"use client";
import { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Save,
  X,
  Plus,
  Award,
  ShieldCheck,
  CheckCircle,
  Eye,
  EyeOff,
  Grid3x3,
  List,
  Filter,
  CreativeCommons,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AwardItem, Certification, Compliance } from "@/types/award";
export default function Awards() {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [compliances, setCompliances] = useState<Compliance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: string;
    type: "award" | "certification" | "compliance";
  }>({
    open: false,
    id: "",
    type: "award",
  });

  const [editingAwardId, setEditingAwardId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [editingComplianceId, setEditingComplianceId] = useState<string | null>(
    null
  );

  const [editAwardData, setEditAwardData] = useState<Partial<AwardItem>>({});
  const [editCertData, setEditCertData] = useState<Partial<Certification>>({});
  const [editComplianceData, setEditComplianceData] = useState<
    Partial<Compliance>
  >({});

  const [showNewAwardForm, setShowNewAwardForm] = useState(false);
  const [showNewCertForm, setShowNewCertForm] = useState(false);
  const [showNewComplianceForm, setShowNewComplianceForm] = useState(false);

  const [newAward, setNewAward] = useState<Partial<AwardItem>>({
    title: "",
    description: "",
    category: "accreditation",
    featured: true,
    order: 0,
  });

  const [newCert, setNewCert] = useState<Partial<Certification>>({
    name: "",
    image: "",
    featured: true,
    order: 0,
  });

  const [newCompliance, setNewCompliance] = useState<Partial<Compliance>>({
    title: "",
    value: "",
    description: "",
    order: 0,
  });

  useEffect(() => {
    const checkAdmin = () => {
      const adminToken = localStorage.getItem("adminToken");
      setIsAdmin(!!adminToken);
    };

    checkAdmin();
    fetchAwardsData();
  }, []);

  const fetchAwardsData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/awards");
      const data = await response.json();

      const allAwards = data.awards || [];
      const featuredAwards = showFeaturedOnly
        ? allAwards.filter((a: AwardItem) => a.featured)
        : allAwards;
      setAwards(featuredAwards.slice(0, 8));

      const allCerts = data.certifications || [];
      const featuredCerts = showFeaturedOnly
        ? allCerts.filter((c: Certification) => c.featured)
        : allCerts;
      setCertifications(featuredCerts);

      setCompliances(data.compliances || []);
    } catch (error) {
      console.error("Error fetching awards data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAwardsData();
  }, [showFeaturedOnly]);

  const handleEditAward = (award: AwardItem) => {
    setEditingAwardId(award._id);
    setEditAwardData({ ...award });
  };

  const handleCancelEditAward = () => {
    setEditingAwardId(null);
    setEditAwardData({});
  };

  const handleSaveAward = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editAwardData.title || "");
      formData.append("description", editAwardData.description || "");
      formData.append("category", editAwardData.category || "accreditation");
      formData.append("order", editAwardData.order?.toString() || "0");
      formData.append(
        "featured",
        editAwardData.featured?.toString() || "false"
      );

      const imageInput = document.getElementById(
        `award-image-${editingAwardId}`
      ) as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append("image", imageInput.files[0]);
      }

      const response = await fetch(
        `/api/awards?id=${editingAwardId}&type=award`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update award");

      await fetchAwardsData();
      setEditingAwardId(null);
      setEditAwardData({});
    } catch (error) {
      console.error("Error updating award:", error);
    }
  };

  const handleDeleteAward = async (id: string) => {
    setDeleteDialog({ open: true, id, type: "award" });
  };

  const confirmDelete = async () => {
    const { id, type } = deleteDialog;

    try {
      let endpoint = "";
      if (type === "award")
        endpoint = `/api/awards?id=${id}&type=award&collection=awards`;
      if (type === "certification")
        endpoint = `/api/awards?id=${id}&type=certification&collection=certifications`;
      if (type === "compliance")
        endpoint = `/api/awards?id=${id}&type=compliance&collection=compliances`;

      const response = await fetch(endpoint, { method: "DELETE" });

      if (!response.ok) throw new Error(`Failed to delete ${type}`);

      await fetchAwardsData();
      setDeleteDialog({ open: false, id: "", type: "award" });
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleAddAward = async () => {
    try {
      const formData = new FormData();
      formData.append("type", "award");
      formData.append("title", newAward.title || "");
      formData.append("description", newAward.description || "");
      formData.append("category", newAward.category || "accreditation");
      formData.append("order", newAward.order?.toString() || "0");
      formData.append("featured", newAward.featured?.toString() || "false");

      const imageInput = document.getElementById(
        "new-award-image"
      ) as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append("image", imageInput.files[0]);
      }

      const response = await fetch("/api/awards", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add award");

      await fetchAwardsData();
      setShowNewAwardForm(false);
      setNewAward({
        title: "",
        description: "",
        category: "accreditation",
        featured: true,
        order: 0,
      });
    } catch (error) {
      console.error("Error adding award:", error);
    }
  };

  const handleEditCert = (cert: Certification) => {
    setEditingCertId(cert._id);
    setEditCertData({ ...cert });
  };

  const handleSaveCert = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editCertData.name || "");
      formData.append("description", editCertData.description || "");
      formData.append("order", editCertData.order?.toString() || "0");
      formData.append("featured", editCertData.featured?.toString() || "false");

      const imageInput = document.getElementById(
        `cert-image-${editingCertId}`
      ) as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append("image", imageInput.files[0]);
      }

      const response = await fetch(
        `/api/awards?id=${editingCertId}&type=certification`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update certification");

      await fetchAwardsData();
      setEditingCertId(null);
      setEditCertData({});
    } catch (error) {
      console.error("Error updating certification:", error);
    }
  };

  const handleDeleteCert = async (id: string) => {
    setDeleteDialog({ open: true, id, type: "certification" });
  };

  const handleAddCert = async () => {
    try {
      const formData = new FormData();
      formData.append("type", "certification");
      formData.append("name", newCert.name || "");
      formData.append("description", newCert.description || "");
      formData.append("order", newCert.order?.toString() || "0");
      formData.append("featured", newCert.featured?.toString() || "false");

      const imageInput = document.getElementById(
        "new-cert-image"
      ) as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append("image", imageInput.files[0]);
      }

      const response = await fetch("/api/awards", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add certification");

      await fetchAwardsData();
      setShowNewCertForm(false);
      setNewCert({
        name: "",
        image: "",
        featured: true,
        order: 0,
      });
    } catch (error) {
      console.error("Error adding certification:", error);
    }
  };

  const handleEditCompliance = (compliance: Compliance) => {
    setEditingComplianceId(compliance._id);
    setEditComplianceData({ ...compliance });
  };

  const handleSaveCompliance = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editComplianceData.title || "");
      formData.append("value", editComplianceData.value || "");
      formData.append("description", editComplianceData.description || "");
      formData.append("order", editComplianceData.order?.toString() || "0");

      const response = await fetch(
        `/api/awards?id=${editingComplianceId}&type=compliance`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update compliance");

      await fetchAwardsData();
      setEditingComplianceId(null);
      setEditComplianceData({});
    } catch (error) {
      console.error("Error updating compliance:", error);
    }
  };

  const handleDeleteCompliance = async (id: string) => {
    setDeleteDialog({ open: true, id, type: "compliance" });
  };

  const handleAddCompliance = async () => {
    try {
      const formData = new FormData();
      formData.append("type", "compliance");
      formData.append("title", newCompliance.title || "");
      formData.append("value", newCompliance.value || "");
      formData.append("description", newCompliance.description || "");
      formData.append("order", newCompliance.order?.toString() || "0");

      const response = await fetch("/api/awards", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add compliance");

      await fetchAwardsData();
      setShowNewComplianceForm(false);
      setNewCompliance({
        title: "",
        value: "",
        description: "",
        order: 0,
      });
    } catch (error) {
      console.error("Error adding compliance:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
            <Award className="h-8 w-8 text-emerald-600 absolute inset-0 m-auto" />
          </div>
          <p className="text-gray-600 font-medium">
            Loading awards & certifications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Awards & Accreditations
                </h1>
              </div>
              <p className="text-gray-600 max-w-2xl">
                Recognized excellence, verified compliance, and industry-leading
                certifications
              </p>
            </div>

            {isAdmin && (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewAwardForm(!showNewAwardForm)}
                  className="border-emerald-200 hover:bg-emerald-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Award
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={showFeaturedOnly}
                onCheckedChange={setShowFeaturedOnly}
                id="featured-only"
              />
              <Label
                htmlFor="featured-only"
                className="flex items-center gap-2 cursor-pointer"
              >
                {showFeaturedOnly ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                Featured Only
              </Label>
            </div>
            <div className="flex border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`px-3 ${
                  viewMode === "grid" ? "bg-emerald-600" : ""
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`px-3 ${
                  viewMode === "list" ? "bg-emerald-600" : ""
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            {isAdmin && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewCertForm(!showNewCertForm)}
                  className="border-emerald-200 hover:bg-emerald-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Certification
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setShowNewComplianceForm(!showNewComplianceForm)
                  }
                  className="border-emerald-200 hover:bg-emerald-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Compliance
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="awards" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="awards" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Awards ({awards.length})
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className="flex items-center gap-2"
            >
              <CreativeCommons className="h-4 w-4" />
              Certifications ({certifications.length})
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Compliance ({compliances.length})
            </TabsTrigger>
          </TabsList>

          {/* Awards Tab */}
          <TabsContent value="awards" className="space-y-6">
            {/* New Award Form */}
            {isAdmin && showNewAwardForm && (
              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Add New Award</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewAwardForm(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="award-title">Award Title</Label>
                        <Input
                          id="award-title"
                          placeholder="Enter award title"
                          value={newAward.title}
                          onChange={(e) =>
                            setNewAward({ ...newAward, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="award-category">Category</Label>
                        <Input
                          id="award-category"
                          placeholder="e.g., accreditation, recognition"
                          value={newAward.category}
                          onChange={(e) =>
                            setNewAward({
                              ...newAward,
                              category: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="award-description">Description</Label>
                      <Textarea
                        id="award-description"
                        placeholder="Describe the award and its significance"
                        value={newAward.description}
                        onChange={(e) =>
                          setNewAward({
                            ...newAward,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-award-image">Award Image</Label>
                      <Input
                        id="new-award-image"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="award-featured"
                          checked={newAward.featured}
                          onCheckedChange={(checked) =>
                            setNewAward({ ...newAward, featured: checked })
                          }
                        />
                        <Label htmlFor="award-featured">Featured</Label>
                      </div>
                      <Button
                        onClick={handleAddAward}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Add Award
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Awards Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {awards.map((award) => (
                <Card
                  key={award._id}
                  className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-emerald-200"
                >
                  <CardContent className="p-6">
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {editingAwardId === award._id ? (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={handleSaveAward}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={handleCancelEditAward}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => handleEditAward(award)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => handleDeleteAward(award._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    )}

                    {editingAwardId === award._id ? (
                      <div className="space-y-4">
                        <Input
                          value={editAwardData.title || ""}
                          onChange={(e) =>
                            setEditAwardData({
                              ...editAwardData,
                              title: e.target.value,
                            })
                          }
                          className="text-lg font-bold"
                        />
                        <Textarea
                          value={editAwardData.description || ""}
                          onChange={(e) =>
                            setEditAwardData({
                              ...editAwardData,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                        />
                        <Input
                          type="file"
                          id={`award-image-${award._id}`}
                          accept="image/*"
                        />
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={editAwardData.featured}
                            onCheckedChange={(checked) =>
                              setEditAwardData({
                                ...editAwardData,
                                featured: checked,
                              })
                            }
                            id={`featured-${award._id}`}
                          />
                          <Label htmlFor={`featured-${award._id}`}>
                            Featured
                          </Label>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-16 w-16 bg-emerald-50 rounded-lg flex items-center justify-center">
                            {award.image ? (
                              <img
                                src={award.image}
                                alt={award.title}
                                className="h-12 w-auto object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display =
                                    "none";
                                  const parent = (e.target as HTMLImageElement)
                                    .parentElement;
                                  if (parent) {
                                    parent.innerHTML =
                                      '<Award className="h-8 w-8 text-emerald-600" />';
                                  }
                                }}
                              />
                            ) : (
                              <Award className="h-8 w-8 text-emerald-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-bold text-gray-900">
                                {award.title}
                              </h3>
                              {award.featured && (
                                <Badge
                                  variant="secondary"
                                  className="bg-emerald-100 text-emerald-700"
                                >
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-emerald-600 capitalize">
                              {award.category}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600">{award.description}</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-6">
            {/* New Certification Form */}
            {isAdmin && showNewCertForm && (
              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Add New Certification
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewCertForm(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cert-name">Certification Name</Label>
                      <Input
                        id="cert-name"
                        placeholder="Enter certification name"
                        value={newCert.name}
                        onChange={(e) =>
                          setNewCert({ ...newCert, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-cert-image">
                        Certification Image/Logo
                      </Label>
                      <Input id="new-cert-image" type="file" accept="image/*" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="cert-featured"
                          checked={newCert.featured}
                          onCheckedChange={(checked) =>
                            setNewCert({ ...newCert, featured: checked })
                          }
                        />
                        <Label htmlFor="cert-featured">Featured</Label>
                      </div>
                      <Button
                        onClick={handleAddCert}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Add Certification
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {certifications.map((cert) => (
                <div key={cert._id} className="relative group">
                  <div className="aspect-square bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 p-4 flex items-center justify-center">
                    {editingCertId === cert._id ? (
                      <div className="space-y-2 w-full">
                        <Input
                          value={editCertData.name || ""}
                          onChange={(e) =>
                            setEditCertData({
                              ...editCertData,
                              name: e.target.value,
                            })
                          }
                          className="text-sm"
                        />
                        <Input
                          type="file"
                          id={`cert-image-${cert._id}`}
                          accept="image/*"
                          className="text-xs"
                        />
                      </div>
                    ) : (
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-full h-auto object-contain max-h-20"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          const parent = (e.target as HTMLImageElement)
                            .parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex flex-col items-center gap-2">
                                <Certificate class="h-8 w-8 text-emerald-600" />
                                <span class="text-xs text-gray-600 text-center">${cert.name}</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    )}
                  </div>

                  {isAdmin && (
                    <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {editingCertId === cert._id ? (
                        <>
                          <Button
                            size="icon"
                            className="h-6 w-6 bg-emerald-600 hover:bg-emerald-700"
                            onClick={handleSaveCert}
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-6 w-6"
                            onClick={() => setEditingCertId(null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="icon"
                            className="h-6 w-6 bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => handleEditCert(cert)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-6 w-6"
                            onClick={() => handleDeleteCert(cert._id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  )}

                  {cert.featured && (
                    <div className="absolute -top-2 -left-2">
                      <div className="h-5 w-5 bg-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            {/* New Compliance Form */}
            {isAdmin && showNewComplianceForm && (
              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Add New Compliance Detail
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewComplianceForm(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="compliance-title">Title</Label>
                        <Input
                          id="compliance-title"
                          placeholder="e.g., IEC Number, GSTIN"
                          value={newCompliance.title}
                          onChange={(e) =>
                            setNewCompliance({
                              ...newCompliance,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="compliance-value">Value/Number</Label>
                        <Input
                          id="compliance-value"
                          placeholder="e.g., AAXFT8546M"
                          value={newCompliance.value}
                          onChange={(e) =>
                            setNewCompliance({
                              ...newCompliance,
                              value: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compliance-description">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="compliance-description"
                        placeholder="Additional details about this compliance"
                        value={newCompliance.description}
                        onChange={(e) =>
                          setNewCompliance({
                            ...newCompliance,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                      />
                    </div>
                    <Button
                      onClick={handleAddCompliance}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Add Compliance Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Compliance Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {compliances.map((compliance) => (
                <Card
                  key={compliance._id}
                  className="hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-emerald-200"
                >
                  <CardContent className="p-6">
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                        {editingComplianceId === compliance._id ? (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={handleSaveCompliance}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => setEditingComplianceId(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => handleEditCompliance(compliance)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() =>
                                handleDeleteCompliance(compliance._id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    )}

                    {editingComplianceId === compliance._id ? (
                      <div className="space-y-4">
                        <Input
                          value={editComplianceData.title || ""}
                          onChange={(e) =>
                            setEditComplianceData({
                              ...editComplianceData,
                              title: e.target.value,
                            })
                          }
                          className="text-sm"
                        />
                        <Input
                          value={editComplianceData.value || ""}
                          onChange={(e) =>
                            setEditComplianceData({
                              ...editComplianceData,
                              value: e.target.value,
                            })
                          }
                          className="font-bold"
                        />
                        <Textarea
                          value={editComplianceData.description || ""}
                          onChange={(e) =>
                            setEditComplianceData({
                              ...editComplianceData,
                              description: e.target.value,
                            })
                          }
                          rows={2}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <ShieldCheck className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              {compliance.title}
                            </h4>
                            <p className="text-xl font-bold text-gray-900 mt-1">
                              {compliance.value}
                            </p>
                          </div>
                        </div>
                        {compliance.description && (
                          <p className="text-sm text-gray-600 border-t pt-3 mt-3">
                            {compliance.description}
                          </p>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              {deleteDialog.type} and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Stats Footer */}
      <div className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {awards.length}
              </div>
              <div className="text-gray-600">Awards & Recognitions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {certifications.length}
              </div>
              <div className="text-gray-600">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {compliances.length}
              </div>
              <div className="text-gray-600">Compliance Details</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
