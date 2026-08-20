import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ItemButton from '../ItemButton/ItemButton';
import {Container, Row, Col} from 'react-bootstrap';
import ItemIcon from '../ItemIcon/ItemIcon';
import Footer from '../Footer/Footer';
import { gameDataBySet } from '../../gameData';
import { useSelectedSet } from '../../setSelection';

const WhatCanYouBuild = () => {
  const { selectedSet } = useSelectedSet();
  const { baseItems, completedItems } = gameDataBySet[selectedSet];
  const getRandomBaseItem = useCallback(
    () => baseItems[Math.floor(Math.random() * baseItems.length)],
    [baseItems]
  );
  const [streak, setStreak] = useState(0);
  const [record, setRecord] = useState(0);
  const [promptItems, setPromptItems] = useState(() => [getRandomBaseItem(), getRandomBaseItem()]);
  const [answerState, setAnswerState] = useState<null | {
    correctId: number;
    isCorrect: boolean;
    selectedId: number;
  }>(null);

  const nextRound = () => {
    setAnswerState(null);
    setPromptItems([getRandomBaseItem(), getRandomBaseItem()]);
  };

  React.useEffect(() => {
    setStreak(0);
    setRecord(0);
    setAnswerState(null);
    setPromptItems([getRandomBaseItem(), getRandomBaseItem()]);
  }, [selectedSet, getRandomBaseItem]);

  const checkAnswer = (targetItem, existing, answer) => {
    if (answerState) {
      return;
    }

    const correctItem = completedItems.find((item) =>
      (item.components[0] === existing.id && item.components[1] === answer.id) ||
      (item.components[0] === answer.id && item.components[1] === existing.id)
    );

    const isCorrect =
      (targetItem.components[0] === existing.id && targetItem.components[1] === answer.id) ||
      (targetItem.components[0] === answer.id && targetItem.components[1] === existing.id);
    
    if (isCorrect) {
      setStreak((currentStreak) => {
        const nextStreak = currentStreak + 1;
        setRecord((currentRecord) => Math.max(currentRecord, nextStreak));
        return nextStreak;
      });
      nextRound();
    } else {
      setStreak(0);
      setAnswerState({
        correctId: correctItem?.id ?? targetItem.id,
        isCorrect,
        selectedId: answer.id,
      });
    }
  }

  return (
    <div className="appPage">
      <div className="pageIntro">
        <div className="pageEyebrow">Recipe Drill</div>
        <h1 className="pageTitle">Read components and name the item</h1>
        <p className="pageDescription">This round flips the mental model: look at the pair of components and identify the completed item they produce.</p>
      </div>
      <Container className="appCard">
        <div className="statsRow">
          <div className="statChip">
            <span className="statChip-label">Current streak</span>
            <span className="statChip-value">{streak}</span>
          </div>
          <div className="statChip">
            <span className="statChip-label">Record</span>
            <span className="statChip-value">{record}</span>
          </div>
        </div>
        <div className="appCard appCard--accent">
          <div className="promptPanel">
            <div className="promptPanel-section">
              <span className="promptPanel-label">Component one</span>
              <span className="promptPanel-value"><ItemIcon name={promptItems[0].name} icon={promptItems[0].icon} /> {promptItems[0].name}</span>
            </div>
            <div className="promptPanel-section">
              <span className="promptPanel-label">Component two</span>
              <span className="promptPanel-value"><ItemIcon name={promptItems[1].name} icon={promptItems[1].icon} /> {promptItems[1].name}</span>
            </div>
          </div>
        </div>
        <div className="appCard">
          {answerState && !answerState.isCorrect && (
            <div className="appCard feedbackBanner is-incorrect">
              <div className="feedbackBanner-copy">
                <h3 className="feedbackBanner-title">Not quite</h3>
                <div className="feedbackAnswer">
                  <ItemIcon
                    name={completedItems.find((item) => item.id === answerState.correctId)?.name ?? 'Correct item'}
                    icon={completedItems.find((item) => item.id === answerState.correctId)?.icon ?? ''}
                  />
                  <p className="feedbackBanner-text">
                    The correct item was {completedItems.find((item) => item.id === answerState.correctId)?.name}.
                  </p>
                </div>
              </div>
              <Button className="nextButton" onClick={nextRound}>Next</Button>
            </div>
          )}
          <h2 className="panelTitle">Which item can you build?</h2>
          <p className="panelDescription">Pick the completed item that matches the component pair above{answerState ? ', then press Next for a new prompt.' : '.'}</p>
          <Row className="choicesGrid">
            {completedItems.map((i) => {
              const answerClassName = answerState
                ? [
                    'quizAnswer',
                    answerState.correctId === i.id ? 'quizAnswer--correct' : '',
                    answerState.selectedId === i.id && !answerState.isCorrect ? 'quizAnswer--incorrect' : '',
                    answerState.correctId !== i.id && answerState.selectedId !== i.id ? 'quizAnswer--dimmed' : '',
                  ].filter(Boolean).join(' ')
                : '';

              return (
                <Col key={i.id} xs={4} sm={3} md={2} lg={1}>
                  <ItemButton
                    answer={i}
                    className={answerClassName}
                    disabled={Boolean(answerState)}
                    onClick={() => checkAnswer(i, promptItems[0], promptItems[1])}
                  />
                </Col>
              )})}
          </Row>
        </div>
      </Container>
      <div>
        <Footer page="what-can-you-build" />
      </div>
    </div>
  );
}

export default WhatCanYouBuild;
