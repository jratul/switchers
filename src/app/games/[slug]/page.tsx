import { notFound } from "next/navigation";
import { getGameById } from "@/services/gameService";
import { getReviewsByGameId } from "@/services/reviewService";
import { serialize } from "@/util/serialize";
import GameDetailClient from "./GameDetailClient";

export default async function GameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [gameInfo, { reviewList, reviewStat }] = await Promise.all([
    getGameById(params.slug),
    getReviewsByGameId(params.slug),
  ]);

  if (!gameInfo) {
    notFound();
  }

  return (
    <GameDetailClient
      gameInfo={serialize(gameInfo)}
      reviewList={serialize(reviewList)}
      reviewStat={reviewStat}
    />
  );
}
