"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import OtherProductListItem from "@/components/OtherProductListItem";
import BaseDialog from "@/components/BaseDialog";
import { ProductInfo } from "@/constants/types";
import { ProductDirName } from "@/services/productService";
import { sortByKey, sortOptions, SortKey } from "@/util/sortProducts";

interface Props {
  list: ProductInfo[];
  dirName: ProductDirName;
  error: boolean;
  errorMessage: string;
}

export default function ProductListGrid({
  list,
  dirName,
  error,
  errorMessage,
}: Props) {
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(error);
  const [sortKey, setSortKey] = useState<SortKey>("default");

  const sortedList = sortByKey(list, sortKey);

  return (
    <>
      <BaseDialog
        open={errorDialogOpen}
        setOpen={setErrorDialogOpen}
        title="오류 발생"
        content={[errorMessage, "잠시 후 다시 시도해주세요."]}
        buttonText="확인"
        handleYes={() => {}}
      />
      <div className="flex justify-end mb-2">
        <select
          value={sortKey}
          onChange={(event) => setSortKey(event.target.value as SortKey)}
          className="rounded border-gray-300 text-sm text-gray-600 focus:border-red-400 focus:ring-red-400"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {sortedList.map((productInfo) => (
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
            key={productInfo.name}
          >
            <OtherProductListItem productInfo={productInfo} dirName={dirName} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
