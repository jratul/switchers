import OtherProductListItem from "@/components/OtherProductListItem";
import { deviceList } from "@/constants/data";

export default function DeviceList() {
  return (
    <div className="my-5 mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="col-span-1">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {deviceList.map((deviceInfo, idx) => (
              <OtherProductListItem
                productInfo={deviceInfo}
                idx={idx}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
