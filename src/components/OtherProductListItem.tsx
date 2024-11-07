import { ProductInfo } from "@/constants/types";
import Image from "next/image";

interface Props {
  productInfo: ProductInfo;
  dirName: string;
}

export default function OtherProductListItem({ productInfo, dirName }: Props) {
  return (
    <a
      key={productInfo.name}
      href={`${dirName}/${productInfo._id.toString()}`}
      className="mb-5"
    >
      <div className="h-64 overflow-hidden rounded-lg">
        <Image
          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${dirName}/${productInfo.image}`}
          alt={productInfo.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center transition duration-100 hover:scale-105 ease-in-out "
          priority
        />
      </div>
      <div className="align-middle mt-2 text-xl font-bold text-red-500">
        {productInfo.name}
      </div>
      <div className="mt-2 text-gray-600">{productInfo.type}</div>
      <div className="text-black font-semibold">
        &#65510; {productInfo.price.toLocaleString()}
      </div>
    </a>
  );
}
