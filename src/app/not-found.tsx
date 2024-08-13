import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex mx-auto w-6xl h-[48rem] justify-center items-center flex-col tracking-tighter">
      <div className="w-64 h-64">
        <img
          src="/images/luxio.webp"
          alt="luxio"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex items-center">
        <span className="text-5xl text-red-500 font-bold mr-3">404 |</span>
        <span className="text-2xl">페이지를 찾을 수 없습니다.</span>
      </div>
      <Link
        href="/"
        className="text-red-400 text-2xl hover:underline hover:underline-offset-4"
      >
        홈으로
      </Link>
    </div>
  );
}
