import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";
import { authOptions } from "@/util/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user?.email) {
    return Response.json({ status: 401 });
  }

  const body = await req.json();

  if (!body.name || !body.price || !body.image) {
    return Response.json({ status: 400 });
  }

  const db = (await connectDB).db("switchers");

  try {
    const collection = db.collection("cart");

    const existItem = await collection.find({ name: body.name }).toArray();

    if (existItem.length > 0) {
      return Response.json("exist item", { status: 409 });
    }

    await collection.insertOne({
      name: body.name,
      price: body.price,
      count: 1,
      image: body.image,
      userEmail: session?.user?.email as string,
    });

    return Response.json({ status: 201 });
  } catch (error) {
    return Response.json({ status: 401 });
  }
}
