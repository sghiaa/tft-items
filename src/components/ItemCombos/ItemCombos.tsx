import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { baseItems, CompletedItem, completedItems, Component } from '../../data';
import Footer from "../Footer/Footer";
import ItemButton from "../ItemButton/ItemButton";

const ItemCombos = () => {
  const [items, setItems] = useState<Array<Component>>([]);
  const [buildable, setBuildable] = useState<Set<CompletedItem>>(new Set());
  const [reservedItems, setReservedItems] = useState<Array<CompletedItem>>([])
  
  const recipes = baseItems.reduce((acc, item) => ({ ...acc, [item.id]: {} }), {});

  for(let i = 0; i < completedItems.length; i++) {
    recipes[completedItems[i].components![0]][completedItems[i].components![1]] = completedItems[i];
    recipes[completedItems[i].components![1]][completedItems[i].components![0]] = completedItems[i];
  }

  const addItem = (item: Component) => {
    setItems([item, ...items]);
  }
  const removeItem = (index: number) => {
    let temp = [...items];
    temp.splice(index, 1)
    setItems(temp);
  }
  const reserveComponents = (target: CompletedItem) => {
    setReservedItems(reservedItems.concat(target));
    const itemsToRemove = target.components.map((componentIndex) => baseItems[componentIndex]);
    let temp = [...items]
    temp.splice(items.indexOf(itemsToRemove[0]), 1);
    temp.splice(items.indexOf(itemsToRemove[1]), 1);
    setItems(temp)
  };

  const removeReserved = (index: number) => {
    let temp = [...reservedItems];
    temp.splice(index, 1)
    
    const itemsToAdd = reservedItems[index].components.map((componentIndex) => baseItems[componentIndex]);
    setItems(itemsToAdd.concat([...items]));

    setReservedItems(temp);
  }
  
  useEffect(() => {
    const updateBuildable = (newItems: Component[]) => {
      const build = newItems.flatMap((item1, i) => newItems.slice(i + 1).map((item2) => recipes[item1.id][item2.id]));
      setBuildable(new Set(build));
    };

    updateBuildable(items);
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
                    {/* <ItemIcon icon={i.icon} name={i.name} /> */}
                    <ItemButton answer={i} onClick={() => reserveComponents(i)} />

                  </Col>
                )
              })}
            </Row>
        </Col>
      </Row>
      <Row className="p-2 m-2" style={{ backgroundColor: "#AAFAFA", borderRadius: ".5rem", color: "black" }}>
        <Col>
            <div>
              You have built:
            </div>
            <Row>
              {Array.from(reservedItems).map((i, index) => {
                return (
                  <Col className="m-2" xs={2} key={index}>
                    <ItemButton answer={i} onClick={() => removeReserved(index)} />
                  </Col>
                )
              })}
            </Row>
        </Col>
      </Row>
      <div>
        <Footer page="item-combos" />
      </div>
    </Container>
  )
}

export default ItemCombos;