import { Champion } from "./championData";
import {
  buildChampionGraph,
  canMoveToChampion,
  createChampionConnectionChallenge,
  findShortestChampionPath,
  getChampionConnections,
} from "./championGraph";

const champions: Champion[] = [
  { name: "Alpha", tier: 1, tags: ["a"] },
  { name: "Bravo", tier: 2, tags: ["a", "b"] },
  { name: "Charlie", tier: 2, tags: ["b", "c"] },
  { name: "Delta", tier: 3, tags: ["c"] },
  { name: "Echo", tier: 1, tags: ["z"] },
];

test("buildChampionGraph links units that share a trait", () => {
  const graph = buildChampionGraph(champions);

  expect(getChampionConnections(graph, "Alpha").map((champion) => champion.name)).toEqual(["Bravo"]);
  expect(getChampionConnections(graph, "Bravo").map((champion) => champion.name)).toEqual(["Alpha", "Charlie"]);
  expect(getChampionConnections(graph, "Echo")).toEqual([]);
});

test("findShortestChampionPath returns the shortest trait chain", () => {
  const graph = buildChampionGraph(champions);

  expect(
    findShortestChampionPath(graph, champions, "Alpha", "Delta").map((champion) => champion.name)
  ).toEqual(["Alpha", "Bravo", "Charlie", "Delta"]);
});

test("findShortestChampionPath respects the target tier movement cap", () => {
  const graph = buildChampionGraph(champions);
  const target = champions.find((champion) => champion.name === "Delta");

  expect(target).toBeDefined();
  expect(
    findShortestChampionPath(
      graph,
      champions,
      "Alpha",
      "Delta",
      (champion) => canMoveToChampion(champion, target!)
    ).map((champion) => champion.name)
  ).toEqual(["Alpha", "Bravo", "Charlie", "Delta"]);

  expect(
    findShortestChampionPath(
      graph,
      champions,
      "Alpha",
      "Charlie",
      (champion) => canMoveToChampion(champion, champions.find((unit) => unit.name === "Charlie")!)
    )
  ).toEqual([]);
});

test("createChampionConnectionChallenge starts on a tier 1 unit and picks a target outside the first choices", () => {
  const challenge = createChampionConnectionChallenge(champions, () => 0);

  expect(challenge).not.toBeNull();
  expect(challenge?.start.tier).toBe(1);
  expect(challenge?.initialChoices.map((champion) => champion.name)).toContain("Bravo");
  expect(challenge?.initialChoices.map((champion) => champion.name)).not.toContain(challenge?.target.name);
  expect(challenge?.shortestPath[0].name).toBe(challenge?.start.name);
  expect(challenge?.shortestPath[challenge.shortestPath.length - 1].name).toBe(challenge?.target.name);
});
