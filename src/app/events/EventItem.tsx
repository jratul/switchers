"use client";

import Divider from "@/components/Divider";
import { EventInfo } from "@/constants/types";
import GameItem from "./GameItem";
import ProductItem from "./ProductItem";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import BaseDialog from "@/components/BaseDialog";
import useCartCountStore from "@/hooks/useCartCountStore";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EventItem({ eventInfo }: { eventInfo: EventInfo }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const [doneDialogOpen, setDoneDialogOpen] = useState<boolean>(false);

  const cartCount = useCartCountStore((state) => state.cartCount);
  const updateCartCount = useCartCountStore((state) => state.updateCartCount);

  const handleAddCart = () => {
    if (!eventInfo) {
      return;
    }

    fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        name: eventInfo.title,
        price: eventInfo.totalPrice,
        image: `${eventInfo.image}`,
        userEmail: session?.user?.email as string,
      }),
    }).then((res) => {
      if (res.status === 400 || res.status === 401) {
        router.push("/login");
      } else if (res.status === 409) {
        setErrorDialogOpen(true);
      } else {
        setDoneDialogOpen(true);
        updateCartCount(cartCount + 1);
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-3">
        <BaseDialog
          open={errorDialogOpen}
          setOpen={setErrorDialogOpen}
          title="중복 상품"
          content={["장바구니에 이미 해당 상품이 존재합니다."]}
          buttonText="확인"
          handleYes={() => {}}
        />
        <BaseDialog
          open={doneDialogOpen}
          setOpen={setDoneDialogOpen}
          title="추가 완료"
          content={["장바구니에 상품을 추가했습니다."]}
          buttonText="확인"
          handleYes={() => {}}
        />
        <div className="col-span-1">
          <div className="h-48 overflow-hidden">
            {eventInfo.image ? (
              <img src={eventInfo.image} alt={eventInfo.title} />
            ) : (
              <Spinner />
            )}
          </div>
        </div>
        <div className="col-span-1">
          <div className="text-xl text-red-500 font-bold">
            {eventInfo.title}
          </div>
          <div className="text-gray-600">
            &#65510; {eventInfo.totalPrice.toLocaleString()}
          </div>
          <div className="mb-3">{eventInfo.content}</div>
          <Link
            className="px-3 py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
            href="#"
            onClick={handleAddCart}
            scroll={false}
          >
            장바구니에 넣기
          </Link>
        </div>
      </div>
      <div className="text-lg text-red-400 font-semibold">상품 구성</div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {eventInfo.games.map((gameId) => (
          <GameItem key={gameId} gameId={gameId} />
        ))}
        {eventInfo.devices.map((deviceId) => (
          <ProductItem key={deviceId} productId={deviceId} dirName="devices" />
        ))}
        {eventInfo.accs.map((accId) => (
          <ProductItem key={accId} productId={accId} dirName="accs" />
        ))}
      </div>
      <Divider />
    </>
  );
}
