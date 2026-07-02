const filterParamMap: Record<string, string> = {
  mario: "마리오",
  pokemon: "포켓몬",
  zelda: "젤다의 전설",
  kerby: "커비",
  animal: "동물의 숲",
};

export function filterParamToName(filterParam?: string) {
  if (!filterParam) {
    return undefined;
  }

  return filterParamMap[filterParam];
}
