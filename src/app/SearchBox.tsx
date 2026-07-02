"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get("q") ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-40 lg:w-56">
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="상품 검색"
        className="w-full py-1.5 pl-3 pr-8 text-sm rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
      >
        <MagnifyingGlassIcon className="w-4 h-4" />
      </button>
    </form>
  );
}
