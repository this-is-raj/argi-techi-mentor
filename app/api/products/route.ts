import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")
    const category = searchParams.get("category")

    if (id) {
      try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) })
        if (!product) {
          return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }
        return NextResponse.json({ ...product, id: product._id })
      } catch (e) {
        const product = await db.collection("products").findOne({ id })
        if (!product) {
          return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }
        return NextResponse.json({ ...product, id: product._id || product.id })
      }
    }

    if (category) {
      const filtered = await db.collection("products").find({ category }).toArray()
      return NextResponse.json(
        filtered.map((p) => ({
          ...p,
          id: (p as any)._id ? (p as any)._id.toString() : p.id,
        })),
      )
    }

    const products = await db.collection("products").find({}).toArray()

    return NextResponse.json(
      products.map((p) => ({
        ...p,
        id: (p as any)._id ? (p as any)._id.toString() : p.id,
      })),
    )
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const result = await db.collection("products").insertOne(body)

    return NextResponse.json({ id: result.insertedId, ...body }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const { id, ...updateData } = body

    try {
      const result = await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    } catch (e) {
      const result = await db.collection("products").updateOne({ id }, { $set: updateData })

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    try {
      const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    } catch (e) {
      const result = await db.collection("products").deleteOne({ id })

      if (result.deletedCount === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
