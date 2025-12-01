import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateAboutData } from "@/lib/db";

interface AboutTabProps {
  aboutData: any;
  setAboutData: (data: any) => void;
  setSavedMsg: (msg: string) => void;
}

export default function AboutTab({
  aboutData,
  setAboutData,
  setSavedMsg,
}: AboutTabProps) {
  const handleSave = async () => {
    await updateAboutData(aboutData);
    setSavedMsg("About section updated!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  if (!aboutData) return null;

  return (
    <Card className="p-4 md:p-6 space-y-3 md:space-y-4">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-bold text-gray-800">
          About Section
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
            Title
          </label>
          <Input
            value={aboutData.title}
            onChange={(e) =>
              setAboutData({ ...aboutData, title: e.target.value })
            }
            placeholder="About title"
            className="w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
            Description
          </label>
          <Textarea
            value={aboutData.description}
            onChange={(e) =>
              setAboutData({ ...aboutData, description: e.target.value })
            }
            placeholder="About description"
            className="w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
            Mission
          </label>
          <Textarea
            value={aboutData.mission}
            onChange={(e) =>
              setAboutData({ ...aboutData, mission: e.target.value })
            }
            placeholder="Company mission"
            className="w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
            Vision
          </label>
          <Textarea
            value={aboutData.vision}
            onChange={(e) =>
              setAboutData({ ...aboutData, vision: e.target.value })
            }
            placeholder="Company vision"
            className="w-full text-sm"
          />
        </div>
        <Button
          onClick={handleSave}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base"
        >
          Save About Section
        </Button>
      </CardContent>
    </Card>
  );
}
