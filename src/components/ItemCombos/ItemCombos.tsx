import React, { useMemo } from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CompletedItem, Component, gameDataBySet } from '../../gameData';
import Footer from "../Footer/Footer";
import ItemButton from "../ItemButton/ItemButton";
import { useSelectedSet } from "../../setSelection";

const ItemCombos = () => {
  const { selectedSet } = useSelectedSet();
  const { baseItems, completedItems } = gameDataBySet[selectedSet];
  const [items, setItems] = useState<Array<Component>>([]);
  const [buildable, setBuildable] = useState<Set<CompletedItem>>(new Set());
  const [reservedItems, setReservedItems] = useState<Array<CompletedItem>>([])
  
  const recipes = useMemo(() => {
    const recipeLookup = baseItems.reduce((acc, item) => ({ ...acc, [item.id]: {} }), {});

    for(let i = 0; i < completedItems.length; i++) {
      recipeLookup[completedItems[i].components![0]][completedItems[i].components![1]] = completedItems[i];
      recipeLookup[completedItems[i].components![1]][completedItems[i].components![0]] = completedItems[i];
    }

    return recipeLookup;
  }, [baseItems, completedItems]);

  const addItem = (item: Component) => {
    setItems((currentItems) => [item, ...currentItems]);
  }
  const removeItem = (index: number) => {
    setItems((currentItems) => currentItems.filter((_, itemIndex) => itemIndex !== index));
  }
  const reserveComponents = (target: CompletedItem) => {
    setReservedItems((currentReservedItems) => currentReservedItems.concat(target));
    setItems((currentItems) => {
      const remainingItems = [...currentItems];

      target.components.forEach((componentIndex) => {
        const itemIndex = remainingItems.findIndex((item) => item.id === componentIndex);
        if (itemIndex !== -1) {
          remainingItems.splice(itemIndex, 1);
        }
      });

      return remainingItems;
    });
  };

  const removeReserved = (index: number) => {
    const removedItem = reservedItems[index];
    if (!removedItem) {
      return;
    }

    setReservedItems((currentReservedItems) => currentReservedItems.filter((_, reservedIndex) => reservedIndex !== index));
    setItems((currentItems) => removedItem.components.map((componentIndex) => baseItems[componentIndex]).concat(currentItems));
  }

  useEffect(() => {
    setItems([]);
    setBuildable(new Set());
    setReservedItems([]);
  }, [selectedSet]);
  
  useEffect(() => {
    const updateBuildable = (newItems: Component[]) => {
      const build = newItems.flatMap((item1, i) => newItems.slice(i + 1).map((item2) => recipes[item1.id][item2.id]));
      setBuildable(new Set(build));
    };

    updateBuildable(items);
  }, [items, recipes]);

  return (
    <div className="appPage">
      <div className="pageIntro">
        <div className="pageEyebrow">Inventory Planner</div>
        <h1 className="pageTitle">Build from the components you actually have</h1>
        <p className="pageDescription">Add components into your inventory, see every item you can currently make, and reserve builds so you can track future combinations.</p>
      </div>
      <Container className="sectionStack">
        <Row className="g-3">
          <Col lg={6}>
            <div className="appCard appCard--accent">
              <h2 className="panelTitle">Available components</h2>
              <p className="panelDescription">Tap any component to add it to your inventory.</p>
              <Row className="choicesGrid">
                {baseItems.map((i, index) => {
                  return (
                    <Col xs={4} sm={3} md={2} key={index}>
                      <ItemButton answer={i} onClick={() => addItem(i)} />
                    </Col>
                  )})}
              </Row>
            </div>
          </Col>
          <Col lg={6}>
            <div className="appCard">
              <h2 className="panelTitle">Inventory</h2>
              <p className="panelDescription">Click an item in your inventory to remove it.</p>
              <Row className="choicesGrid">
                {items.map((i, index) => {
                  return (
                    <Col xs={4} sm={3} md={2} key={index}>
                      <ItemButton answer={i} onClick={() => removeItem(index)} />
                    </Col>
                  )
                })}
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="appCard">
              <h2 className="panelTitle">You can build</h2>
              <p className="panelDescription">Click a completed item to reserve its components and move it into your built list.</p>
              <Row className="choicesGrid">
                {Array.from(buildable).map((i, index) => {
                  return (
                    <Col className="m-0" xs={4} sm={3} md={2} lg={1} key={index}>
                      <ItemButton answer={i} onClick={() => reserveComponents(i)} />
                    </Col>
                  )
                })}
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="appCard">
              <h2 className="panelTitle">Reserved builds</h2>
              <p className="panelDescription">Need to undo a choice? Click a reserved item to put its components back into inventory.</p>
              <Row className="choicesGrid">
                {Array.from(reservedItems).map((i, index) => {
                  return (
                    <Col className="m-0" xs={4} sm={3} md={2} lg={1} key={index}>
                      <ItemButton answer={i} onClick={() => removeReserved(index)} />
                    </Col>
                  )
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <Footer page="item-combos" />
      </div>
    </div>
    
  )
}

export default ItemCombos;
