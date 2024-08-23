"use client";

import { CartInfo } from "@/constants/types";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { authenticated } from "@/constants/data";
import Loading from "../loading";
import CartItem from "./CartItem";
import useCartCountStore from "@/hooks/useCartCountStore";

export default function Cart() {
  const router = useRouter();

  const cartCount = useCartCountStore((state) => state.cartCount);
  const updateCartCount = useCartCountStore((state) => state.updateCartCount);

  const { data: session, status } = useSession();
  if (!session || status !== authenticated || !session?.user?.email) {
    redirect("/login");
  }

  const [cartList, setCartList] = useState<CartInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCartList = () => {
    if (!session?.user?.email) {
      redirect("/login");
    }

    setLoading(true);

    fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({ userEmail: session?.user?.email }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then((cartList) => {
        setCartList(cartList);
        updateCartCount(cartList.length);
      })
      .catch(() => {
        redirect("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCartList();
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-5">
      <div className="flex items-center">
        <Link
          href="#"
          onClick={() => router.back()}
          className="inline-block mr-3 rounded-md bg-red-500 px-5 py-1 text-base font-medium text-white hover:bg-red-400"
        >
          &larr;
        </Link>
        <span className="text-red-500 text-4xl font-bold">장바구니</span>
      </div>
      {loading ? (
        <Loading />
      ) : cartList.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="col-span-1">
            {cartList.map((cartInfo) => (
              <CartItem cartInfo={cartInfo} refresh={getCartList} />
            ))}
          </div>
          <div className="col-span-1"></div>
        </div>
      ) : (
        <div className="text-center text-xl">장바구니가 비어 있습니다.</div>
      )}
    </div>
  );
}
