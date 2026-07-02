import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { authOptions } from "@/util/authOptions";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ status: 401 });
  }

  const body = await req.json();

  const wishlistId = body.wishlistId;
  if (!wishlistId) {
    return Response.json("not found", { status: 404 });
  }

  const db = (await connectDB).db("switchers");

  try {
    const collection = db.collection("wishlist");

    const entry = await collection.findOne({
      _id: ObjectId.createFromHexString(wishlistId),
    });

    if (!entry || session.user.email !== entry.userEmail) {
      return Response.json("unauthorized", { status: 401 });
    }

    await collection.deleteOne({
      _id: ObjectId.createFromHexString(wishlistId),
    });

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json("server error", { status: 500 });
  }
}
