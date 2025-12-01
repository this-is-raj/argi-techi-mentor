import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET → Fetch all calendar products
export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const calendar = await db.collection("harvestCalendar").find().toArray();

    return NextResponse.json(calendar);
  } catch (error) {
    console.error("Error fetching harvest calendar:", error);
    return NextResponse.json(
      { error: "Failed to fetch harvest calendar" },
      { status: 500 }
    );
  }
}

// POST → Add new product to calendar
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    const { name, months, color, image } = body;

    // Validation (same style as your enquiry API)
    if (!name || !months || !Array.isArray(months)) {
      return NextResponse.json(
        { error: "Name and months array are required" },
        { status: 400 }
      );
    }

    await db.collection("harvestCalendar").insertOne({
      name,
      months,
      color: color || null,
      image: image || null,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Harvest calendar item added",
    });
  } catch (error) {
    console.error("Error adding calendar item:", error);
    return NextResponse.json(
      { error: "Failed to add calendar item" },
      { status: 500 }
    );
  }
}
