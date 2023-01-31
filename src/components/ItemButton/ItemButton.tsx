import React from "react";
import Button from 'react-bootstrap/Button';
import ItemIcon from "../ItemIcon/ItemIcon";

interface Item {
  id: number;
  name: string;
  icon: string;
  components?: [number];
}

interface Props {
  targetItem: Item;
  existing: Item;
  answer: Item;
  success: () => void;
  failure: () => void;
}


const checkAnswer = (targetItem, existing, answer, success, failure) => {
  if((targetItem.components[0] === existing.id && targetItem.components[1] === answer.id) ||
    targetItem.components[0] === answer.id && targetItem.components[1] === existing.id) {
      success();
    }
  else {
    failure();
  }

}

const ItemButton = ({ targetItem, existing, answer, success, failure}: Props) => {
  return (
    <Button className="p-0" onClick={() => checkAnswer(targetItem, existing, answer, success, failure)}>
      <ItemIcon icon={answer.icon} />
    </Button>
  )
}

export default ItemButton;