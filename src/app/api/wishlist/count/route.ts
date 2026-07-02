import { getServerSession } from "next-auth";
import { authOptions } from "@/util/authOptions";
import { getWishlistCount } from "@/services/wishlistService";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ count: 0 }, { status: 401 });
  }

  try {
    const count = await getWishlistCount(session.user.email);
    return Response.json({ count }, { status: 200 });
  } catch (error) {
    return Response.json({ count: 0 }, { status: 500 });
  }
}
