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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2"></div>
        </div>
      </div>
    </div>
  );
}
