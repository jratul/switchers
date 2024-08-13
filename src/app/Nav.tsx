import NavMainItem from "@/components/NavMainItem";
import { PopoverGroup } from "@headlessui/react";

const subCategoryData = [
  [
    {
      title: "시리즈",
      subLinks: [
        { name: "전체", href: "/game" },
        { name: "마리오", href: "/game" },
        { name: "포켓몬", href: "/game" },
        { name: "젤다의 전설", href: "/game" },
        { name: "커비", href: "/game" },
        { name: "동물의 숲", href: "/game" },
      ],
    },
    {
      title: "출시 년도",
      subLinks: [
        { name: "2024", href: "/game" },
        { name: "2023", href: "/game" },
        { name: "2022", href: "/game" },
        { name: "2021", href: "/game" },
        { name: "2020", href: "/game" },
      ],
    },
  ],
  [
    {
      title: "카테고리",
      subLinks: [
        { name: "조이콘", href: "#" },
        { name: "케이스", href: "#" },
        { name: "충전기", href: "#" },
      ],
    },
  ],
];

export default function Nav() {
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
                  <NavMainItem title="게임" subData={subCategoryData[0]} />
                  <NavMainItem title="본체" />
                  <NavMainItem title="액세서리" subData={subCategoryData[1]} />
                  <NavMainItem title="이벤트" />
                </div>
              </PopoverGroup>
              <div className="flex flex-1 items-center justify-end">
                <div>검색</div>
                <div className="ml-4">로그인</div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
