"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { gameData } from "@/constants/data";
import NotFound from "@/app/not-found";

export default function GameDetail({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const idx = parseInt(params.slug);

  if (!gameData?.[idx]) {
    return <NotFound />;
  }

  const gameInfo = gameData[idx];

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="#"
        onClick={() => router.back()}
        className="inline-block m-3 rounded-md bg-red-500 px-5 py-3 text-base font-medium text-white hover:bg-red-400"
      >
        &larr;
      </Link>
      <span className="align-middle text-2xl text-red-500 font-bold">
        {gameInfo.name}
      </span>
    </div>
  );
}
