"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PopoverGroup } from "@headlessui/react";
import NavMainItem from "@/components/NavMainItem";
import { signOut, useSession } from "next-auth/react";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { authenticated } from "@/constants/data";
import { useEffect, useState } from "react";
import useCartCountStore from "@/hooks/useCartCountStore";

const subCategoryData = [
  [
    {
      title: "시리즈",
      subLinks: [
        { name: "전체", href: "/games" },
        { name: "마리오", href: "/games?filter=mario" },
        { name: "포켓몬", href: "/games?filter=pokemon" },
        { name: "젤다의 전설", href: "/games?filter=zelda" },
        { name: "커비", href: "/games?filter=kerby" },
        { name: "동물의 숲", href: "/games?filter=animal" },
      ],
    },
  ],
];

export default function Nav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const cartCount = useCartCountStore((state) => state.cartCount);
  const updateCartCount = useCartCountStore((state) => state.updateCartCount);

  useEffect(() => {
    if (!session?.user?.email) {
      return;
    }

    fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ userEmail: session?.user?.email }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((cartList) => {
        updateCartCount(cartList.length);
      });
  }, [session?.user?.email]);

  return (
    <div>
      <header className="relative">
        <nav className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
            <div className="flex h-16 items-center justify-between">
              <a
                className="flex flex-1 font-aldrich text-red-500 font-bold text-2xl"
                href="/"
              >
                Switchers
              </a>
              <PopoverGroup className="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
                <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
                  <NavMainItem
                    title="게임"
                    subData={subCategoryData[0]}
                    isOpen={pathname.startsWith("/games")}
                  />
                  <NavMainItem
                    title="본체"
                    href="/devices"
                    isOpen={pathname.startsWith("/devices")}
                  />
                  <NavMainItem
                    title="액세서리"
                    href="/accs"
                    isOpen={pathname.startsWith("/accs")}
                  />
                  <NavMainItem
                    title="이벤트"
                    href="/events"
                    isOpen={pathname.startsWith("/events")}
                  />
                </div>
              </PopoverGroup>
              <div className="flex flex-1 items-center justify-end">
                {status === authenticated && session ? (
                  <>
                    <span className="text-gray-500">
                      {session?.user?.email ?? ""}
                    </span>
                    <Link
                      className="ml-4 cursor-pointer hover:font-semibold relative"
                      href="/cart"
                    >
                      {cartCount > 0 && (
                        <span className="w-4 h-4 text-center absolute right-0 top-0 bg-red-500 text-white text-xs rounded-full">
                          {cartCount}
                        </span>
                      )}
                      <ShoppingCartIcon className="w-8 h-8" />
                    </Link>
                    <Link
                      className="ml-4 cursor-pointer hover:font-semibold"
                      href="#"
                      onClick={() => signOut()}
                    >
                      로그아웃
                    </Link>
                  </>
                ) : status === "loading" ? null : (
                  <Link
                    className="w-max ml-4 cursor-pointer hover:font-semibold"
                    href="/login"
                  >
                    로그인
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
