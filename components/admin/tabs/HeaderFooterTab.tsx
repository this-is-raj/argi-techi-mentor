// components/admin/tabs/HeaderFooterTab.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateHeaderFooterData } from "@/lib/db";

interface HeaderFooterTabProps {
  headerFooterData: any;
  setHeaderFooterData: (data: any) => void;
  setSavedMsg: (msg: string) => void;
}

export default function HeaderFooterTab({
  headerFooterData,
  setHeaderFooterData,
  setSavedMsg,
}: HeaderFooterTabProps) {
  const handleSave = async () => {
    await updateHeaderFooterData(headerFooterData);
    setSavedMsg("Header & Footer updated!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  if (!headerFooterData) return null;

  return (
    <Card className="p-4 md:p-6 space-y-6">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-bold text-gray-800">
          Header & Footer Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
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

        {/* ... rest of the header/footer fields ... */}

        <Button
          onClick={handleSave}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base"
        >
          Save Header & Footer
        </Button>
      </CardContent>
    </Card>
  );
}
