import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/util/authOptions";
import { getGameById, getRelatedGames } from "@/services/gameService";
import { getReviewsByGameId } from "@/services/reviewService";
import { getWishlistEntry } from "@/services/wishlistService";
import { serialize } from "@/util/serialize";
import GameDetailClient from "./GameDetailClient";

export default async function GameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const gameInfo = await getGameById(params.slug);

  if (!gameInfo) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  const [{ reviewList, reviewStat }, relatedGames, wishlistEntry] =
    await Promise.all([
      getReviewsByGameId(params.slug),
      getRelatedGames(gameInfo.type, params.slug),
      session?.user?.email
        ? getWishlistEntry(session.user.email, "games", params.slug)
        : Promise.resolve(null),
    ]);

  return (
    <GameDetailClient
      gameInfo={serialize(gameInfo)}
      reviewList={serialize(reviewList)}
      reviewStat={reviewStat}
      relatedGames={serialize(relatedGames)}
      initialWishlisted={!!wishlistEntry}
      initialWishlistId={wishlistEntry ? wishlistEntry._id.toString() : null}
    />
  );
}
