import { connectDB } from "@/util/database";

export async function GET() {
  const db = (await connectDB).db("switchers");

  const collection = db.collection("games");

  const result = await collection
    .aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "gameId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          score: {
            $round: [{ $avg: "$reviews.score" }, 2],
          },
        },
      },
      {
        $project: {
          reviews: 0,
        },
      },
    ])
    .sort({ score: 1 })
    .limit(5)
    .toArray();

  return Response.json(result, { status: 200 });
}
