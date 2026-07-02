"use client";

import { motion } from "framer-motion";
import MainProductListItem from "@/components/MainProductListItem";
import { GameInfo } from "@/constants/types";

export default function HomeProductRow({ list }: { list: GameInfo[] }) {
  return (
    <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
      <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
        {list.map((productItem) => (
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
  );
}
