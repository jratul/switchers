"use client";

import { useEffect, useState } from "react";
import { GameInfo } from "@/constants/types";
import Spinner from "@/components/Spinner";

export default function GameItem({ gameId }: { gameId: string }) {
  const [gameInfo, setGameInfo] = useState<GameInfo>();

  useEffect(() => {
    fetch(`/api/games/${gameId}`)
      .then((res) => res.json())
      .then((gameInfo) => setGameInfo(gameInfo))
      .catch(() => {});
  }, [gameId]);

  return (
    <a
      key={gameInfo?.name}
      href={`/games/${gameInfo?._id.toString()}`}
      className="relative h-72 max-w-48 flex flex-col overflow-hidden rounded-lg p-6 hover:opacity-75"
    >
      {gameInfo?.image ? (
        <>
          <span aria-hidden="true" className="absolute inset-0">
            <img
              alt={gameInfo?.name}
              src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${gameInfo?.image}`}
              className="h-full w-full object-cover object-center"
            />
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-70"
          />
        </>
      ) : (
        <Spinner size={32} />
      )}
      <span className="relative mt-auto text-center text-xl font-bold text-white">
        {gameInfo?.name}
      </span>
    </a>
  );
}
