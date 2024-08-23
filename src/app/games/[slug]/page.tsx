"use client";
import Rating from "@/components/Rating";
import { GameInfo } from "@/constants/types";
import Link from "next/link";
import { notFound, redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import Loading from "@/app/loading";
import Divider from "@/components/Divider";
import Review from "./Review";
import { useSession } from "next-auth/react";
import { authenticated } from "@/constants/data";
import BaseDialog from "@/components/BaseDialog";
import useCartCountStore from "@/hooks/useCartCountStore";

export default function GameDetail({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [gameInfo, setGameInfo] = useState<GameInfo>();
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const [doneDialogOpen, setDoneDialogOpen] = useState<boolean>(false);

  const cartCount = useCartCountStore((state) => state.cartCount);
  const updateCartCount = useCartCountStore((state) => state.updateCartCount);

  const handleAddCart = () => {
    if (!session || status !== authenticated || !session?.user?.email) {
      redirect("/login");
    }

    if (!gameInfo) {
      return;
    }

    fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        name: gameInfo.name,
        price: gameInfo.price,
        image: `${process.env.NEXT_PUBLIC_BUCKET_URL}/${gameInfo.image}`,
        userEmail: session?.user?.email as string,
      }),
    }).then((res) => {
      if (res.status === 409) {
        setErrorDialogOpen(true);
      } else if (!res.ok) {
        throw new Error();
      } else {
        setDoneDialogOpen(true);
        updateCartCount(cartCount + 1);
      }
    });
  };

  useEffect(() => {
    if (!params.slug) {
      notFound();
    }

    fetch(`/api/games/${params.slug}`)
      .then((res) => {
        if (!res.ok) {
          notFound();
        }
        return res.json();
      })
      .then((gameInfo) => {
        setGameInfo(gameInfo);
      })
      .catch(() => {
        notFound();
      });
  }, [params.slug]);

  return (
    <div className="mx-auto max-w-6xl p-5">
      <Link
        href="#"
        onClick={() => router.back()}
        className="inline-block m-3 rounded-md bg-red-500 px-5 py-1 text-base font-medium text-white hover:bg-red-400"
      >
        &larr;
      </Link>
      {!gameInfo ? (
        <Loading />
      ) : (
        <>
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
          <span className="align-middle text-4xl text-red-500 font-bold">
            {gameInfo?.name}
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="col-span-1">
              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${gameInfo?.image}`}
                />
              </div>
            </div>
            <div className="flex flex-col flex-initial col-span-1 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  &#65510; {gameInfo?.price?.toLocaleString()}
                </span>
                |
                <Rating rating={4.5} />
                <span>4.5</span>
              </div>
              <div>
                <div className="text-xl text-red-500 font-semibold">장르</div>
                <div>{gameInfo?.genre}</div>
              </div>
              <div>
                <div className="text-xl text-red-500 font-semibold">출시일</div>
                <div>
                  {gameInfo?.release &&
                    format(gameInfo?.release, "yyyy년 MM월 dd일")}
                </div>
              </div>
              <div>
                <div className="text-xl text-red-500 font-semibold">제작사</div>
                <div>{gameInfo?.company}</div>
              </div>
              <p className="text-gray-500">{gameInfo?.desc}</p>
              <Link
                href="#"
                className="py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
                onClick={handleAddCart}
                scroll={false}
              >
                장바구니에 넣기
              </Link>
            </div>
          </div>
          <Divider />
          <Review gameId={params.slug} />
        </>
      )}
    </div>
  );
}
