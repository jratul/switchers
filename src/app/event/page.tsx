import { ObjectId } from "mongodb";
import EventItem from "./EventItem";

const data = [
  {
    title: "젤다의 전설 패키지",
    content: "링크와 함께 떠나는 모험의 대장정!",
    image: "/images/carousel/zelda-promo.jpg",
    totalPrice: 135000,
    games: ["66bf758897568356f5769cd7", "66bf758897568356f5769cd8"],
    devices: [],
    accs: [],
  },
  {
    title: "레츠고 피카츄 패키지",
    content: "다들 마음 한 켠에 포켓몬 한 마리씩 갖고 있지 않으세요?",
    image: "/images/carousel/pokemon.jpg",
    totalPrice: 127000,
    games: [],
    devices: [],
    accs: [],
  },
  {
    title: "동물의 숲 패키지",
    content: "아직도 나만의 무인도가 없으신가요?",
    image: "/images/carousel/animal-crossing.jpg",
    totalPrice: 135000,
    games: [],
    devices: [],
    accs: [],
  },
];

export default function EventList() {
  return (
    <div className="my-5 mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="col-span-1 px-4">
          <p className="text-red-500 text-3xl font-bold mb-3">이벤트</p>
          <p className="text-gray-500 text-lg mb-5">
            스위쳐스만의 파격적인 혜택을
            <br />
            마음껏 누려보세요.
          </p>
        </div>
        <div className="col-span-1 lg:col-span-3 p-3">
          {data.map((item, idx) => (
            <EventItem key={idx} eventInfo={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
