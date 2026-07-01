"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OtherProductListItem from "@/components/OtherProductListItem";
import { ProductInfo } from "@/constants/types";
import BaseDialog from "@/components/BaseDialog";
import Loading from "../loading";

export default function AccList() {
  const [accList, setAccList] = useState<ProductInfo[]>([]);
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/accs`, { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then((gameList) => {
        setAccList(gameList);
      })
      .catch(() => {
        setErrorDialogOpen(true);
      });
  }, []);
  return (
    <div className="my-5 mx-auto max-w-6xl">
      <BaseDialog
        open={errorDialogOpen}
        setOpen={setErrorDialogOpen}
        title="오류 발생"
        content={["액세서리 목록을 불러오지 못했습니다.", "잠시 후 다시 시도해주세요."]}
        buttonText="확인"
        handleYes={() => {}}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="col-span-1 px-4">
          <p className="text-red-500 text-3xl font-bold mb-3">액세서리</p>
          <p className="text-gray-500 text-lg mb-5">
            편리한 닌텐도 스위치 라이프
            <br />
            스케쳐스와 함께 하세요.
          </p>
        </div>
        <div className="col-span-1 lg:col-span-3 p-3">
          {accList.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {accList.map((accInfo) => (
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
                  key={accInfo.name}
                >
                  <OtherProductListItem
                    key={accInfo.name}
                    productInfo={accInfo}
                    dirName="accs"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
