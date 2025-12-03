import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const [awards, certifications, compliances] = await Promise.all([
      db.collection("awards").find().sort({ order: 1 }).toArray(),
      db.collection("certifications").find().sort({ order: 1 }).toArray(),
      db.collection("compliances").find().sort({ order: 1 }).toArray(),
    ]);

    return NextResponse.json({
      awards,
      certifications,
      compliances,
    });
  } catch (error) {
    console.error("Error fetching awards data:", error);
    return NextResponse.json(
      { error: "Failed to fetch awards data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const type = formData.get("type") as
      | "award"
      | "certification"
      | "compliance";

    if (!type) {
      return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    let result;

    switch (type) {
      case "award":
        result = await handleAwardUpload(formData, db);
        break;
      case "certification":
        result = await handleCertificationUpload(formData, db);
        break;
      case "compliance":
        result = await handleComplianceUpload(formData, db);
        break;
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type") as
      | "award"
      | "certification"
      | "compliance";

    if (!id || !type) {
      return NextResponse.json(
        { error: "ID and type are required" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const { db } = await connectToDatabase();

    let result;
    switch (type) {
      case "award":
        result = await updateAward(id, formData, db);
        break;
      case "certification":
        result = await updateCertification(id, formData, db);
        break;
      case "compliance":
        result = await updateCompliance(id, formData, db);
        break;
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type") as
      | "award"
      | "certification"
      | "compliance";
    const collection = searchParams.get("collection");

    if (!id || !type || !collection) {
      return NextResponse.json(
        { error: "ID, type and collection are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    await db.collection(collection).deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}

async function handleAwardUpload(formData: FormData, db: any) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const order = parseInt(formData.get("order") as string) || 0;
  const featured = formData.get("featured") === "true";
  const imageFile = formData.get("image") as File;

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  let imagePath = "";
  if (imageFile && imageFile.size > 0) {
    imagePath = await uploadImage(imageFile, "awards");
  }

  const result = await db.collection("awards").insertOne({
    title,
    description,
    category,
    order,
    featured,
    image: imagePath,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    success: true,
    message: "Award added successfully",
    id: result.insertedId,
  };
}

async function handleCertificationUpload(formData: FormData, db: any) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const order = parseInt(formData.get("order") as string) || 0;
  const featured = formData.get("featured") === "true";
  const imageFile = formData.get("image") as File;

  if (!name) {
    throw new Error("Name is required");
  }

  let imagePath = "";
  if (imageFile && imageFile.size > 0) {
    imagePath = await uploadImage(imageFile, "certifications");
  }

  const result = await db.collection("certifications").insertOne({
    name,
    description,
    order,
    featured,
    image: imagePath,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    success: true,
    message: "Certification added successfully",
    id: result.insertedId,
  };
}

async function handleComplianceUpload(formData: FormData, db: any) {
  const title = formData.get("title") as string;
  const value = formData.get("value") as string;
  const description = formData.get("description") as string;
  const order = parseInt(formData.get("order") as string) || 0;

  if (!title || !value) {
    throw new Error("Title and value are required");
  }

  const result = await db.collection("compliances").insertOne({
    title,
    value,
    description,
    order,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    success: true,
    message: "Compliance added successfully",
    id: result.insertedId,
  };
}

async function updateAward(id: string, formData: FormData, db: any) {
  const updateData: any = {
    updatedAt: new Date(),
  };

  const fields = ["title", "description", "category", "order", "featured"];
  fields.forEach((field) => {
    const value = formData.get(field);
    if (value !== null) {
      if (field === "order") updateData[field] = parseInt(value as string);
      else if (field === "featured") updateData[field] = value === "true";
      else updateData[field] = value;
    }
  });

  const imageFile = formData.get("image") as File;
  if (imageFile && imageFile.size > 0) {
    updateData.image = await uploadImage(imageFile, "awards");
  }

  await db
    .collection("awards")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  return {
    success: true,
    message: "Award updated successfully",
  };
}

async function updateCertification(id: string, formData: FormData, db: any) {
  const updateData: any = {
    updatedAt: new Date(),
  };

  const fields = ["name", "description", "order", "featured"];
  fields.forEach((field) => {
    const value = formData.get(field);
    if (value !== null) {
      if (field === "order") updateData[field] = parseInt(value as string);
      else if (field === "featured") updateData[field] = value === "true";
      else updateData[field] = value;
    }
  });

  const imageFile = formData.get("image") as File;
  if (imageFile && imageFile.size > 0) {
    updateData.image = await uploadImage(imageFile, "certifications");
  }

  await db
    .collection("certifications")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  return {
    success: true,
    message: "Certification updated successfully",
  };
}

async function updateCompliance(id: string, formData: FormData, db: any) {
  const updateData: any = {
    updatedAt: new Date(),
  };

  const fields = ["title", "value", "description", "order"];
  fields.forEach((field) => {
    const value = formData.get(field);
    if (value !== null) {
      if (field === "order") updateData[field] = parseInt(value as string);
      else updateData[field] = value;
    }
  });

  await db
    .collection("compliances")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  return {
    success: true,
    message: "Compliance updated successfully",
  };
}

async function uploadImage(imageFile: File, folder: string): Promise<string> {
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const timestamp = Date.now();
  const originalName = imageFile.name.replace(/\s+/g, "-");
  const filename = `${timestamp}-${originalName}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

  const publicPath = `/uploads/${folder}/${filename}`;
  const filePath = path.join(process.cwd(), "public", publicPath);

  await writeFile(filePath, buffer);
  return publicPath;
}
