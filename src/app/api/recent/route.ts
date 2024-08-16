import { connectDB } from "@/util/database";

export async function GET() {
  const db = (await connectDB).db("switchers");

  const collection = db.collection("games");

  const result = await collection
    .find()
    .sort({ release: -1 })
    .limit(5)
    .toArray();

  return Response.json(result, { status: 200 });
}
