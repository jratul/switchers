"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export default function SkeletonImage({
  src,
  alt,
  sizes,
  priority,
  className,
}: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 rounded bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={clsx(
          className,
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </>
  );
}
