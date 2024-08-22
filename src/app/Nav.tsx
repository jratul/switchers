"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PopoverGroup } from "@headlessui/react";
import NavMainItem from "@/components/NavMainItem";
import { signOut, useSession } from "next-auth/react";

const subCategoryData = [
  [
    {
      title: "시리즈",
      subLinks: [
        { name: "전체", href: "/game" },
        { name: "마리오", href: "/game?filter=mario" },
        { name: "포켓몬", href: "/game?filter=pokemon" },
        { name: "젤다의 전설", href: "/game?filter=zelda" },
        { name: "커비", href: "/game?filter=kerby" },
        { name: "동물의 숲", href: "/game?filter=animal" },
      ],
    },
  ],
  [
    {
      title: "카테고리",
      subLinks: [
        { name: "전체", href: "/acc" },
        { name: "조이콘", href: "/acc" },
        { name: "케이스", href: "/acc" },
        { name: "충전기", href: "/acc" },
      ],
    },
  ],
];

export default function Nav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

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
                    isOpen={pathname.startsWith("/game")}
                  />
                  <NavMainItem
                    title="본체"
                    href="/device"
                    isOpen={pathname.startsWith("/device")}
                  />
                  <NavMainItem
                    title="액세서리"
                    subData={subCategoryData[1]}
                    isOpen={pathname.startsWith("/acc")}
                  />
                  <NavMainItem
                    title="이벤트"
                    href="/event"
                    isOpen={pathname.startsWith("/event")}
                  />
                </div>
              </PopoverGroup>
              <div className="flex flex-1 items-center justify-end">
                {status === "authenticated" && session ? (
                  <>
                    <span className="text-gray-500">
                      {session?.user?.email ?? ""}
                    </span>
                    <Link
                      className="ml-4 cursor-pointer hover:font-semibold"
                      href="#"
                      onClick={() => signOut()}
                    >
                      로그아웃
                    </Link>
                  </>
                ) : (
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
