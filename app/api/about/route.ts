import { connectToDatabase } from "@/lib/mongodb";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection("about").findOne({});

    if (!data) {
      return NextResponse.json({
        title: "About Agro TechieMentor",
        description:
          "We are a leading exporter of premium agricultural products from India, committed to quality and sustainability.",
        mission:
          "To deliver premium, sustainably sourced agricultural products from India’s farms to global markets, ensuring quality, freshness, and customer satisfaction every step of the way",
        vision:
          "To become the world’s most trusted partner in agricultural exports, leading the industry in innovation, sustainability, and quality while connecting Indian farmers to international opportunities",
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching about data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    await db
      .collection("about")
      .updateOne({}, { $set: body }, { upsert: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating about data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}
