import GameProductListItem from "@/components/GameProductListItem";
import OtherProductListItem from "@/components/OtherProductListItem";
import { searchProducts } from "@/services/searchService";
import { serialize } from "@/util/serialize";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim() ?? "";

  const { games, devices, accs } = query
    ? serialize(await searchProducts(query))
    : { games: [], devices: [], accs: [] };

  const totalCount = games.length + devices.length + accs.length;

  return (
    <div className="my-5 mx-auto max-w-6xl p-5">
      <p className="text-red-500 text-3xl font-bold mb-3">검색 결과</p>
      <p className="text-gray-500 text-lg mb-5">
        {query ? `"${query}"에 대한 검색 결과 ${totalCount}건` : "검색어를 입력해주세요."}
      </p>

      {query && totalCount === 0 && (
        <div className="text-center text-gray-500 p-10">
          검색 결과가 없습니다.
        </div>
      )}

      {games.length > 0 && (
        <section className="mb-8">
          <p className="text-xl text-red-400 font-semibold mb-3">게임</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {games.map((gameInfo) => (
              <GameProductListItem gameInfo={gameInfo} key={gameInfo._id.toString()} />
            ))}
          </div>
        </section>
      )}

      {devices.length > 0 && (
        <section className="mb-8">
          <p className="text-xl text-red-400 font-semibold mb-3">본체</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {devices.map((deviceInfo) => (
              <OtherProductListItem
                productInfo={deviceInfo}
                dirName="devices"
                key={deviceInfo._id.toString()}
              />
            ))}
          </div>
        </section>
      )}

      {accs.length > 0 && (
        <section className="mb-8">
          <p className="text-xl text-red-400 font-semibold mb-3">액세서리</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {accs.map((accInfo) => (
              <OtherProductListItem
                productInfo={accInfo}
                dirName="accs"
                key={accInfo._id.toString()}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
