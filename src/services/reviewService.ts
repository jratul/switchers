import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { ReviewInfo } from "@/constants/types";
import getReviewStat from "@/util/getReviewStat";

export async function getReviewsByGameId(gameId: string) {
  const db = (await connectDB).db("switchers");
  const collection = db.collection("reviews");

  try {
    const reviewList = await collection
      .find({
        gameId: ObjectId.createFromHexString(gameId),
      })
      .toArray();

    const reviewStat = getReviewStat(reviewList as unknown as ReviewInfo[]);

    return { reviewList: reviewList as unknown as ReviewInfo[], reviewStat };
  } catch (error) {
    return { reviewList: [] as ReviewInfo[], reviewStat: getReviewStat([]) };
  }
}
