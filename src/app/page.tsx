"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Divider from "@/components/Divider";
import MainProductListItem from "@/components/MainProductListItem";
import { GameInfo } from "@/constants/types";
import Carousel from "./Carousel";
import Loading from "./loading";

export default function Home() {
  const [popularList, setPopularList] = useState<GameInfo[]>([]);
  const [recentList, setRecentList] = useState<GameInfo[]>([]);

  useEffect(() => {
    fetch(`/api/popular`, { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then((popularList) => setPopularList(popularList))
      .catch(() => {});

    fetch(`/api/recent`, { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then((recentList) => setRecentList(recentList))
      .catch(() => {});
  }, []);

  return (
    <div>
      <Carousel />
      <section className="mt-5 mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">인기 순위</h2>
          <a
            href="/games"
            className="text-sm font-semibold text-red-500 hover:text-red-400"
          >
            더보기
            <span> &rarr;</span>
          </a>
        </div>
        <div className="mt-4 flow-root">
          <div className="-my-2">
            {popularList.length > 0 ? (
              <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {popularList.map((productItem) => (
                    <motion.div
                      initial={{
                        opacity: 0,
                        translateY: -10,
                      }}
                      animate={{
                        opacity: 1,
                        translateY: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      key={productItem.name}
                    >
                      <MainProductListItem gameInfo={productItem} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </section>
      <Divider />
      <section className="mt-5 mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">최근 출시</h2>
          <a
            href="/games"
            className="text-sm font-semibold text-red-500 hover:text-red-400"
          >
            더보기
            <span> &rarr;</span>
          </a>
        </div>
        <div className="mt-4 flow-root">
          <div className="-my-2">
            {recentList.length > 0 ? (
              <div className="relative box-content h-80 overflow-x-hidden py-2 xl:overflow-visible">
                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {recentList.map((productItem) => (
                    <motion.div
                      initial={{
                        opacity: 0,
                        translateY: -10,
                      }}
                      animate={{
                        opacity: 1,
                        translateY: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      key={productItem.name}
                    >
                      <MainProductListItem gameInfo={productItem} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
