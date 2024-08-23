import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  if (!params.slug) {
    return Response.json("bad request", { status: 400 });
  }

  const db = (await connectDB).db("switchers");
  const collection = db.collection("devices");

  try {
    const deviceInfo = await collection.findOne({
      _id: ObjectId.createFromHexString(params.slug),
    });

    return Response.json(deviceInfo, { status: 200 });
  } catch (error) {
    return Response.json("not found", { status: 404 });
  }
}
