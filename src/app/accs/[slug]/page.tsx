"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/app/loading";
import { ProductInfo } from "@/constants/types";

export default function AccDetail({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [accInfo, setAccInfo] = useState<ProductInfo>();

  useEffect(() => {
    if (!params.slug) {
      notFound();
    }

    fetch(`/api/accs/${params.slug}`)
      .then((res) => {
        if (!res.ok) {
          notFound();
        }
        return res.json();
      })
      .then((accInfo) => {
        setAccInfo(accInfo);
      })
      .catch(() => {
        notFound();
      });
  }, [params.slug]);

  return (
    <div className="mx-auto max-w-6xl p-5">
      <Link
        href="#"
        onClick={() => router.back()}
        className="inline-block m-3 rounded-md bg-red-500 px-5 py-1 text-base font-medium text-white hover:bg-red-400"
      >
        &larr;
      </Link>
      {!accInfo ? (
        <Loading />
      ) : (
        <>
          <span className="align-middle text-4xl text-red-500 font-bold">
            {accInfo?.name}
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="col-span-1">
              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/accs/${accInfo?.image}`}
                />
              </div>
            </div>
            <div className="flex flex-col flex-initial col-span-1 gap-2">
              <span className="text-lg">
                &#65510; {accInfo?.price?.toLocaleString()}
              </span>
              <div>
                <div className="text-xl text-red-500 font-semibold">종류</div>
                <div>{accInfo?.type}</div>
              </div>
              <p className="text-gray-500">{accInfo?.desc}</p>
              <Link
                className="py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
                href="#"
              >
                장바구니에 넣기
              </Link>
              <Link
                className="py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
                href="#"
              >
                구매하기
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
