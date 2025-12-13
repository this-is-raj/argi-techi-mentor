export const dynamic = "force-dynamic";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getAboutData } from "@/lib/db";
import { AboutData } from "@/types/about";
import AllProductsPage from "@/components/all-products";
export default async function AboutPage() {
  const aboutData: AboutData | null = await getAboutData();

  if (!aboutData) return null;

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <AllProductsPage />
      <Footer />
    </main>
  );
}
