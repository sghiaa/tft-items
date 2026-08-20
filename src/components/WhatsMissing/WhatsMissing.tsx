import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ItemButton from '../ItemButton/ItemButton';
import { Container, Row, Col } from 'react-bootstrap';
import ItemIcon from '../ItemIcon/ItemIcon';
import styles from './WhatsMissing.module.css';
import Footer from '../Footer/Footer';
import { gameDataBySet } from '../../gameData';
import { useSelectedSet } from '../../setSelection';

  const WhatsMissing = () => {
  const { selectedSet } = useSelectedSet();
  const { baseItems, completedItems } = gameDataBySet[selectedSet];
  const getRandomPrompt = useCallback(() => {
    const itemIndex = Math.floor(Math.random() * completedItems.length);
    const componentIndex = Math.floor(Math.random() * 2);

    return {
      item: completedItems[itemIndex],
      existingComponent: baseItems[completedItems[itemIndex].components[componentIndex]],
    };
  }, [baseItems, completedItems]);
  const [streak, setStreak] = useState(0);
  const [record, setRecord] = useState(0);
  const [prompt, setPrompt] = useState(getRandomPrompt);
  const [answerState, setAnswerState] = useState<null | {
    correctId: number;
    isCorrect: boolean;
    selectedId: number;
  }>(null);

  const checkAnswer = (targetItem, existing, answer) => {
    if (answerState) {
      return;
    }

    const isCorrect =
      (targetItem.components[0] === existing.id && targetItem.components[1] === answer.id) ||
      (targetItem.components[0] === answer.id && targetItem.components[1] === existing.id);

    const correctId = targetItem.components.find((componentId) => componentId !== existing.id) ?? existing.id;

    if (isCorrect) {
      setStreak((currentStreak) => {
        const nextStreak = currentStreak + 1;
        setRecord((currentRecord) => Math.max(currentRecord, nextStreak));
        return nextStreak;
      });
      setPrompt(getRandomPrompt());
    } else {
      setStreak(0);
      setAnswerState({
        correctId,
        isCorrect,
        selectedId: answer.id,
      });
    }
  };

  const nextPrompt = () => {
    setAnswerState(null);
    setPrompt(getRandomPrompt());
  };

  React.useEffect(() => {
    setStreak(0);
    setRecord(0);
    setAnswerState(null);
    setPrompt(getRandomPrompt());
  }, [selectedSet, getRandomPrompt]);

  return (
    <div className="appPage">
      <div className="pageIntro">
        <div className="pageEyebrow">Recognition Drill</div>
        <h1 className="pageTitle">Spot the missing component</h1>
        <p className="pageDescription">You know the item you want and one component you already have. Pick the missing piece as fast as you can and build a streak.</p>
      </div>

      <Container className={styles.pageCard}>
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

        <div className={styles.promptCard}>
          <div className="promptPanel">
            <div className="promptPanel-section">
              <span className="promptPanel-label">Target item</span>
              <span className="promptPanel-value">{prompt.item.name} <ItemIcon name={prompt.item.name} icon={prompt.item.icon} /></span>
            </div>
            <div className="promptPanel-section">
              <span className="promptPanel-label">Current component</span>
              <span className="promptPanel-value"><ItemIcon name={prompt.existingComponent.name} icon={prompt.existingComponent.icon} /> {prompt.existingComponent.name}</span>
            </div>
          </div>
        </div>

        <div className="appCard appCard--accent">
          {answerState && !answerState.isCorrect && (
            <div className="appCard feedbackBanner is-incorrect">
              <div className="feedbackBanner-copy">
                <h3 className="feedbackBanner-title">Not quite</h3>
                <div className="feedbackAnswer">
                  <ItemIcon
                    name={baseItems[answerState.correctId].name}
                    icon={baseItems[answerState.correctId].icon}
                  />
                  <p className="feedbackBanner-text">The right component was {baseItems[answerState.correctId].name}.</p>
                </div>
              </div>
              <Button className="nextButton" onClick={nextPrompt}>Next</Button>
            </div>
          )}
          <h2 className="panelTitle">Which item should you take?</h2>
          <p className="panelDescription">Choose the second component that completes the recipe{answerState ? ', then press Next for a new prompt.' : '.'}</p>
          <Row className={styles.choiceRow}>
            {baseItems.map((i) => {
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
                    onClick={() => checkAnswer(prompt.item, prompt.existingComponent, i)}
                  />
                </Col>
              );
            })}
          </Row>
        </div>

      </Container>
      <div>
        <Footer page="whats-missing" />
      </div>
    </div>
  );
};

export default WhatsMissing;
