import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const enquiries = await db
      .collection("enquiries")
      .aggregate([
        { $sort: { createdAt: -1 } },

        {
          $addFields: {
            selectedProducts: {
              $map: {
                input: "$selectedProducts",
                as: "p",
                in: { $toObjectId: "$$p" },
              },
            },
          },
        },

        {
          $lookup: {
            from: "products",
            localField: "selectedProducts",
            foreignField: "_id",
            as: "productDetails",
          },
        },
      ])
      .toArray();

    const formattedEnquiries = enquiries.map((enquiry) => ({
      _id: enquiry._id.toString(),
      name: enquiry.name || "",
      email: enquiry.email || "",
      phone: enquiry.phone || "",
      city: enquiry.city || "",
      country: enquiry.country || "",
      enquiry: enquiry.enquiry || "",
      selectedProducts: (enquiry.selectedProducts || [])
        .map((id: ObjectId) => id?.toString() || "")
        .filter(Boolean),
      productDetails: (enquiry.productDetails || []).map((product: any) => {
        return {
          id: product?.id || product?._id?.toString() || "",
          name: product?.name || "Unknown Product",
          subtitle: product?.subtitle || "",
          image: product?.image || "/images/placeholder-product.jpg",
          botanicalName: product?.botanicalName || "",
          form: product?.form || "",
          packaging: product?.packaging || "",
          origin: product?.origin || "",
          gallery: product?.gallery || [],
          specifications: product?.specifications || {},
          description: product?.description || "",
          benefits: product?.benefits || "",
          details: product?.details || "",
          price: product?.price || "",
          minQuantity: product?.minQuantity || "",
          shelfLife: product?.shelfLife || "",
        };
      }),
      createdAt: enquiry.createdAt || new Date().toISOString(),
      updatedAt:
        enquiry.updatedAt || enquiry.createdAt || new Date().toISOString(),
      status: enquiry.status || "new",
      read: enquiry.read || false,
      source: enquiry.source || "website",
    }));

    return NextResponse.json(formattedEnquiries);
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

    const { name, email, phone, city, country, enquiry, productIds } = body;

    if (!name || !email || !enquiry) {
      return NextResponse.json(
        { error: "Name, email and enquiry are required" },
        { status: 400 }
      );
    }

    const productsIds: ObjectId[] = [];

    if (Array.isArray(productIds)) {
      for (const productId of productIds) {
        try {
          if (
            productId &&
            productId.trim() !== "" &&
            ObjectId.isValid(productId)
          ) {
            productsIds.push(new ObjectId(productId));
          }
        } catch (error) {
          console.error("Error converting product ID:", productId, error);
        }
      }
    }

    const enquiryData = {
      name,
      email,
      phone: phone || "",
      city: city || "",
      country: country || "",
      enquiry,
      selectedProducts: productsIds,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "new",
      read: false,
      source: "website",
    };
    const result = await db.collection("enquiries").insertOne(enquiryData);

    const createdEnquiry = await db
      .collection("enquiries")
      .aggregate([
        { $match: { _id: result.insertedId } },
        {
          $lookup: {
            from: "products",
            localField: "selectedProducts",
            foreignField: "_id",
            as: "productDetails",
          },
        },
      ])
      .next();

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      id: result.insertedId.toString(),
      enquiry: createdEnquiry
        ? {
            ...createdEnquiry,
            _id: createdEnquiry._id.toString(),
            selectedProducts: (createdEnquiry.selectedProducts || []).map(
              (id: ObjectId) => id.toString()
            ),
            productDetails: (createdEnquiry.productDetails || []).map(
              (product: any) => ({
                id: product._id.toString(),
                name: product.name || "Unknown",
                image: product.image || "",
                subtitle: product.subtitle || "",
                botanicalName: product.botanicalName || "",
              })
            ),
          }
        : null,
    });
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

    body.updatedAt = new Date();

    const result = await db
      .collection("enquiries")
      .updateOne({ _id: new ObjectId(id) }, { $set: body });

    if (result.modifiedCount > 0) {
      return NextResponse.json({
        success: true,
        updated: true,
      });
    }

    return NextResponse.json({
      success: false,
      updated: false,
      message: "Enquiry not found or not modified",
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}
