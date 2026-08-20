import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../Footer/Footer";
import "./ChampionConnections.css";
import { Champion, loadChampionsForSet } from "../../championData";
import {
  buildChampionGraph,
  canMoveToChampion,
  createChampionConnectionChallenge,
  findShortestChampionPath,
  getChampionConnections,
} from "../../championGraph";
import { useSelectedSet } from "../../setSelection";

type Difficulty = "easy" | "medium" | "hard";

type ChallengeState = {
  current: Champion;
  path: Champion[];
  start: Champion;
  target: Champion;
};

const difficultyLabels: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const ChampionConnections = () => {
  const { selectedSet } = useSelectedSet();
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [challengeState, setChallengeState] = useState<ChallengeState | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const graph = useMemo(() => buildChampionGraph(champions), [champions]);

  const initializeChallenge = useCallback((availableChampions: Champion[]) => {
    const challenge = createChampionConnectionChallenge(availableChampions);

    if (!challenge) {
      setChallengeState(null);
      return;
    }

    setChallengeState({
      current: challenge.start,
      path: [challenge.start],
      start: challenge.start,
      target: challenge.target,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadChampionsForSet(selectedSet).then((loadedChampions) => {
      setChampions(loadedChampions);
      initializeChallenge(loadedChampions);
      setIsLoading(false);
    });
  }, [initializeChallenge, selectedSet]);

  const availableChoices = useMemo(() => {
    if (!challengeState) {
      return [];
    }

    return getChampionConnections(graph, challengeState.current.name).filter((champion) =>
      canMoveToChampion(champion, challengeState.target)
    );
  }, [challengeState, graph]);

  const shortestPath = useMemo(() => {
    if (!challengeState) {
      return [];
    }

    return findShortestChampionPath(
      graph,
      champions,
      challengeState.start.name,
      challengeState.target.name,
      (champion) => canMoveToChampion(champion, challengeState.target)
    );
  }, [challengeState, champions, graph]);

  const routeMoves = challengeState ? challengeState.path.slice(1) : [];
  const shortestMoves = shortestPath.slice(1);

  const isComplete = Boolean(challengeState) && challengeState.current.name === challengeState.target.name;

  const shouldShowTraits = (champion: Champion) => {
    if (difficulty === "easy") {
      return true;
    }

    if (difficulty === "medium" && challengeState) {
      return (
        champion.name === challengeState.start.name ||
        champion.name === challengeState.current.name ||
        champion.name === challengeState.target.name
      );
    }

    return false;
  };

  const handleChoice = (nextChampion: Champion) => {
    if (!challengeState || isComplete) {
      return;
    }

    setChallengeState({
      ...challengeState,
      current: nextChampion,
      path: challengeState.path.concat(nextChampion),
    });
  };

  const resetChallenge = () => {
    initializeChallenge(champions);
  };

  return (
    <div className="appPage">
      <div className="pageIntro">
        <div className="pageEyebrow">Trait Path Drill</div>
        <h1 className="pageTitle">Climb trait links from a tier 1 start to a hidden target</h1>
        <p className="pageDescription">
          Begin on a random tier 1 unit, then move through champions that share a trait with your current unit.
          When you reach the target, the trainer reveals the shortest possible route.
        </p>
      </div>
      <Container className="championConnectionsPage">
        <div className="appCard appCard--accent">
          <div className="championConnections-toolbar">
            <div className="championConnections-difficulty">
              <span className="promptPanel-label">Difficulty</span>
              <div className="championConnections-difficultyTabs" aria-label="Select difficulty">
                {(Object.keys(difficultyLabels) as Difficulty[]).map((level) => (
                  <button
                    className={`championConnections-difficultyTab${difficulty === level ? " is-active" : ""}`}
                    key={level}
                    onClick={() => setDifficulty(level)}
                    type="button"
                  >
                    {difficultyLabels[level]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="statsRow">
            <div className="statChip championConnections-unitCard">
              <span className="statChip-label">Start</span>
              <span className="statChip-value">{challengeState?.start.name ?? "Loading..."}</span>
              {challengeState?.start && shouldShowTraits(challengeState.start) && (
                <span className="championConnections-cardTraits">
                  {challengeState.start.tags.map((tag) => (
                    <span className="championConnections-cardTrait" key={tag}>
                      {tag.replace(/_/g, " ")}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <div className="statChip championConnections-unitCard">
              <span className="statChip-label">Current</span>
              <span className="statChip-value">{challengeState?.current.name ?? "Loading..."}</span>
              {challengeState?.current && shouldShowTraits(challengeState.current) && (
                <span className="championConnections-cardTraits">
                  {challengeState.current.tags.map((tag) => (
                    <span className="championConnections-cardTrait" key={tag}>
                      {tag.replace(/_/g, " ")}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <div className="statChip championConnections-unitCard">
              <span className="statChip-label">Target</span>
              <span className="statChip-value">{challengeState?.target.name ?? "Loading..."}</span>
              {challengeState?.target && shouldShowTraits(challengeState.target) && (
                <span className="championConnections-cardTraits">
                  {challengeState.target.tags.map((tag) => (
                    <span className="championConnections-cardTrait" key={tag}>
                      {tag.replace(/_/g, " ")}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <div className="statChip">
              <span className="statChip-label">Clicks</span>
              <span className="statChip-value">{challengeState ? Math.max(challengeState.path.length - 1, 0) : 0}</span>
            </div>
          </div>
          <div className="promptPanel">
            <div className="promptPanel-section">
              <span className="promptPanel-label">Current traits</span>
              <span className="promptPanel-value championConnections-tags">
                {challengeState?.current && shouldShowTraits(challengeState.current) ? (
                  challengeState.current.tags.map((tag) => (
                    <span className="championConnections-tag" key={tag}>
                      {tag.replace(/_/g, " ")}
                    </span>
                  ))
                ) : (
                  <span className="championConnections-tag championConnections-tag--hidden">Traits hidden</span>
                )}
              </span>
            </div>
            <div className="promptPanel-section championConnections-actions">
              <button className="nextButton championConnections-reset" onClick={resetChallenge} type="button">
                New puzzle
              </button>
            </div>
          </div>
        </div>

        <Row className="g-3">
          <Col lg={7}>
            <div className="appCard">
              <h2 className="panelTitle">Available moves</h2>
              <p className="panelDescription">
                Each button below shares at least one trait with {challengeState?.current.name ?? "your current unit"}.
              </p>
              {isLoading ? (
                <p className="championConnections-empty">Loading champions…</p>
              ) : availableChoices.length === 0 ? (
                <p className="championConnections-empty">No connected champions are available from this node.</p>
              ) : (
                <Row className="championSelection">
                  {availableChoices.map((champion) => (
                    <Col xs={6} md={4} key={champion.name}>
                      <button
                        className="championSelection-button championConnections-choice"
                        onClick={() => handleChoice(champion)}
                        type="button"
                      >
                        <span>{champion.name}</span>
                        <span className="championConnections-choiceMeta">Tier {champion.tier}</span>
                        {shouldShowTraits(champion) && (
                          <span className="championConnections-choiceTraits">
                            {champion.tags.map((tag) => (
                              <span className="championConnections-choiceTrait" key={tag}>
                                {tag.replace(/_/g, " ")}
                              </span>
                            ))}
                          </span>
                        )}
                      </button>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>

          <Col lg={5}>
            <div className="appCard">
              <h2 className="panelTitle">Your route</h2>
              <p className="panelDescription">The start is shown above. Every click here is one move after that start.</p>
              <div className="championConnections-path">
                {routeMoves.length === 0 && (
                  <p className="championConnections-empty">No moves yet. Pick a connected unit to start your path.</p>
                )}
                {routeMoves.map((champion, index) => (
                  <div className="championConnections-pathStep" key={`${champion.name}-${index}`}>
                    <span className="championConnections-pathName">{champion.name}</span>
                    {shouldShowTraits(champion) && (
                      <span className="championConnections-pathTags">
                        {champion.tags.map((tag) => tag.replace(/_/g, " ")).join(", ")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        {isComplete && (
          <div className="appCard feedbackBanner is-correct championConnections-success">
            <div className="feedbackBanner-copy">
              <h2 className="feedbackBanner-title">Target reached</h2>
              <p className="feedbackBanner-text">
                You made it from {challengeState.start.name} to {challengeState.target.name}. The shortest route takes {shortestMoves.length} click{shortestMoves.length === 1 ? "" : "s"} after the start:
              </p>
              <div className="championConnections-shortestPath">
                {shortestMoves.map((champion, index) => (
                  <React.Fragment key={champion.name}>
                    <span className="championConnections-shortestStep">
                      <span>{champion.name}</span>
                      {shouldShowTraits(champion) && (
                        <span className="championConnections-shortestTraits">
                          {champion.tags.map((tag) => tag.replace(/_/g, " ")).join(", ")}
                        </span>
                      )}
                    </span>
                    {index < shortestMoves.length - 1 && <span className="championConnections-arrow">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
      <div>
        <Footer page="champion-connections" />
      </div>
    </div>
  );
};

export default ChampionConnections;
