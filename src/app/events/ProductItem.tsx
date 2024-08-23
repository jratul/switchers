"use client";

import { useEffect, useState } from "react";
import { ProductInfo } from "@/constants/types";

interface Props {
  productId: string;
  dirName: string;
}

export default function ProductItem({ productId, dirName }: Props) {
  const [productInfo, setProductInfo] = useState<ProductInfo>();

  useEffect(() => {
    fetch(`/api/${dirName}/${productId}`)
      .then((res) => res.json())
      .then((productInfo) => setProductInfo(productInfo))
      .catch(() => {});
  }, [productId, dirName]);

  return (
    <a
      key={productInfo?.name}
      href={`/${dirName}/${productInfo?._id.toString()}`}
      className="relative h-72 max-w-48 flex flex-col overflow-hidden rounded-lg p-6 hover:opacity-75"
    >
      <span aria-hidden="true" className="absolute inset-0">
        <img
          alt=""
          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${dirName}/${productInfo?.image}`}
          className="h-full w-full object-cover object-center"
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-70"
      />
      <span className="relative mt-auto text-center text-xl font-bold text-white">
        {productInfo?.name}
      </span>
    </a>
  );
}
