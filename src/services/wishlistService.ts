import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { WishlistEntry, GameInfo, ProductInfo } from "@/constants/types";
import { getGameById } from "@/services/gameService";
import { getProductBySlug } from "@/services/productService";

async function resolveEntry(entry: WishlistEntry) {
  const productId = entry.productId.toString();

  const productInfo =
    entry.dirName === "games"
      ? await getGameById(productId)
      : await getProductBySlug(entry.dirName, productId);

  if (!productInfo) {
    return null;
  }

  return {
    wishlistId: entry._id.toString(),
    dirName: entry.dirName,
    productInfo: productInfo as GameInfo | ProductInfo,
  };
}

export async function getWishlistByEmail(email: string) {
  const db = (await connectDB).db("switchers");
  const collection = db.collection("wishlist");

  const entries = (await collection
    .find({ userEmail: email })
    .sort({ addedAt: -1 })
    .toArray()) as unknown as WishlistEntry[];

  const resolved = await Promise.all(entries.map(resolveEntry));

  return resolved.filter(
    (entry): entry is NonNullable<typeof entry> => entry !== null
  );
}

export async function getWishlistEntry(
  email: string,
  dirName: WishlistEntry["dirName"],
  productId: string
) {
  const db = (await connectDB).db("switchers");
  const collection = db.collection("wishlist");

  const entry = await collection.findOne({
    userEmail: email,
    dirName,
    productId: ObjectId.createFromHexString(productId),
  });

  return entry as unknown as WishlistEntry | null;
}

export async function getWishlistCount(email: string) {
  const db = (await connectDB).db("switchers");
  const collection = db.collection("wishlist");

  return collection.countDocuments({ userEmail: email });
}
