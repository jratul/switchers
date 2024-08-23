"use client";

import { useEffect, useState } from "react";
import OtherProductListItem from "@/components/OtherProductListItem";
import { ProductInfo } from "@/constants/types";
import Loading from "../loading";

export default function DeviceList() {
  const [deviceList, setDeviceList] = useState<ProductInfo[]>([]);

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
      .catch((error) => {
        alert(`${error}`);
      });
  }, []);

  return (
    <div className="my-5 mx-auto max-w-6xl">
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
                <OtherProductListItem
                  key={deviceInfo.name}
                  productInfo={deviceInfo}
                  dirName="devices"
                />
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
