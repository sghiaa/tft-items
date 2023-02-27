import React, { useEffect } from 'react';
import { useState } from 'react';
import ItemButton from '../ItemButton/ItemButton';
import { Container, Row, Col } from 'react-bootstrap';
import { baseItems, completedItems } from '../../data';
import ItemIcon from '../ItemIcon/ItemIcon';
import styles from './WhatsMissing.module.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const WhatsMissing = () => {
  const item = Math.floor(Math.random() * 45);
  const component = Math.floor(Math.random() * 2);
  const [streak, setStreak] = useState(0);
  const [record, setRecord] = useState(0);

  const success = () => {
    setStreak(streak + 1);
  };

  useEffect(() => {
    if (streak > record) {
      setRecord(streak);
    }
  }, [streak, record]);

  const failure = () => {
    setStreak(0);
  };

  const checkAnswer = (targetItem, existing, answer) => {
    if (
      (targetItem.components[0] === existing.id && targetItem.components[1] === answer.id) ||
      (targetItem.components[0] === answer.id && targetItem.components[1] === existing.id)
    ) {
      success();
    } else {
      failure();
    }
  };

  return (
    <div className="App">
      <h1>
        streak: {streak} (record: {record})
      </h1>

      <Container>
        <Row className={`${styles.targetRow} p-2`}>
          <Col xs={7} style={{ textAlign: 'right' }} className="p-2">
            You want: {completedItems[item].name} <ItemIcon name={completedItems[item].name} icon={completedItems[item].icon} />
          </Col>

          <Col xs={7} style={{ textAlign: 'right' }} className="p-2">
            You have: <ItemIcon name={baseItems[completedItems[item].components[component]].name} icon={baseItems[completedItems[item].components[component]].icon} />
          </Col>
        </Row>

        <Row className="p-4">
          <div className="px-2 mb-2">Which item should you take?</div>

          {baseItems.map((i) => {
            return (
              <Col key={i.id}>
                <ItemButton answer={i} onClick={() => checkAnswer(completedItems[item], baseItems[completedItems[item].components[component]], i)} />
              </Col>
            );
          })}
        </Row>
      </Container>
      <div>
        <Footer page="whats-missing" />
      </div>
    </div>
  );
};

export default WhatsMissing;
