"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

function Zelda() {
  return (
    <p className="mt-4 text-xl text-white">
      왕국의 눈물 출시 기념
      <br />
      젤다의 전설{" "}
      <span className="font-semibold text-red-300">패키지 할인</span> 이벤트
    </p>
  );
}

function Pokemon() {
  return (
    <p className="mt-4 text-xl text-white">
      포켓몬 매니아들을 위한
      <br />
      <span className="font-semibold text-red-300">레츠고 피카츄</span>가 포함된
      <br />
      알찬 구성이 준비되어 있습니다.
    </p>
  );
}

function AnimalCrossing() {
  return (
    <p className="mt-4 text-xl text-white">
      <span className="font-semibold text-red-300">귀여운 동물들</span>을 만날
      준비가 되셨나요?
      <br />
      스위치{" "}
      <span className="font-semibold text-red-300">동물의 숲 에디션</span>까지!
    </p>
  );
}

const data = [
  {
    image: "/images/carousel/zelda-promo.jpg",
    title: "젤다의 전설",
    href: "/events",
    content: <Zelda />,
  },
  {
    image: "/images/carousel/pokemon.jpg",
    title: "포켓몬",
    href: "/events",
    content: <Pokemon />,
  },
  {
    image: "/images/carousel/animal-crossing.jpg",
    title: "동물의 숲",
    href: "/events",
    content: <AnimalCrossing />,
  },
];

export default function Carousel() {
  const [idx, setIdx] = useState<number>(0);

  const handleLeft = () => {
    setIdx(idx - 1 < 0 ? data.length - 1 : idx - 1);
  };

  const handleRight = () => {
    setIdx(idx + 1 > data.length - 1 ? 0 : idx + 1);
  };

  return (
    <div className="w-screen h-[50vh] relative overflow-hidden">
      <div
        style={{ transform: `translateX(-${100 * idx}vw)` }}
        className={`w-[${
          100 * data.length
        }vw] h-full flex transition-transform ease-out duration-500`}
      >
        {data.map((item, idx) => (
          <div className="w-screen flex-shrink-0 relative" key={idx}>
            <div className="absolute inset-0 bg-gray-900 opacity-70" />
            <div className="absolute w-full h-full">
              <div className="relative mx-auto flex flex-col items-center py-[20vh] text-center">
                <h1 className="text-4xl font-bold text-red-600 lg:text-6xl">
                  {item.title}
                </h1>
                {item.content}
                <Link
                  href={item.href}
                  className="mt-8 rounded-md bg-red-500 px-8 py-3 text-base font-medium text-gray-200 hover:bg-red-400"
                >
                  보러가기
                </Link>
              </div>
            </div>
            <img
              src={item.image}
              alt={item.title}
              className="object-cover h-full md:w-screen"
            />
          </div>
        ))}
      </div>
      <ChevronLeftIcon
        className="w-20 h-20 absolute text-red-500 text-5xl font-bold left-2 top-[20vh] cursor-pointer z-10 hover:text-red-300"
        onClick={handleLeft}
      />
      <ChevronRightIcon
        className="w-20 h-20 absolute text-red-500 text-5xl font-bold right-2 top-[20vh] cursor-pointer z-10 hover:text-red-300"
        onClick={handleRight}
      />
    </div>
  );
}
