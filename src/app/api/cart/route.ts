import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "@/util/authOptions";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ status: 401 });
  }

  const db = (await connectDB).db("switchers");

  try {
    const collection = db.collection("cart");

    const cartList = await collection
      .find({ userEmail: session.user.email })
      .toArray();
    return Response.json(cartList, { status: 200 });
  } catch (error) {
    return Response.json({ status: 401 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ status: 401 });
  }

  const body = await req.json();

  const cartId = body.cartId;
  if (!cartId) {
    return Response.json("not found", { status: 404 });
  }

  const db = (await connectDB).db("switchers");

  try {
    const collection = db.collection("cart");

    const cartItem = await collection.findOne({
      _id: ObjectId.createFromHexString(cartId),
    });

    if (!cartItem || session?.user?.email !== cartItem.userEmail) {
      return Response.json("unauthorized", { status: 401 });
    }

    const result = await collection.deleteOne({
      _id: ObjectId.createFromHexString(cartId),
    });

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json("server error", { status: 500 });
  }
}
