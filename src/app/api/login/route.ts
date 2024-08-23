import { authOptions } from "@/util/authOptions";
import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    return Response.redirect("/");
  }

  const body = await req.json();

  const email = body.email;
  const password = body.password;

  if (!email || !password || !emailRegex.test(email)) {
    return new Response("Invalid data.", { status: 400 });
  }

  const db = (await connectDB).db("switchers");
  const collection = db.collection("users_cred");

  const userInfo = await collection.findOne({ email: email });

  if (!userInfo) {
    return new Response("User not found", { status: 401 });
  }

  const pwCheck = await bcrypt.compare(password, userInfo.password);

  if (!pwCheck) {
    return new Response("Failed to login", { status: 401 });
  }

  return Response.json({ email: userInfo.email }, { status: 200 });
}
