"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { GameInfo, ReviewInfo, ReviewStat } from "@/constants/types";
import Divider from "@/components/Divider";
import Review from "./Review";
import BaseDialog from "@/components/BaseDialog";
import GameProductListItem from "@/components/GameProductListItem";
import WishlistButton from "@/components/WishlistButton";
import SkeletonImage from "@/components/SkeletonImage";
import useCartCountStore from "@/hooks/useCartCountStore";
import Spinner from "@/components/Spinner";

interface Props {
  gameInfo: GameInfo;
  reviewList: ReviewInfo[];
  reviewStat: ReviewStat;
  relatedGames: GameInfo[];
  initialWishlisted: boolean;
  initialWishlistId: string | null;
}

export default function GameDetailClient({
  gameInfo,
  reviewList,
  reviewStat,
  relatedGames,
  initialWishlisted,
  initialWishlistId,
}: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const [doneDialogOpen, setDoneDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const cartCount = useCartCountStore((state) => state.cartCount);
  const updateCartCount = useCartCountStore((state) => state.updateCartCount);

  const handleAddCart = () => {
    setLoading(true);

    fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        name: gameInfo.name,
        price: gameInfo.price,
        image: `${process.env.NEXT_PUBLIC_BUCKET_URL}/${gameInfo.image}`,
        userEmail: session?.user?.email as string,
      }),
    })
      .then((res) => {
        if (res.status === 400 || res.status === 401) {
          router.push("/login");
        } else if (res.status === 409) {
          setErrorDialogOpen(true);
        } else {
          setDoneDialogOpen(true);
          updateCartCount(cartCount + 1);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto max-w-6xl p-5">
      <button
        onClick={() => router.back()}
        className="inline-block m-3 rounded-md bg-red-500 px-5 py-1 text-base font-medium text-white hover:bg-red-400"
      >
        &larr;
      </button>
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
        {gameInfo.name}
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="col-span-1">
          <div className="relative w-full aspect-square">
            <SkeletonImage
              src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${gameInfo.image}`}
              alt={gameInfo.name}
              priority
              sizes="(min-width: 1024px) 576px, 100vw"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col flex-initial col-span-1 gap-2">
          <div className="flex items-center gap-3">
            <span className="text-lg">
              &#65510; {gameInfo?.price?.toLocaleString()}
            </span>
          </div>
          <div>
            <div className="text-xl text-red-500 font-semibold">장르</div>
            <div>{gameInfo?.genre}</div>
          </div>
          <div>
            <div className="text-xl text-red-500 font-semibold">출시일</div>
            <div>
              {gameInfo?.release &&
                format(new Date(gameInfo.release), "yyyy년 MM월 dd일")}
            </div>
          </div>
          <div>
            <div className="text-xl text-red-500 font-semibold">제작사</div>
            <div>{gameInfo?.company}</div>
          </div>
          <p className="text-gray-500">{gameInfo?.desc}</p>
          <div className="flex gap-2">
            <button
              className="flex-1 py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
              onClick={handleAddCart}
              disabled={loading}
            >
              {loading ? <Spinner size={26} /> : <span>장바구니에 넣기</span>}
            </button>
            <WishlistButton
              dirName="games"
              productId={gameInfo._id.toString()}
              initialWishlisted={initialWishlisted}
              initialWishlistId={initialWishlistId}
            />
          </div>
        </div>
      </div>
      <Divider />
      <Review reviewList={reviewList} reviewStat={reviewStat} />
      {relatedGames.length > 0 && (
        <>
          <Divider />
          <p className="text-xl text-red-400 font-semibold mb-3">관련 상품</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {relatedGames.map((related) => (
              <GameProductListItem
                gameInfo={related}
                key={related._id.toString()}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
