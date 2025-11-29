// app/api/hero/route.ts
import { NextRequest, NextResponse } from "next/server";

// Mock database (replace with real database in production)
let heroData = {
  liveLabel: "LIVE",
  typewriterText: "Export Quality Guaranteed • Farm Fresh • Global Shipping",
  headingMain: "Premium Agricultural",
  headingGradient: "Products & Exports",
  description: "Direct from farms to global markets with",
  highlightText: "100% quality assurance",
  cta_text: "Explore Our Products",
  image: "/agricultural-products-spices-vegetables-colorful-d.jpg",
};

export async function GET() {
  try {
    return NextResponse.json(heroData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hero data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "liveLabel",
      "typewriterText",
      "headingMain",
      "headingGradient",
      "description",
      "highlightText",
      "cta_text",
      "image",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Update the data
    heroData = { ...body };

    return NextResponse.json({
      success: true,
      message: "Hero data updated successfully!",
      data: heroData,
    });
  } catch (error) {
    console.error("Error updating hero data:", error);
    return NextResponse.json(
      { error: "Failed to update hero data" },
      { status: 500 }
    );
  }
}
