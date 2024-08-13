import { gameData } from "@/constants/data";

export default function GameDetail({ params }: { params: { slug: string } }) {
  const idx = parseInt(params.slug);

  if (!gameData?.[idx]) {
    return <>Not Found</>;
  }

  const gameInfo = gameData[idx];

  return (
    <div className="mx-auto max-w-6xl">
      <a
        href="/game"
        className="inline-block m-3 rounded-md bg-red-500 px-5 py-3 text-base font-medium text-white hover:bg-red-400"
      >
        목록으로
      </a>
      <span className="align-middle text-2xl text-red-500 font-bold">
        {gameInfo.name}
      </span>
    </div>
  );
}
