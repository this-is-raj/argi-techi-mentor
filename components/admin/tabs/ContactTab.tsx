import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateContactData } from "@/lib/db";

interface ContactTabProps {
  contactData: any;
  setContactData: (data: any) => void;
  setSavedMsg: (msg: string) => void;
}

export default function ContactTab({
  contactData,
  setContactData,
  setSavedMsg,
}: ContactTabProps) {
  const handleSave = async () => {
    await updateContactData(contactData);
    setSavedMsg("Contact info updated!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  if (!contactData) return null;

  return (
    <Card className="p-4 md:p-6 space-y-3 md:space-y-4">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-bold text-gray-800">
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
            Email
          </label>
          <Input
            type="email"
            value={contactData.email}
            onChange={(e) =>
              setContactData({ ...contactData, email: e.target.value })
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
              setContactData({ ...contactData, phone: e.target.value })
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
              setContactData({ ...contactData, address: e.target.value })
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
              setContactData({ ...contactData, website: e.target.value })
            }
            placeholder="Website URL"
            className="w-full text-sm"
          />
        </div>
        <Button
          onClick={handleSave}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base"
        >
          Save Contact Information
        </Button>
      </CardContent>
    </Card>
  );
}
