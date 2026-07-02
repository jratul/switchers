"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { GameInfo, ProductInfo } from "@/constants/types";
import WishlistButton from "@/components/WishlistButton";

interface WishlistItem {
  wishlistId: string;
  dirName: "games" | "devices" | "accs";
  productInfo: GameInfo | ProductInfo;
}

export default function WishlistClient({ list }: { list: WishlistItem[] }) {
  const router = useRouter();

  const getImageSrc = (item: WishlistItem) =>
    item.dirName === "games"
      ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${item.productInfo.image}`
      : `${process.env.NEXT_PUBLIC_BUCKET_URL}/${item.dirName}/${item.productInfo.image}`;

  return (
    <div className="mx-auto max-w-6xl p-5">
      <div className="flex items-center mb-3">
        <button
          onClick={() => router.back()}
          className="inline-block mr-3 rounded-md bg-red-500 px-5 py-1 text-base font-medium text-white hover:bg-red-400"
        >
          &larr;
        </button>
        <span className="text-red-500 text-4xl font-bold">위시리스트</span>
      </div>
      {list.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {list.map((item) => (
            <div
              key={item.wishlistId}
              className="grid grid-cols-4 gap-3 items-center border-b border-gray-200 py-3"
            >
              <a
                href={`/${item.dirName}/${item.productInfo._id.toString()}`}
                className="col-span-1 relative w-full aspect-square overflow-hidden"
              >
                <Image
                  src={getImageSrc(item)}
                  alt={item.productInfo.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </a>
              <a
                href={`/${item.dirName}/${item.productInfo._id.toString()}`}
                className="col-span-2"
              >
                <div className="text-red-500 text-lg font-semibold">
                  {item.productInfo.name}
                </div>
                <div className="text-gray-500">
                  &#65510; {item.productInfo.price.toLocaleString()}
                </div>
              </a>
              <div className="col-span-1 flex justify-end">
                <WishlistButton
                  dirName={item.dirName}
                  productId={item.productInfo._id.toString()}
                  initialWishlisted={true}
                  initialWishlistId={item.wishlistId}
                  onRemoved={() => router.refresh()}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl">위시리스트가 비어 있습니다.</div>
      )}
    </div>
  );
}
