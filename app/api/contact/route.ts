import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const data = await db.collection("contact").findOne({})

    if (!data) {
      return NextResponse.json({
        email: "info@agritechimentor.com",
        phone: "+91-9549235277",
        address: "E-9/508 Chitrakoot, Jaipur, Rajasthan",
        website: "www.agritechimentor.com",
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching contact data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    await db.collection("contact").updateOne({}, { $set: body }, { upsert: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating contact data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}
