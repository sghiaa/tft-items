import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseItems, completedItems, Item } from '../../data';
import ItemButton from "../ItemButton/ItemButton";
import ItemIcon from "../ItemIcon/ItemIcon";

const ItemCombos = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [buildable, setBuildable] = useState<Set<Item>>([]);
  // const [targetable, setTargetable] = useState<Set<Item>>([]);

  let recipes = {};
  for(let i = 0; i < baseItems.length; i++) {
    recipes[i] = {};
  }

  for(let i = 0; i < completedItems.length; i++) {
    recipes[completedItems[i].components![0]][completedItems[i].components![1]] = completedItems[i];
    recipes[completedItems[i].components![1]][completedItems[i].components![0]] = completedItems[i];
  }

  const addItem = (item: Item) => {
    setItems([item, ...items]);
  }
  const removeItem = (index: number) => {
    let temp = [...items];
    temp.splice(index, 1)
    setItems(temp);
  }

  useEffect(() => {
    let build: Set<Item> = new Set;
    let target: Set<Item> = new Set;
    for(let i = 0; i < items.length; i++) {
      for(let j = i + 1; j < items.length; j++) {
        build.add(recipes[items[i].id][items[j].id])
      }
    }
    setBuildable(build);
  }, [items]);

  return (
    <Container>
      <Row className="m-2">
        <Col xs={6} style={{ backgroundColor: "aquamarine", color: "black", borderRadius: ".5rem"}}>
          <div>
            Which items do you have?
          </div>
          <Row>
            {baseItems.map((i, index) => {
              return (
                <Col xs={2} key={index}>
                  <ItemButton answer={i} onClick={() => addItem(i)} />
                </Col>
              )})}
          </Row>
        </Col>
        <Col xs={6} style={{ backgroundColor: "#FFAAFF", color: "black", borderRadius: ".5rem"}}>
          <Row>
            <div>
              Inventory:
            </div>
            {items.map((i, index) => {
              return (
                <Col xs={2} key={index}>
                  <ItemButton answer={i} onClick={() => removeItem(index)} />
                </Col>
              )
            })}
          </Row>
        </Col>
      </Row>
      <Row className="p-2 m-2" style={{ backgroundColor: "#AAFAFA", borderRadius: ".5rem", color: "black" }}>
        <Col>
            <div>
              You can build:
            </div>
            <Row>
              {Array.from(buildable).map((i, index) => {
                return (
                  <Col className="m-2" xs={2} key={index}>
                    <ItemIcon icon={i.icon} name={i.name} />
                  </Col>
                )
              })}
            </Row>
        </Col>
      </Row>
      {/* <Row className="p-2 m-2" style={{ backgroundColor: "#FAFAFA", borderRadius: ".5rem", color: "black" }}>
        <Col>
            <div>
              You could target:
            </div>
            <Row>
              {Array.from(targetable).map((i, index) => {
                return (
                  <Col className="m-2" xs={2} key={index}>
                    <ItemIcon icon={i.icon} name={i.name} />
                  </Col>
                )
              })}
            </Row>
        </Col>
      </Row> */}
      <ul>
        <li>
          <Link to="/tft-items/whats-missing">Whats missing?</Link>
        </li>
        <li>
          <Link to="/tft-items/what-can-you-build">What can you build?</Link>
        </li>
      </ul>
    </Container>
  )
}

export default ItemCombos;