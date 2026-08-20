import Papa from "papaparse";
import { gameDataBySet, TFTSetId } from "./gameData";
import { set18Champions } from "./teamData";

type Tag = string;

type Champion = {
  name: string;
  tier: number;
  tags: Array<Tag>;
};

type ChampionRow = {
  name?: string;
  tier?: string;
  [key: string]: string | undefined;
};

const loadChampionsForSet = async (setId: TFTSetId): Promise<Champion[]> => {
  if (setId === "18") {
    return set18Champions;
  }

  const response = await fetch(gameDataBySet[setId].unitDataPath);
  const body = await response.text();
  const parsed = Papa.parse<ChampionRow>(body, { header: true });

  return parsed.data
    .filter((row) => row.name && row.tier)
    .map((row) => ({
      name: row.name!,
      tier: Number(row.tier),
      tags: Object.entries(row)
        .filter(([key, value]) => key !== "name" && key !== "tier" && value === "x")
        .map(([key]) => key),
    }));
};

export { loadChampionsForSet };
export type { Champion, ChampionRow, Tag };
