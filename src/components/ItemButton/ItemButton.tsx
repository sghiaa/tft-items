import React from "react";
import Button from 'react-bootstrap/Button';
import { Item } from "../../data";
import ItemIcon from "../ItemIcon/ItemIcon";

interface Props {
  answer: Item;
  checkAnswer: () => void;
}



const ItemButton = ({ answer, checkAnswer}: Props) => {
  return (
    <Button className="p-0" onClick={() => checkAnswer()}>
      <ItemIcon name={answer.name} icon={answer.icon} />
    </Button>
  )
}

export default ItemButton;