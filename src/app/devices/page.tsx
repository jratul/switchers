"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OtherProductListItem from "@/components/OtherProductListItem";
import { ProductInfo } from "@/constants/types";
import BaseDialog from "@/components/BaseDialog";
import Loading from "../loading";

export default function DeviceList() {
  const [deviceList, setDeviceList] = useState<ProductInfo[]>([]);
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/devices`, { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then((gameList) => {
        setDeviceList(gameList);
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
        content={["본체 목록을 불러오지 못했습니다.", "잠시 후 다시 시도해주세요."]}
        buttonText="확인"
        handleYes={() => {}}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="col-span-1 px-4">
          <p className="text-red-500 text-3xl font-bold mb-3">
            닌텐도 스위치 본체
          </p>
          <p className="text-gray-500 text-lg mb-5">
            스위쳐스는 정품 닌텐도 스위치
            <br />
            기기만을 취급합니다.
          </p>
        </div>
        <div className="col-span-1 lg:col-span-3 p-3">
          {deviceList.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {deviceList.map((deviceInfo) => (
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
                  key={deviceInfo.name}
                >
                  <OtherProductListItem
                    productInfo={deviceInfo}
                    dirName="devices"
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
