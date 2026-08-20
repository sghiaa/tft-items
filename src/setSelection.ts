import { useSearchParams } from "react-router-dom";
import { DEFAULT_SET, normalizeSetId } from "./gameData";

const createSetPath = (path: string, setId: string) => {
  if (setId === DEFAULT_SET) {
    return path;
  }

  return `${path}?set=${setId}`;
};

const useSelectedSet = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSet = normalizeSetId(searchParams.get("set"));

  const updateSet = (nextSet: "17" | "18") => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextSet === DEFAULT_SET) {
      nextSearchParams.delete("set");
    } else {
      nextSearchParams.set("set", nextSet);
    }

    setSearchParams(nextSearchParams, { replace: true });
  };

  return {
    selectedSet,
    updateSet,
  };
};

export { createSetPath, useSelectedSet };
