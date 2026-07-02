import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i;

export async function POST(req: Request) {
  const formData = await req.formData();

  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");

  if (typeof rawEmail !== "string" || typeof rawPassword !== "string") {
    return new Response("Invalid data", { status: 400 });
  }

  const email = rawEmail.replace(/(\s*)/g, "");
  const plainPassword = rawPassword.replace(/(\s*)/g, "");

  if (!email || !plainPassword || !emailRegex.test(email)) {
    return new Response("Invalid data", { status: 400 });
  }

  const password = await bcrypt.hash(
    plainPassword,
    parseInt(process.env.BCRYPT_SALT ?? "10")
  );

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
