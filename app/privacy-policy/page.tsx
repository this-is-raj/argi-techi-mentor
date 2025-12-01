export const dynamic = "force-dynamic";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getAboutData } from "@/lib/db";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { AboutData } from "@/types/about";
import About from "@/components/about";
import PrivacyPolicy from "@/components/privacy-policy";
export default async function AboutPage() {
  const aboutData: AboutData | null = await getAboutData();

  if (!aboutData) return null;

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}
