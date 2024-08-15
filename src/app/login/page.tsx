import Link from "next/link";

export default function Login() {
  return (
    <div className="w-6xl mx-auto h-full flex justify-center items-center">
      <div className="w-3xl mx-auto flex items-center gap-2">
        <div className="w-80">
          <img
            src="/images/animal_crossing.webp"
            alt="animal crossing"
            className="h-full w-full object-cover object-center rounded"
          />
        </div>
        <div className="w-60 flex flex-col gap-2">
          <input
            type="text"
            placeholder="이메일"
            className="px-2 py-3 border-0 rounded shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="px-2 py-3 border-0 rounded shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-500"
          />
          <Link
            className="py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
            href="#"
          >
            로그인
          </Link>
          <Link
            className="py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
            href="#"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
