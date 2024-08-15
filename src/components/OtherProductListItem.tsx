import { ProductInfo } from "@/constants/types";
import Rating from "./Rating";

interface Props {
  productInfo: ProductInfo;
  idx: number;
}

export default function OtherProductListItem({ productInfo, idx }: Props) {
  return (
    <a key={productInfo.name} href={`game/${idx}`} className="mb-5">
      <div className="h-64 overflow-hidden rounded-lg">
        <img
          alt={productInfo.name}
          src={productInfo.image}
          className="h-full w-full object-cover object-center transition duration-100 hover:scale-105 ease-in-out "
        />
      </div>
      <div className="align-middle mt-2 text-xl font-bold text-red-500">
        {productInfo.name}
      </div>
      <div className="text-black font-semibold">
        &#65510; {productInfo.price.toLocaleString()}
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
