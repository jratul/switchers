import Divider from "@/components/Divider";
import { GameInfo } from "@/constants/types";
import { getPopularGames, getRecentGames } from "@/services/gameService";
import { serialize } from "@/util/serialize";
import Carousel from "./Carousel";
import HomeProductRow from "./HomeProductRow";
import Loading from "./loading";

export const revalidate = 60;

async function fetchHomeLists() {
  try {
    const [popularList, recentList] = await Promise.all([
      getPopularGames(),
      getRecentGames(),
    ]);

    return { popularList: serialize(popularList), recentList: serialize(recentList) };
  } catch (error) {
    return { popularList: [] as GameInfo[], recentList: [] as GameInfo[] };
  }
}

export default async function Home() {
  const { popularList, recentList } = await fetchHomeLists();

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
              <HomeProductRow list={popularList} />
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
              <HomeProductRow list={recentList} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
