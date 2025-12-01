import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // <-- ADD THIS
export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const enquiries = await db
      .collection("enquiries")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

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

    const { name, email, phone, city, country, enquiry, selectedProducts } =
      body;

    if (!name || !email || !enquiry) {
      return NextResponse.json(
        { error: "Name, email and enquiry are required" },
        { status: 400 }
      );
    }

    const enquiryData = {
      name,
      email,
      phone: phone || "",
      city: city || "",
      country: country || "",
      enquiry,
      selectedProducts: selectedProducts || [],
      createdAt: new Date(),
      status: "new",
      read: false,
    };

    await db.collection("enquiries").insertOne(enquiryData);

    return NextResponse.json({ success: true, message: "Enquiry submitted" });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Enquiry ID required" },
        { status: 400 }
      );
    }

    await db
      .collection("enquiries")
      .updateOne({ _id: new ObjectId(id) }, { $set: body });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}
