import { ProductInfo } from "@/constants/types";
import { getProductList } from "@/services/productService";
import { serialize } from "@/util/serialize";
import ProductListGrid from "@/components/ProductListGrid";

export const revalidate = 60;

async function fetchAccList() {
  try {
    return { list: serialize(await getProductList("accs")), error: false };
  } catch (error) {
    return { list: [] as ProductInfo[], error: true };
  }
}

export default async function AccList() {
  const { list, error } = await fetchAccList();

  return (
    <div className="my-5 mx-auto max-w-6xl">
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
          <ProductListGrid
            list={list}
            dirName="accs"
            error={error}
            errorMessage="액세서리 목록을 불러오지 못했습니다."
          />
        </div>
      </div>
    </div>
  );
}
