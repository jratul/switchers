import { connectDB } from "@/util/database";

export async function GET() {
  const db = (await connectDB).db("switchers");

  const collection = db.collection("devices");

  try {
    const deviceList = await collection.find().toArray();
    return Response.json(deviceList, { status: 200 });
  } catch (error) {
    return Response.json("not found", { status: 404 });
  }
}
