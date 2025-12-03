import { NextRequest, NextResponse } from "next/server";

let sectionContent = {
  title: "BY CATEGORIES",
  description:
    "We bring you the finest selection over the years with a huge customer base worldwide. We offer a wide range of products without compromising on quality. We ensure the goodwill and trust of our global clients are highly prioritized.",
};

export async function GET() {
  try {
    return NextResponse.json({ productsSection: sectionContent });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch section content" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      !body.productsSection ||
      !body.productsSection.title ||
      !body.productsSection.description
    ) {
      return NextResponse.json(
        { error: "Missing required fields in productsSection" },
        { status: 400 }
      );
    }

    sectionContent = {
      title: body.productsSection.title,
      description: body.productsSection.description,
    };

    return NextResponse.json({
      success: true,
      message: "Section content updated successfully!",
      data: { productsSection: sectionContent },
    });
  } catch (error) {
    console.error("Error updating section content:", error);
    return NextResponse.json(
      { error: "Failed to update section content" },
      { status: 500 }
    );
  }
}
