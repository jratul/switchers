"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex mx-auto w-6xl h-full justify-center items-center flex-col tracking-tighter">
      <div className="w-64 h-64">
        <Image
          src="/images/ymw.webp"
          alt="luxio"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex items-center">
        <span className="text-5xl text-red-500 font-bold mr-3">500 |</span>
        <span className="text-2xl">문제가 발생했습니다.</span>
      </div>
      <Link
        href="/"
        className="text-red-400 text-2xl hover:underline hover:underline-offset-4"
      >
        홈으로
      </Link>
    </div>
  );
}
