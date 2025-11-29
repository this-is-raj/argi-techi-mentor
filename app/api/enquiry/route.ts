import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const enquiries = await db.collection("enquiries").find().toArray();

    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();

    const { name, email, phone, city, enquiry } = body;

    if (!name || !email || !phone || !city || !enquiry) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await db.collection("enquiries").insertOne({
      name,
      email,
      phone,
      city,
      enquiry,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Enquiry submitted" });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
