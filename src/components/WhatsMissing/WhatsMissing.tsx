import React, { useEffect } from 'react';
import { useState } from 'react';
import ItemButton from '../ItemButton/ItemButton';
import {Container, Row, Col} from 'react-bootstrap';
import { baseItems, completedItems } from '../../data';
import ItemIcon from '../ItemIcon/ItemIcon';
import "./WhatsMissing.css";

const WhatsMissing = () => {
  const item = Math.floor(Math.random()*45)
  const component = Math.floor(Math.random()*2)
  const [streak, setStreak] = useState(0);
  const [record, setRecord] = useState(0);
  const success = () => {
    setStreak(streak+1);
  }

  useEffect(() => {
    if(streak > record) {
      setRecord(streak)
    }
  }, [streak]);

  const failure = () => {
    setStreak(0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <h1>streak: {streak} (record: {record})</h1>
          <Row className='p-2 targetRow'>
            <Col>
              You want: {completedItems[item].name} <ItemIcon icon={completedItems[item].icon} />
            </Col>
          </Row>
          <Row className='p-2'>
            <Col>
              You have: <ItemIcon icon={baseItems[completedItems[item].components[component]].icon} />
            </Col>
          </Row>
          <Row className='p-4'>
            <div className='px-2 mb-2'>Which item should you take?</div>
            {baseItems.map((i) => {
              return (
                <Col>
                  <ItemButton key={i.id} failure={failure} success={success} answer={i} existing={baseItems[completedItems[item].components[component]]} targetItem={completedItems[item]} />
                </Col>
              )})}
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default WhatsMissing;
