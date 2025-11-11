import { MongoClient, type Db } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const uri = process.env.MONGODB_URI || "mongodb+srv://harish12:harish12@agritechimentor.w4f6ksp.mongodb.net/agritechimentor"

  const client = new MongoClient(uri)

  await client.connect()
  const db = client.db("agritech")

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}
