import { MongoClient } from "mongodb"

async function seedDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/agritech"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db("agritech")

    console.log("[v0] Starting MongoDB seed...")

    // Clear existing collections
    await db.collection("products").deleteMany({})
    await db.collection("hero").deleteMany({})
    await db.collection("about").deleteMany({})
    await db.collection("contact").deleteMany({})
    await db.collection("headerFooter").deleteMany({})

    // Seed products
    const products = [
      {
        id: "1",
        name: "Spices",
        description: "Premium quality spices - Cardamom, Turmeric, Cinnamon",
        image: "/various-spices-in-bowls-cinnamon-turmeric-cardamom.jpg",
        details: "Our premium spice collection includes finest hand-picked varieties from trusted farmers.",
        benefits: "Rich in antioxidants, improves digestion, enhances flavor and nutrition in every dish.",
        specifications: "100% pure, No additives, ISO certified, Vacuum packed for freshness",
      },
      {
        id: "2",
        name: "Pulses",
        description: "Nutritious lentils, chickpeas, and beans",
        image: "/pulses-lentils-chickpeas-bowls-colorful.jpg",
        details: "High-quality pulses sourced directly from organic farms across India.",
        benefits: "Excellent source of protein, fiber, and essential minerals for healthy living.",
        specifications: "Organic certified, Non-GMO, Lab tested for purity",
      },
      {
        id: "3",
        name: "Vegetables",
        description: "Fresh and organic vegetables",
        image: "/fresh-vegetables-carrots-tomatoes-peppers-lettuce.jpg",
        details: "Fresh vegetables harvested at peak ripeness and packed with care.",
        benefits: "Rich in vitamins, minerals, and natural antioxidants for optimal health.",
        specifications: "Pesticide-free, Fresh harvest, Cold chain maintained",
      },
      {
        id: "4",
        name: "Grains",
        description: "Quality rice, wheat, and millets",
        image: "/food-grains-rice-wheat-millet-bowls.jpg",
        details: "Premium grains carefully selected for superior quality and taste.",
        benefits: "Complete nutrition with essential carbohydrates and fiber content.",
        specifications: "Polished and sorted, Non-basmati and basmati varieties available",
      },
      {
        id: "5",
        name: "Dry Fruits",
        description: "Premium almonds, cashews, and raisins",
        image: "/dry-fruits-almonds-cashews-raisins-walnuts.jpg",
        details: "Best quality dry fruits imported and sourced from premium suppliers.",
        benefits: "Natural energy booster, packed with healthy fats and nutrients.",
        specifications: "Natural without artificial preservatives, Premium grade",
      },
      {
        id: "6",
        name: "Oil Seeds",
        description: "Sesame, sunflower, and mustard seeds",
        image: "/oil-seeds-bowls-sesame-sunflower-mustard.jpg",
        details: "Pure oil seeds perfect for extraction and culinary uses.",
        benefits: "Rich in healthy oils, promotes heart health and overall wellness.",
        specifications: "Cold-pressed ready, Organic sourced, High oil content",
      },
    ]

    await db.collection("products").insertMany(products)
    console.log("[v0] Products seeded successfully")

    // Seed hero data
    await db.collection("hero").insertOne({
      title: "Premium Agricultural Exports from India",
      subtitle: "Delivering quality spices, pulses, and fresh produce to 50+ countries worldwide",
      cta_text: "Get Started",
      image: "/agricultural-products-spices-vegetables-colorful-d.jpg",
    })
    console.log("[v0] Hero data seeded")

    // Seed about data
    await db.collection("about").insertOne({
      title: "About Agro TechieMentor",
      description:
        "We are a leading exporter of premium agricultural products from India, committed to quality and sustainability.",
      mission: "To provide the highest quality agricultural products to global markets",
      vision: "To be the most trusted agricultural export company in the world",
    })
    console.log("[v0] About data seeded")

    // Seed contact data
    await db.collection("contact").insertOne({
      email: "info@agritechimentor.com",
      phone: "+91-9549235277",
      address: "E-9/508 Chitrakoot, Jaipur, Rajasthan",
      website: "www.agritechimentor.com",
    })
    console.log("[v0] Contact data seeded")

    // Seed header/footer data
    await db.collection("headerFooter").insertOne({
      headerPhone: "+91 9549235277",
      headerEmail: "techiementor.co@gmail.com",
      websiteName: "Agro TechieMentor",
      footerDescription: "Leading exporter of premium agricultural products from India to global markets.",
      footerAddress: "E-9/508 Chitrakoot, Jaipur, Rajasthan",
      footerPhone: "+91 9549235277",
      footerEmail: "techiementor.co@gmail.com",
      website: "www.agritechimentor.com",
      logo: "/placeholder-logo.png",
    })
    console.log("[v0] Header/Footer data seeded")

    console.log("[v0] Database seeding completed successfully!")
  } catch (error) {
    console.error("[v0] Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
