"use client";

import Divider from "@/components/Divider";
import { EventInfo } from "@/constants/types";
import GameItem from "./GameItem";
import ProductItem from "./ProductItem";
import Skeleton from "@/components/Skeleton";

export default function EventItem({ eventInfo }: { eventInfo: EventInfo }) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-3">
        <div className="col-span-1">
          <div className="h-48 overflow-hidden">
            {eventInfo.image ? (
              <img src={eventInfo.image} alt={eventInfo.title} />
            ) : (
              <Skeleton />
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
          <a
            className="px-3 py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
            href="#"
          >
            장바구니에 넣기
          </a>
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
