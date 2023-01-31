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
      <Container>
        <h1>streak: {streak} (record: {record})</h1>
        <Row className='p-2 targetRow'>
          <Col>
            You have: <ItemIcon name={baseItems[itemOne].name} icon={baseItems[itemOne].icon} />
            and <ItemIcon name={baseItems[itemTwo].name} icon={baseItems[itemTwo].icon} />
          </Col>
        </Row>
        <Row className='p-4'>
          <div className='px-2 mb-2'>Which item can you build?</div>
          {completedItems.map((i) => {
            return (
              <Col key={i.id}>
                <ItemButton answer={i} checkAnswer={() => checkAnswer(i, baseItems[itemOne], baseItems[itemTwo])} />
              </Col>
            )})}
        </Row>
      </Container>
      <Link to="/whats-missing">Whats missing?</Link>
    </div>
  );
}

export default WhatCanYouBuild;
