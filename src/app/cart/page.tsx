import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/util/authOptions";
import { getCartByEmail } from "@/services/cartService";
import { serialize } from "@/util/serialize";
import CartClient from "./CartClient";

export default async function Cart() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const cartList = await getCartByEmail(session.user.email);
  const totalPrice = cartList.reduce((sum, item) => sum + item.price, 0);

  return <CartClient cartList={serialize(cartList)} totalPrice={totalPrice} />;
}
