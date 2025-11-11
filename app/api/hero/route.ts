import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const data = await db.collection("hero").findOne({})

    if (!data) {
      return NextResponse.json({
        title: "Premium Agricultural Exports from India",
        subtitle: "Delivering quality spices, pulses, and fresh produce to 50+ countries worldwide",
        cta_text: "Get Started",
        image: "/agricultural-products-spices-vegetables-colorful-d.jpg",
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching hero data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    await db.collection("hero").updateOne({}, { $set: body }, { upsert: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating hero data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}
