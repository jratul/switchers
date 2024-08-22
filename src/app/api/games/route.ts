import { connectDB } from "@/util/database";

export async function POST(req: Request) {
  const db = (await connectDB).db("switchers");

  const collection = db.collection("games");

  const body = await req.json();

  try {
    const result = await collection
      .aggregate([
        {
          $match: {
            $or: body,
          },
        },
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
      .toArray();

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json([], { status: 500 });
  }
}
