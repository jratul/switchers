import { ReviewInfo } from "@/constants/types";

import { connectDB } from "@/util/database";
import getReviewStat from "@/util/getReviewStat";
import { ObjectId } from "mongodb";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  if (!params.slug) {
    return Response.json("bad request", { status: 400 });
  }

  const db = (await connectDB).db("switchers");

  const collection = db.collection("reviews");

  try {
    const reviewList = await collection
      .find({
        gameId: ObjectId.createFromHexString(params.slug),
      })
      .toArray();

    const reviewStat = getReviewStat(reviewList as ReviewInfo[]);

    return Response.json({ reviewList, reviewStat }, { status: 200 });
  } catch (error) {
    return Response.json("server error", { status: 500 });
  }
}
