"use client";

import { CartInfo } from "@/constants/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import CartItem from "./CartItem";
import useCartCountStore from "@/hooks/useCartCountStore";

export default function Cart() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const updateCartCount = useCartCountStore((state) => state.updateCartCount);

  const [cartList, setCartList] = useState<CartInfo[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getCartList = () => {
    if (!session?.user?.email) {
      return;
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
        router.push("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setTotalPrice(() => {
      let totalPrice = 0;
      cartList.map((cartItem) => {
        totalPrice += cartItem.price;
      });
      return totalPrice;
    });
  }, [cartList]);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session || status !== "authenticated" || !session.user?.email) {
      router.push("/login");
    }

    getCartList();
  }, [session, status, router]);

  return (
    <div className="mx-auto max-w-6xl p-5">
      <div className="flex items-center">
        <button
          onClick={() => router.back()}
          className="inline-block mr-3 rounded-md bg-red-500 px-5 py-1 text-base font-medium text-white hover:bg-red-400"
        >
          &larr;
        </button>
        <span className="text-red-500 text-4xl font-bold">장바구니</span>
      </div>
      {loading ? (
        <Loading />
      ) : cartList.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="col-span-1">
            {cartList.map((cartInfo) => (
              <CartItem
                cartInfo={cartInfo}
                refresh={getCartList}
                key={cartInfo._id.toString()}
              />
            ))}
          </div>
          <div className="col-span-1">
            <div className="m-3 p-5 rounded border border-red-300 shadow">
              <div className="text-red-500 text-xl font-semibold">총 가격</div>
              <div className="mb-3">&#65510; {totalPrice.toLocaleString()}</div>
              <div>
                <form action="#">
                  <div className="flex gap-5 items-center">
                    <label className="flex items-center mb-5">
                      <input
                        type="radio"
                        name="pay"
                        defaultChecked={true}
                        className="items-center h-full mr-2"
                      />
                      <div className="w-20 h-full items-center">
                        <img src="/images/pay/naver-pay.svg" alt="naver pay" />
                      </div>
                    </label>
                    <label className="flex items-center mb-5">
                      <input
                        type="radio"
                        name="pay"
                        defaultChecked={false}
                        className="items-center h-full mr-2"
                      />
                      <div className="w-20 h-full items-center">
                        <img src="/images/pay/kakao-pay.svg" alt="naver pay" />
                      </div>
                    </label>
                    <label className="flex items-center mb-5">
                      <input
                        type="radio"
                        name="pay"
                        defaultChecked={false}
                        className="items-center h-full mr-2"
                      />
                      <div className="w-20 h-full items-center">
                        <img
                          src="/images/pay/samsung-pay.png"
                          alt="samsung pay"
                        />
                      </div>
                    </label>
                    <label className="flex items-center mb-5">
                      <input
                        type="radio"
                        name="pay"
                        defaultChecked={false}
                        className="items-center h-full mr-2"
                      />
                      <div className="w-20 h-full items-center">
                        <img src="/images/pay/apple-pay.svg" alt="apple pay" />
                      </div>
                    </label>
                  </div>
                </form>
              </div>
              <div>
                <button className="my-3 px-3 py-2 text-white bg-red-500 hover:bg-red-300">
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl">장바구니가 비어 있습니다.</div>
      )}
    </div>
  );
}
