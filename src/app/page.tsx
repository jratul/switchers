import ProductListItem from "@/components/ProductListItem";

const popularProductList = [
  {
    name: "게임1",
    genre: "",
    release: new Date(),
    price: 50000,
    company: "",
    image: "images/zelda-promo.jpg",
    desc: "",
  },
  {
    name: "게임1",
    genre: "",
    release: new Date(),
    price: 50000,
    company: "",
    image: "images/zelda-promo.jpg",
    desc: "",
  },
  {
    name: "게임1",
    genre: "",
    release: new Date(),
    price: 50000,
    company: "",
    image: "images/zelda-promo.jpg",
    desc: "",
  },
  {
    name: "게임1",
    genre: "",
    release: new Date(),
    price: 50000,
    company: "",
    image: "images/zelda-promo.jpg",
    desc: "",
  },
  {
    name: "게임1",
    genre: "",
    release: new Date(),
    price: 50000,
    company: "",
    image: "images/zelda-promo.jpg",
    desc: "",
  },
];

export default function Home() {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt="zelda promo"
            src="images/zelda-promo.jpg"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gray-900 opacity-50" />
        <div className="relative mx-auto flex flex-col items-center py-52 text-center">
          <h1 className="text-4xl font-bold text-red-600 lg:text-6xl">
            젤다의 전설
          </h1>
          <p className="mt-4 text-xl text-white">
            왕국의 눈물 출시 기념
            <br />
            젤다의 전설 패키지 할인 이벤트
          </p>
          <a
            href="#"
            className="mt-8 rounded-md bg-red-500 px-8 py-3 text-base font-medium text-gray-200 hover:bg-red-400"
          >
            구매하기
          </a>
        </div>
      </div>
      <section className="mt-5 mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">인기 순위</h2>
          <a
            href="#"
            className="text-sm font-semibold text-red-500 hover:text-red-400"
          >
            더보기
            <span> &rarr;</span>
          </a>
        </div>
        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {popularProductList.map((productItem) => (
                  <ProductListItem
                    gameInfo={productItem}
                    key={productItem.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl mb-5 border-t border-gray-300" />
      <section className="mt-5 mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">최근 출시</h2>
          <a
            href="#"
            className="text-sm font-semibold text-red-500 hover:text-red-400"
          >
            더보기
            <span> &rarr;</span>
          </a>
        </div>
        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-hidden py-2 xl:overflow-visible">
              <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {popularProductList.map((productItem) => (
                  <ProductListItem
                    gameInfo={productItem}
                    key={productItem.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
