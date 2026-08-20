import { Champion } from "./championData";

type ChampionGraph = Map<string, Champion[]>;

const sortChampions = (champions: Champion[]) =>
  champions.slice().sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name));

const shareTrait = (left: Champion, right: Champion) =>
  left.name !== right.name && left.tags.some((tag) => right.tags.includes(tag));

const buildChampionGraph = (champions: Champion[]): ChampionGraph => {
  const graph: ChampionGraph = new Map();

  champions.forEach((champion) => {
    graph.set(
      champion.name,
      sortChampions(champions.filter((candidate) => shareTrait(champion, candidate)))
    );
  });

  return graph;
};

const createChampionIndex = (champions: Champion[]) =>
  new Map(champions.map((champion) => [champion.name, champion]));

const getChampionConnections = (graph: ChampionGraph, championName: string) => graph.get(championName) ?? [];

const canMoveToChampion = (champion: Champion, target: Champion) =>
  champion.name === target.name || champion.tier < target.tier;

const findShortestChampionPath = (
  graph: ChampionGraph,
  champions: Champion[],
  startName: string,
  targetName: string,
  canTraverse?: (champion: Champion) => boolean
): Champion[] => {
  const championIndex = createChampionIndex(champions);

  if (startName === targetName) {
    const startChampion = championIndex.get(startName);
    return startChampion ? [startChampion] : [];
  }

  const queue: string[][] = [[startName]];
  const visited = new Set<string>([startName]);

  while (queue.length > 0) {
    const path = queue.shift();

    if (!path) {
      continue;
    }

    const currentName = path[path.length - 1];
    const neighbors = getChampionConnections(graph, currentName);

    for (const neighbor of neighbors) {
      if (canTraverse && !canTraverse(neighbor)) {
        continue;
      }

      if (visited.has(neighbor.name)) {
        continue;
      }

      const nextPath = path.concat(neighbor.name);

      if (neighbor.name === targetName) {
        return nextPath
          .map((name) => championIndex.get(name))
          .filter((champion): champion is Champion => Boolean(champion));
      }

      visited.add(neighbor.name);
      queue.push(nextPath);
    }
  }

  return [];
};

type ChampionConnectionChallenge = {
  start: Champion;
  target: Champion;
  initialChoices: Champion[];
  shortestPath: Champion[];
};

const createChampionConnectionChallenge = (
  champions: Champion[],
  random: () => number = Math.random
): ChampionConnectionChallenge | null => {
  const graph = buildChampionGraph(champions);
  const tierOneChampions = sortChampions(champions.filter((champion) => champion.tier === 1));
  const candidates = tierOneChampions
    .map((start) => {
      const initialChoices = getChampionConnections(graph, start.name);
      const connectedChampions = champions.filter((champion) => {
        if (champion.name === start.name) {
          return false;
        }

        return findShortestChampionPath(
          graph,
          champions,
          start.name,
          champion.name,
          (candidate) => canMoveToChampion(candidate, champion)
        ).length > 0;
      });
      const targetPool = connectedChampions.filter(
        (champion) => !initialChoices.some((choice) => choice.name === champion.name)
      );

      if (initialChoices.length === 0 || targetPool.length === 0) {
        return null;
      }

      const target = targetPool[Math.floor(random() * targetPool.length)];
      const shortestPathResolved = findShortestChampionPath(
        graph,
        champions,
        start.name,
        target.name,
        (candidate) => canMoveToChampion(candidate, target)
      );

      if (shortestPathResolved.length === 0) {
        return null;
      }

      return {
        start,
        target,
        initialChoices,
        shortestPath: shortestPathResolved,
      };
    })
    .filter((challenge): challenge is ChampionConnectionChallenge => Boolean(challenge));

  if (candidates.length === 0) {
    return null;
  }

  return candidates[Math.floor(random() * candidates.length)];
};

export {
  buildChampionGraph,
  createChampionConnectionChallenge,
  canMoveToChampion,
  getChampionConnections,
  findShortestChampionPath,
};
export type { ChampionGraph, ChampionConnectionChallenge };
