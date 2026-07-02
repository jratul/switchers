import Image from "next/image";
import { ProductInfo } from "@/constants/types";
import { ProductDirName } from "@/services/productService";

interface Props {
  productInfo: ProductInfo;
  dirName: ProductDirName;
}

export default function ProductItem({ productInfo, dirName }: Props) {
  return (
    <a
      href={`/${dirName}/${productInfo._id.toString()}`}
      className="relative h-72 max-w-48 flex flex-col overflow-hidden rounded-lg p-6 hover:opacity-75"
    >
      <span aria-hidden="true" className="absolute inset-0">
        <Image
          alt={productInfo.name}
          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${dirName}/${productInfo.image}`}
          fill
          sizes="192px"
          className="object-cover object-center"
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-70"
      />
      <span className="relative mt-auto text-center text-xl font-bold text-white">
        {productInfo.name}
      </span>
    </a>
  );
}
