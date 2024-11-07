import { GameInfo } from "@/constants/types";
import Rating from "./Rating";
import Image from "next/image";

interface Props {
  gameInfo: GameInfo;
}

export default function GameProductListItem({ gameInfo }: Props) {
  return (
    <a
      key={gameInfo.name}
      href={`games/${gameInfo._id.toString()}`}
      className="mb-5"
    >
      <div className="h-64 overflow-hidden rounded-lg">
        <Image
          alt={gameInfo.name}
          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${gameInfo.image}`}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center transition duration-100 hover:scale-105 ease-in-out "
          priority
        />
      </div>
      <div className="align-middle mt-2 text-xl font-bold text-red-500">
        {gameInfo.name}
      </div>
      <div className="text-sm text-gray-500">{gameInfo.company}</div>
      <div className="text-black font-semibold">
        &#65510; {gameInfo.price.toLocaleString()}
      </div>
      <div className="flex items-center">
        <span className="mr-1">
          <Rating rating={gameInfo.score} />
        </span>
        <span className="text-gray-600">
          {gameInfo.score ? gameInfo.score : 0}
        </span>
      </div>
    </a>
  );
}
