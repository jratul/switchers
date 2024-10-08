import { NavSubCategory } from "@/constants/types";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import clsx from "clsx";

interface Props {
  title: string;
  isOpen: boolean;
  subData?: NavSubCategory[];
  href?: string;
}

export default function NavMainItem({ title, isOpen, subData, href }: Props) {
  return (
    <Popover className="flex">
      <div className="flex">
        <PopoverButton
          className={clsx(
            "relative z-10 -mb-px flex items-center border-b-2 border-transparent text-sm lg:text-lg font-medium hover:font-semibold text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-red-300 data-[open]:text-red-300 w-max",
            isOpen && "text-red-500"
          )}
        >
          {href ? <Link href={href}>{title}</Link> : <>{title}</>}
        </PopoverButton>
      </div>
      {Array.isArray(subData) && (
        <PopoverPanel
          transition
          focus={true}
          className="z-20 absolute inset-x-0 top-full bg-white text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in sm:text-sm"
        >
          <div className="mx-auto w-2/5">
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 pb-5 pt-5 md:grid-cols-2 lg:gap-x-8">
              {subData.map((subItem) => (
                <div key={subItem.title}>
                  <p id="clothing-heading" className="font-medium text-red-400">
                    {subItem.title}
                  </p>
                  <div className="mt-2 border-t border-gray-200 pt-3 sm:grid sm:grid-cols-2 sm:gap-x-6">
                    <ul
                      role="list"
                      aria-labelledby="clothing-heading"
                      className="space-y-6 sm:space-y-4"
                    >
                      {subItem.subLinks.map((item) => (
                        <li key={item.name} className="flex">
                          <a href={item.href} className="hover:text-gray-800">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <CloseButton className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-10 mb-5">
                  <XMarkIcon className="h-5 w-5" />
                </CloseButton>
              </span>
            </div>
          </div>
        </PopoverPanel>
      )}
    </Popover>
  );
}
