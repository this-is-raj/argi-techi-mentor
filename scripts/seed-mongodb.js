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

      {
        id: "2",
        name: "Cumin Seeds",
        subtitle: "Premium Export Quality",
        image: "/c2.jpg",
        botanicalName: "Cuminum cyminum",
        form: "Whole Seeds",
        packaging: "25 kg / 50 kg PP Bags or Jute Bags",
        origin: "Rajasthan & Gujarat, India",
        gallery: ["/c1.webp", "/c2.jpg", "/c3.jpg"],
        specifications: {
          Purity: "99% / 99.5% / 99.9%",
          Moisture: "≤ 8%",
          Admixture: "≤ 1%",
          Flavour: "Strong Aromatic",
          "Foreign Matter": "≤ 0.5%",
          Grade: "Singapore / Europe Quality",
          Packing: "25 kg / 50 kg PP or Jute Bags",
        },
        description:
          "High-aroma Cumin Seeds sourced from the finest farms of Rajasthan and Gujarat. Known for their rich flavor, uniform size, and purity, our cumin seeds are processed under strict quality checks, ensuring export-ready standards.",
        benefits:
          "Aids digestion, boosts immunity, improves metabolism, and adds a strong distinctive flavor to culinary dishes.",
        details:
          "Our Cumin Seeds go through advanced cleaning, sorting, and packaging systems. Each batch is inspected for purity, aroma, and moisture control to meet international quality requirements for the Middle East, Europe, and American markets.",
        metaTitle: "Premium Indian Cumin Seeds Exporter | Agritech",
        metaDescription:
          "Export-quality Cumin Seeds (Jeera) from India with strong aroma, high purity, and controlled moisture levels. Ideal for spice traders and global buyers.",
      },
      {
        id: "3",
        name: "Green Banana",
        subtitle: "Fresh Export Quality",
        image: "/p2.jpg",
        botanicalName: "Musa acuminata",
        form: "Fresh Raw Bananas",
        packaging: "7 kg / 13 kg / 20 kg Corrugated Export Boxes",
        origin: "Tamil Nadu, Maharashtra & Andhra Pradesh, India",
        gallery: ["/p1.jpg", "/p2.jpeg", "/p3.jpg"],
        specifications: {
          Size: "14 cm – 20 cm (Uniform Size)",
          Color: "Natural Green",
          Maturity: "Grade A – 80% Mature",
          ShelfLife: "25–35 Days (Under Controlled Conditions)",
          "Net Weight": "As per packaging (7 / 13 / 20 kg)",
          Packing: "Corrugated Boxes with Air Vents",
        },
        description:
          "Fresh, export-quality Green Bananas sourced from certified farms in India. Known for their long shelf life, uniform size, and superior freshness, making them ideal for Middle East, Europe, and Asian markets.",
        benefits:
          "High in fiber, rich in Vitamin B6, supports digestion, boosts energy, and ideal for culinary use in multiple cuisines.",
        details:
          "Our Green Bananas are harvested at optimum maturity and processed with international standards. Each batch is quality checked for size, color, freshness, and packing integrity to ensure it reaches buyers in perfect condition.",
        metaTitle: "Fresh Green Banana Exporter from India | Agritech",
        metaDescription:
          "Supplying fresh, export-quality Green Bananas with superior shelf life and perfect size. Ideal for retail and wholesale export markets.",
      },

      {
        id: "4",
        name: "Pomegranate",
        subtitle: "Fresh Export Quality",
        image: "/a2.jpeg",
        botanicalName: "Punica granatum",
        form: "Fresh Whole Fruit",
        packaging: "3 kg / 5 kg / 10 kg Corrugated Export Boxes",
        origin: "Maharashtra, Gujarat & Karnataka, India",
        gallery: ["/a1.jpg", "/a2.jpeg", "/a3.jpg"],
        specifications: {
          Variety: "Bhagwa / Super Bhagwa",
          Color: "Bright Red",
          Size: "200g – 350g per fruit",
          BrixLevel: "14–16% (High Sweetness)",
          ShelfLife: "25–40 Days (Cold Storage)",
          "Net Weight": "As per box (3 / 5 / 10 kg)",
          Packing: "Corrugated Boxes with Soft Wrapping",
        },
        description:
          "Premium quality export-grade Pomegranates known for their deep red color, high sweetness, and soft edible seeds. Sourced from Maharashtra’s best orchards and packed under strict hygiene and international export standards.",
        benefits:
          "Rich in antioxidants, boosts immunity, supports heart health, excellent for skin, and helps improve digestion.",
        details:
          "Our Pomegranates are carefully selected for uniform color, size, and sweetness. Each batch undergoes quality checks for brix level, maturity, and packaging durability to meet global export expectations.",
        metaTitle: "Fresh Pomegranate Exporter from India | Agritech",
        metaDescription:
          "Exporting top-quality Indian Pomegranates (Bhagwa variety) with deep red color and high sweetness. Perfect for retail and international fruit markets.",
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
