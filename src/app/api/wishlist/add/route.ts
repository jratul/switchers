import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { authOptions } from "@/util/authOptions";

const validDirNames = ["games", "devices", "accs"];

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json("unauthorized", { status: 401 });
  }

  const body = await req.json();

  if (!body.dirName || !validDirNames.includes(body.dirName) || !body.productId) {
    return Response.json("bad request", { status: 400 });
  }

  let productId;
  try {
    productId = ObjectId.createFromHexString(body.productId);
  } catch (error) {
    return Response.json("bad request", { status: 400 });
  }

  const db = (await connectDB).db("switchers");

  try {
    const collection = db.collection("wishlist");

    const existItem = await collection.findOne({
      userEmail: session.user.email,
      dirName: body.dirName,
      productId,
    });

    if (existItem) {
      return Response.json("exist item", { status: 409 });
    }

    const result = await collection.insertOne({
      userEmail: session.user.email,
      dirName: body.dirName,
      productId,
      addedAt: new Date(),
    });

    return Response.json(
      { wishlistId: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    return Response.json("server error", { status: 500 });
  }
}
