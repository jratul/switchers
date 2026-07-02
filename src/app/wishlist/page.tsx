import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/util/authOptions";
import { getWishlistByEmail } from "@/services/wishlistService";
import { serialize } from "@/util/serialize";
import WishlistClient from "./WishlistClient";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const list = await getWishlistByEmail(session.user.email);

  return <WishlistClient list={serialize(list)} />;
}
