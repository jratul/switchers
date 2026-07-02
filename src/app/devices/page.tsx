import { ProductInfo } from "@/constants/types";
import { getProductList } from "@/services/productService";
import { serialize } from "@/util/serialize";
import ProductListGrid from "@/components/ProductListGrid";

export const revalidate = 60;

async function fetchDeviceList() {
  try {
    return { list: serialize(await getProductList("devices")), error: false };
  } catch (error) {
    return { list: [] as ProductInfo[], error: true };
  }
}

export default async function DeviceList() {
  const { list, error } = await fetchDeviceList();

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
          <ProductListGrid
            list={list}
            dirName="devices"
            error={error}
            errorMessage="본체 목록을 불러오지 못했습니다."
          />
        </div>
      </div>
    </div>
  );
}
