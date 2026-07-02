import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { ProductInfo } from "@/constants/types";

export type ProductDirName = "accs" | "devices";

export async function getProductList(dirName: ProductDirName) {
  const db = (await connectDB).db("switchers");
  const collection = db.collection(dirName);

  const list = await collection.find().toArray();

  return list as unknown as ProductInfo[];
}

export async function getProductBySlug(dirName: ProductDirName, slug: string) {
  const db = (await connectDB).db("switchers");
  const collection = db.collection(dirName);

  try {
    const productInfo = await collection.findOne({
      _id: ObjectId.createFromHexString(slug),
    });

    return productInfo as unknown as ProductInfo | null;
  } catch (error) {
    return null;
  }
}
