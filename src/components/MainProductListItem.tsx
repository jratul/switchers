import { GameInfo } from "@/constants/types";

export default function MainProductListItem({
  gameInfo,
}: {
  gameInfo: GameInfo;
}) {
  return (
    <a
      key={gameInfo.name}
      href={`game/${gameInfo._id.toString()}`}
      className="relative h-72 w-48 flex flex-col overflow-hidden rounded-lg p-6 hover:opacity-75"
    >
      <span aria-hidden="true" className="absolute inset-0">
        <img
          alt=""
          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${gameInfo.image}`}
          className="h-full w-full object-cover object-center"
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-70"
      />
      <span className="relative mt-auto text-center text-xl font-bold text-white">
        {gameInfo.name}
      </span>
    </a>
  );
}
