import { GameInfo } from "@/constants/types";
import Rating from "./Rating";

interface Props {
  gameInfo: GameInfo;
  idx: number;
}

export default function GameProductListItem({ gameInfo, idx }: Props) {
  return (
    <a key={gameInfo.name} href={`game/${idx}`} className="mb-5">
      <div className="h-64 overflow-hidden rounded-lg">
        <img
          alt={gameInfo.name}
          src={gameInfo.image}
          className="h-full w-full object-cover object-center transition duration-100 hover:scale-105 ease-in-out "
        />
      </div>
      <div className="align-middle mt-2 text-xl font-bold text-red-500">
        {gameInfo.name}
      </div>
      <div className="text-sm text-gray-500">{gameInfo.company}</div>
      <div className="text-black font-semibold">
        &#65510; {gameInfo.price.toLocaleString()}
      </div>
      <div className="flex">
        <span className="mr-1">
          <Rating rating={4.5} />
        </span>
        <span className="align-middle text-gray-600">4.5</span>
      </div>
    </a>
  );
}
