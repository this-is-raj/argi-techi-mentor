export const dynamic = "force-dynamic";
import HeaderComponent from "@/components/header";

import Hero from "@/components/hero";
import Products from "@/components/products";
import Awards from "@/components/awards";
import Contact from "@/components/contact";
import About from "@/components/about";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeaderComponent />
      <Hero />
      <Products />
      <Awards />
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
