import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  if (!params.slug) {
    return Response.json([], { status: 400 });
  }

  const db = (await connectDB).db("switchers");

  const collection = db.collection("reviews");

  try {
    const reviewList = await collection
      .find({
        gameId: ObjectId.createFromHexString(params.slug),
      })
      .toArray();

    return Response.json(reviewList, { status: 200 });
  } catch (error) {
    return Response.json([], { status: 404 });
  }
}
