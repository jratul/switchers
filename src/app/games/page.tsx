import { GameInfo } from "@/constants/types";
import { getGamesByConditions } from "@/services/gameService";
import { filterParamToName } from "@/util/gameFilterParam";
import { serialize } from "@/util/serialize";
import GameListClient from "./GameListClient";

async function fetchInitialGameList(inputName?: string) {
  const conditions = inputName ? [{ type: inputName }] : [{}];

  try {
    return serialize(await getGamesByConditions(conditions));
  } catch (error) {
    return [] as GameInfo[];
  }
}

export default async function GameListPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const inputName = filterParamToName(searchParams.filter);
  const initialGameList = await fetchInitialGameList(inputName);
  const initialCheckState = inputName ? { [inputName]: true } : {};

  return (
    <GameListClient
      initialGameList={initialGameList}
      initialCheckState={initialCheckState}
    />
  );
}
