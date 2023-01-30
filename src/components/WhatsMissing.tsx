import React, { useEffect } from 'react';
import { useState } from 'react';
import ItemButton from './ItemButton';
import {Container, Row, Col} from 'react-bootstrap';
import { baseItems, completedItems } from '../data';

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
          <div>You want: {completedItems[item].name} </div>
          <div>you have: <img src={baseItems[completedItems[item].components[component]].icon} />
          </div>
          <Row>
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
