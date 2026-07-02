import { connectDB } from "@/util/database";
import { CartInfo } from "@/constants/types";

export async function getCartByEmail(email: string) {
  const db = (await connectDB).db("switchers");
  const collection = db.collection("cart");

  const cartList = await collection.find({ userEmail: email }).toArray();

  return cartList as unknown as CartInfo[];
}
