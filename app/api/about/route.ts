import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const data = await db.collection("about").findOne({})

    if (!data) {
      return NextResponse.json({
        title: "About Agro TechieMentor",
        description:
          "We are a leading exporter of premium agricultural products from India, committed to quality and sustainability.",
        mission: "To provide the highest quality agricultural products to global markets",
        vision: "To be the most trusted agricultural export company in the world",
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching about data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    await db.collection("about").updateOne({}, { $set: body }, { upsert: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating about data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}
