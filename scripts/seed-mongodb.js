import { MongoClient } from "mongodb";

async function seedDatabase() {
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://harish12:harish12@agritechimentor.w4f6ksp.mongodb.net/agritechimentor";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("agritech");

    console.log("[v0] Starting MongoDB seed...");

    // Clear existing collections
    await db.collection("products").deleteMany({});
    await db.collection("hero").deleteMany({});
    await db.collection("about").deleteMany({});
    await db.collection("contact").deleteMany({});
    await db.collection("headerFooter").deleteMany({});

    // Seed products
    const products = [
      {
        id: "1",
        name: "Peanuts",
        subtitle: "Premium Export Quality",
        image: "/p1.jpg",
        botanicalName: "Arachis hypogaea",
        form: "Whole Kernels (Bold / Java Type)",
        packaging: "25 kg / 50 kg PP Bags or Vacuum Packs",
        origin: "Gujarat & Rajasthan, India",
        gallery: ["/p1.jpg", "/p2.jpg", "/p3.png"],
        specifications: {
          Moisture: "≤ 8%",
          Admixture: "≤ 1%",
          Aflatoxin: "Below 10 ppb",
          "Foreign Matter": "≤ 0.5%",
          "Count per Ounce": "35/40, 40/50, 50/60, 60/70",
          Packing: "25 kg / 50 kg PP Bags or Vacuum Packed",
        },
        description:
          "Premium quality peanuts cultivated from the best farms of India, ideal for snacks, oil extraction, and confectionery industries. Known for rich taste, uniform size, and excellent shelf life.",
        benefits:
          "Rich in protein and healthy fats, supports heart health, boosts energy, and promotes overall wellness.",
        details:
          "Our export-grade peanuts are carefully handpicked and processed under ISO-certified facilities. Each batch undergoes strict quality checks to ensure purity and freshness, making them perfect for global markets.",
        metaTitle: "Premium Indian Groundnut Exporter | Agritech",
        metaDescription:
          "Export high-quality Indian Groundnuts (Peanuts) sourced from trusted farms in Gujarat and Rajasthan. Moisture-controlled, uniform kernels for global buyers.",
      },
    ];

    await db.collection("products").insertMany(products);
    console.log("[v0] Products seeded successfully");

    // Seed hero data
    await db.collection("hero").insertOne({
      title: "Premium Agricultural Exports from India",
      subtitle:
        "Delivering quality spices, pulses, and fresh produce to 50+ countries worldwide",
      cta_text: "Get Started",
      image: "/agricultural-products-spices-vegetables-colorful-d.jpg",
    });
    console.log("[v0] Hero data seeded");

    // Seed about data
    await db.collection("about").insertOne({
      title: "About Agro TechieMentor",
      description:
        "We are a leading exporter of premium agricultural products from India, committed to quality and sustainability.",
      mission:
        "To provide the highest quality agricultural products to global markets",
      vision: "To be the most trusted agricultural export company in the world",
    });
    console.log("[v0] About data seeded");

    // Seed contact data
    await db.collection("contact").insertOne({
      email: "info@agritechimentor.com",
      phone: "+91-9549235277",
      address: "E-9/508 Chitrakoot, Jaipur, Rajasthan",
      website: "www.agritechimentor.com",
    });
    console.log("[v0] Contact data seeded");

    // Seed header/footer data
    await db.collection("headerFooter").insertOne({
      headerPhone: "+91 9549235277",
      headerEmail: "techiementor.co@gmail.com",
      websiteName: "Agro TechieMentor",
      footerDescription:
        "Leading exporter of premium agricultural products from India to global markets.",
      footerAddress: "E-9/508 Chitrakoot, Jaipur, Rajasthan",
      footerPhone: "+91 9549235277",
      footerEmail: "techiementor.co@gmail.com",
      website: "www.agritechimentor.com",
      logo: "/placeholder-logo.png",
    });
    console.log("[v0] Header/Footer data seeded");

    console.log("[v0] Database seeding completed successfully!");
  } catch (error) {
    console.error("[v0] Error seeding database:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();
