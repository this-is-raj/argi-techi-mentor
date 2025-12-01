import { connectToDatabase } from "@/lib/mongodb";
import { type NextRequest, NextResponse } from "next/server";

// GET Hero Data
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection("heroSection").findOne({});

    // If no data exists → send fallback values
    if (!data) {
      return NextResponse.json({
        liveLabel: "LIVE",
        typewriterText:
          "Export Quality Guaranteed • Farm Fresh • Global Shipping",
        headingMain: "Premium Agricultural",
        headingGradient: "Products & Exports",
        description: "Direct from farms to global markets with",
        highlightText: "100% quality assurance",
        cta_text: "Explore Our Products",
        image: "/agricultural-products-spices-vegetables-colorful-d.jpg",
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero data" },
      { status: 500 }
    );
  }
}

// UPDATE Hero Data
export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    await db
      .collection("heroSection")
      .updateOne({}, { $set: body }, { upsert: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating hero data:", error);
    return NextResponse.json(
      { error: "Failed to update hero data" },
      { status: 500 }
    );
  }
}
