import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AboutData } from "@/types/about";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const aboutData = await db.collection("updateAboutUs").findOne({});

    if (!aboutData) {
      return NextResponse.json(
        { error: "About data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(aboutData);
  } catch (error) {
    console.error("Error fetching about data:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const data: Partial<AboutData> = await request.json();

    // Validate required fields
    if (!data.title || !data.description || !data.mission || !data.vision) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Update or insert about data
    const result = await db.collection("updateAboutUs").updateOne(
      {},
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "About data updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating about data:", error);
    return NextResponse.json(
      { error: "Failed to update about data" },
      { status: 500 }
    );
  }
}
