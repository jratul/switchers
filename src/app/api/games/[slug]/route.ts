import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  if (!params.slug) {
    return Response.json("not found", { status: 400 });
  }

  const db = (await connectDB).db("switchers");
  const collection = db.collection("games");

  try {
    const gameInfo = await collection.findOne({
      _id: ObjectId.createFromHexString(params.slug),
    });

    return Response.json(gameInfo, { status: 200 });
  } catch (error) {
    return Response.json("not found", { status: 404 });
  }
}
