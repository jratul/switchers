import { connectDB } from "@/util/database";
import { escapeRegExp } from "@/util/escapeRegExp";
import { GameInfo, ProductInfo } from "@/constants/types";

export async function searchProducts(query: string) {
  const db = (await connectDB).db("switchers");
  const nameRegex = { name: { $regex: escapeRegExp(query), $options: "i" } };

  const [games, devices, accs] = await Promise.all([
    db.collection("games").find(nameRegex).limit(20).toArray(),
    db.collection("devices").find(nameRegex).limit(20).toArray(),
    db.collection("accs").find(nameRegex).limit(20).toArray(),
  ]);

  return {
    games: games as unknown as GameInfo[],
    devices: devices as unknown as ProductInfo[],
    accs: accs as unknown as ProductInfo[],
  };
}
