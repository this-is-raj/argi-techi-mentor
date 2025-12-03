import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { ObjectId } from "mongodb";

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const color = formData.get("color") as string;
    const monthsString = formData.get("months") as string;
    const imageFile = formData.get("image") as File;

    if (!name || !monthsString) {
      return NextResponse.json(
        { error: "Name and months are required" },
        { status: 400 }
      );
    }

    const months = JSON.parse(monthsString);

    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const originalName = imageFile.name.replace(/\s+/g, "-");
      const filename = `${timestamp}-${originalName}`;

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "harvest-calendar"
      );

      const publicPath = `/uploads/harvest-calendar/${filename}`;
      const filePath = path.join(process.cwd(), "public", publicPath);

      await writeFile(filePath, buffer);
      imagePath = publicPath;
    }

    const { db } = await connectToDatabase();

    const result = await db.collection("harvestCalendar").insertOne({
      name,
      months,
      color: color || "bg-gray-500",
      image: imagePath,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Harvest calendar item added",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding calendar item:", error);
    return NextResponse.json(
      { error: "Failed to add calendar item" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const color = formData.get("color") as string;
    const monthsString = formData.get("months") as string;
    const imageFile = formData.get("image") as File;

    const { db } = await connectToDatabase();

    const months = monthsString ? JSON.parse(monthsString) : undefined;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (color) updateData.color = color;
    if (months) updateData.months = months;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const originalName = imageFile.name.replace(/\s+/g, "-");
      const filename = `${timestamp}-${originalName}`;

      const publicPath = `/uploads/harvest-calendar/${filename}`;
      const filePath = path.join(process.cwd(), "public", publicPath);

      await writeFile(filePath, buffer);
      updateData.image = publicPath;
    }

    const result = await db
      .collection("harvestCalendar")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    await db.collection("harvestCalendar").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
