import { baseItems as set17BaseItems, completedItems as set17CompletedItems, Component, CompletedItem } from "./data";
import { set18BaseItems, set18CompletedItems } from "./set18Data";

type TFTSetId = "17" | "18";

type GameData = {
  baseItems: Array<Component>;
  completedItems: Array<CompletedItem>;
  label: string;
  unitDataPath: string;
};

const DEFAULT_SET: TFTSetId = "18";

const gameDataBySet: Record<TFTSetId, GameData> = {
  "17": {
    baseItems: set17BaseItems,
    completedItems: set17CompletedItems,
    label: "Set 17",
    unitDataPath: "./tft_unit_data.csv",
  },
  "18": {
    baseItems: set18BaseItems,
    completedItems: set18CompletedItems,
    label: "Set 18",
    unitDataPath: "./tft_unit_data_set18.csv",
  },
};

const isSupportedSet = (value: string | null): value is TFTSetId => value === "17" || value === "18";

const normalizeSetId = (value: string | null | undefined): TFTSetId => {
  if (value === "17" || value === "18") {
    return value;
  }

  return DEFAULT_SET;
};

export { DEFAULT_SET, gameDataBySet, isSupportedSet, normalizeSetId };
export type { GameData, TFTSetId, Component, CompletedItem };
