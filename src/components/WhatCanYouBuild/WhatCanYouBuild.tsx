import React, { useEffect } from 'react';
import { useState } from 'react';
import ItemButton from '../ItemButton/ItemButton';
import {Container, Row, Col} from 'react-bootstrap';
import { baseItems, completedItems } from '../../data';
import ItemIcon from '../ItemIcon/ItemIcon';
import { Link } from 'react-router-dom';

const WhatCanYouBuild = () => {
  const itemOne = Math.floor(Math.random()*8)
  const itemTwo = Math.floor(Math.random()*8)
  const [streak, setStreak] = useState(0);
  const [record, setRecord] = useState(0);
  const success = () => {
    setStreak(streak+1);
  }

  useEffect(() => {
    if(streak > record) {
      setRecord(streak)
    }
  }, [streak, record]);

  const failure = () => {
    setStreak(0);
  }

  const checkAnswer = (targetItem, existing, answer) => {
    if((targetItem.components[0] === existing.id && targetItem.components[1] === answer.id) ||
      (targetItem.components[0] === answer.id && targetItem.components[1] === existing.id)) {
        success();
      }
    else {
      failure();
    }
  }

  return (
    <div className="App">
      <Container className="gameArea">
        <Row>
          <Col xs={12}>
            <h1 className='streak'>streak: {streak} (record: {record})</h1>
          </Col>
        </Row>
        <Row className='p-2 targetRow'>
          <Col xs={12} className="question">
            You have: <ItemIcon name={baseItems[itemOne].name} icon={baseItems[itemOne].icon} />
            &nbsp;and <ItemIcon name={baseItems[itemTwo].name} icon={baseItems[itemTwo].icon} />
          </Col>
        </Row>
        <Row className='p-4 itemChoices'>
          <div className='px-2 mb-2'>Which item can you build?</div>
          {completedItems.map((i) => {
            return (
              <Col key={i.id} xs={3} sm={2} md={1}>
                <ItemButton answer={i} checkAnswer={() => checkAnswer(i, baseItems[itemOne], baseItems[itemTwo])} />
              </Col>
            )})}
        </Row>
      </Container>
      <Link to="/tft-items/whats-missing">Whats missing?</Link>
    </div>
  );
}

export default WhatCanYouBuild;
