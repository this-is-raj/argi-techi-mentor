export const dynamic = "force-dynamic";

import HeaderComponent from "@/components/header";
import Hero from "@/components/hero";
import Products from "@/components/products";
import QualityPage from "@/components/quality";
import Awards from "@/components/awards";
import HarvestCalendar from "@/components/harvest-calendar";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeaderComponent />

      <Hero />

      <Products />

      <section id="quality">
        <QualityPage />
      </section>

      <section id="certifications">
        <Awards />
      </section>

      <section id="harvest-calendar">
        <HarvestCalendar />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
