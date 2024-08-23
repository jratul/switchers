import { connectDB } from "@/util/database";

export async function GET() {
  const db = (await connectDB).db("switchers");

  const collection = db.collection("accs");

  try {
    const accList = await collection.find().toArray();
    return Response.json(accList, { status: 200 });
  } catch (error) {
    return Response.json({ status: 404 });
  }
}
