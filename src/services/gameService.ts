import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { GameInfo } from "@/constants/types";

export async function getGamesByConditions(conditions: unknown[]) {
  const db = (await connectDB).db("switchers");
  const collection = db.collection("games");

  const result = await collection
    .aggregate([
      {
        $match: {
          $or: conditions,
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

  return result as unknown as GameInfo[];
}

export async function getGameById(gameId: string) {
  const db = (await connectDB).db("switchers");
  const collection = db.collection("games");

  try {
    const gameInfo = await collection.findOne({
      _id: ObjectId.createFromHexString(gameId),
    });

    return gameInfo as unknown as GameInfo | null;
  } catch (error) {
    return null;
  }
}

export async function getPopularGames() {
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
    .sort({ score: -1 })
    .limit(5)
    .toArray();

  return result as unknown as GameInfo[];
}

export async function getRecentGames() {
  const db = (await connectDB).db("switchers");
  const collection = db.collection("games");

  const result = await collection
    .find()
    .sort({ release: -1 })
    .limit(5)
    .toArray();

  return result as unknown as GameInfo[];
}
