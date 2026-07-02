"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import useWishlistCountStore from "@/hooks/useWishlistCountStore";

interface Props {
  dirName: "games" | "devices" | "accs";
  productId: string;
  initialWishlisted: boolean;
  initialWishlistId: string | null;
  onRemoved?: () => void;
}

export default function WishlistButton({
  dirName,
  productId,
  initialWishlisted,
  initialWishlistId,
  onRemoved,
}: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [wishlisted, setWishlisted] = useState<boolean>(initialWishlisted);
  const [wishlistId, setWishlistId] = useState<string | null>(
    initialWishlistId
  );
  const [loading, setLoading] = useState<boolean>(false);

  const wishlistCount = useWishlistCountStore((state) => state.wishlistCount);
  const updateWishlistCount = useWishlistCountStore(
    (state) => state.updateWishlistCount
  );

  const handleToggle = () => {
    if (!session?.user?.email) {
      router.push("/login");
      return;
    }

    setLoading(true);

    if (!wishlisted) {
      fetch("/api/wishlist/add", {
        method: "POST",
        body: JSON.stringify({ dirName, productId }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }

          return res.json();
        })
        .then((data) => {
          setWishlisted(true);
          setWishlistId(data.wishlistId);
          updateWishlistCount(wishlistCount + 1);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      if (!wishlistId) {
        setLoading(false);
        return;
      }

      fetch("/api/wishlist", {
        method: "DELETE",
        body: JSON.stringify({ wishlistId }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }

          setWishlisted(false);
          setWishlistId(null);
          updateWishlistCount(Math.max(0, wishlistCount - 1));
          onRemoved?.();
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      aria-label={wishlisted ? "위시리스트에서 제거" : "위시리스트에 추가"}
      className="inline-flex items-center justify-center w-10 h-10 rounded border border-red-300 hover:bg-red-50 disabled:opacity-50"
    >
      {wishlisted ? (
        <HeartIconSolid className="w-6 h-6 text-red-500" />
      ) : (
        <HeartIconOutline className="w-6 h-6 text-red-500" />
      )}
    </button>
  );
}
