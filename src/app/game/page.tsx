"use client";

import { useEffect, useState } from "react";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

import GameProductListItem from "@/components/GameProductListItem";
import { filterData } from "@/constants/data";
import { GameInfo } from "@/constants/types";

export default function GameList() {
  const [gameList, setGameList] = useState<GameInfo[]>([]);
  const [conditionList, setConditionList] = useState<any[]>([{}]);

  const [checkState, setCheckState] = useState<{ [key: string]: boolean }>({});

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckState((checkState) => {
        const newCheckState = { ...checkState };

        newCheckState[event.target.value] = true;

        return newCheckState;
      });
    } else {
      setCheckState((checkState) => {
        const newCheckState = { ...checkState };

        delete newCheckState[event.target.value];

        return newCheckState;
      });
    }
  };

  useEffect(() => {
    fetch(`/api/games`, {
      method: "POST",
      body: JSON.stringify(conditionList),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then((gameList) => {
        setGameList(gameList);
      })
      .catch((error) => {
        alert(`${error}`);
      });
  }, [conditionList]);

  useEffect(() => {
    setConditionList(() => {
      const conditionList: any[] = [];

      Object.keys(checkState).map((filterName) => {
        conditionList.push({ type: filterName });
      });

      if (conditionList.length === 0) {
        conditionList.push({});
      }

      return conditionList;
    });
  }, [checkState]);

  return (
    <div className="my-5 mx-auto max-w-6xl p-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="col-span-1">
          <p className="text-red-500 text-3xl font-bold mb-3">게임</p>
          <p className="text-gray-500 text-lg mb-5">
            다양한 닌텐도 스위치 패키지를
            <br /> 합리적인 가격에 만나 보세요.
          </p>
          <form>
            <Disclosure
              as="div"
              className="border-t border-gray-200 py-6"
              defaultOpen={true}
            >
              <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {filterData.title}
                </span>
                <span className="ml-6 flex items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className="h-5 w-5 group-data-[open]:hidden"
                  />
                  <MinusIcon
                    aria-hidden="true"
                    className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                  />
                </span>
              </DisclosureButton>

              <DisclosurePanel key={filterData.title}>
                <div className="space-y-2">
                  {filterData.items.map((item) => (
                    <div className="flex items-center ml-5" key={item}>
                      <input
                        defaultValue={item}
                        defaultChecked={false}
                        onChange={handleCheckBoxChange}
                        id={`filter-${filterData.title}-${item}`}
                        name={`${filterData.title}[]`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 accent-red-500"
                      />
                      <label
                        htmlFor={`filter-${filterData.title}-${item}`}
                        className="ml-3 text-md text-gray-600"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>
          </form>
        </div>
        <div className="col-span-1 lg:col-span-3 p-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {gameList.map((gameInfo) => (
              <GameProductListItem gameInfo={gameInfo} key={gameInfo.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
