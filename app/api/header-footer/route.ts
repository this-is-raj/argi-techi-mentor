import { connectToDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const data = await db.collection("headerFooter").findOne({})

    if (!data) {
      return NextResponse.json({
        headerPhone: "+91 9549235277",
        headerEmail: "techiementor.co@gmail.com",
        websiteName: "Agro TechieMentor",
        footerDescription: "Leading exporter of premium agricultural products from India to global markets.",
        footerAddress: "E-9/508 Chitrakoot, Jaipur, Rajasthan",
        footerPhone: "+91 9549235277",
        footerEmail: "techiementor.co@gmail.com",
        website: "www.agritechimentor.com",
        logo: "/placeholder-logo.png",
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching header/footer data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    await db.collection("headerFooter").updateOne({}, { $set: body }, { upsert: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating header/footer data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}
