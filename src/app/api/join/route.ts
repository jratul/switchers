import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export async function POST(req: Request) {
  const formData = await req.formData();

  const email = (formData.get("email") as string).replace(/(\s*)/g, "");
  const password = await bcrypt.hash(
    (formData.get("password") as string).replace(/(\s*)/g, ""),
    parseInt(process.env.BCRYPT_SALT ?? "10")
  );

  if (!email || !password || !emailRegex.test(email)) {
    return new Response("Invalid data", { status: 400 });
  }

  const db = (await connectDB).db("switchers");
  const collection = db.collection("users_cred");

  try {
    const post = await collection.findOne({ email: email });
    if (post) {
      return new Response("Exist email", { status: 409 });
    }

    await db.collection("users_cred").insertOne({
      email: email,
      password: password,
    });

    return new Response("Join Success", { status: 201 });
  } catch (error) {
    return new Response("Failed to join", { status: 500 });
  }
}
