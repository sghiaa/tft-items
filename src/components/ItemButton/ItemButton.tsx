import React from "react";
import Button from 'react-bootstrap/Button';
import { Item } from "../../data";
import ItemIcon from "../ItemIcon/ItemIcon";

interface Props {
  answer: Item;
  onClick: () => void;
}



const ItemButton = ({ answer, onClick}: Props) => {
  return (
    <Button className="p-0 m-1" onClick={() => onClick()}>
      <ItemIcon name={answer.name} icon={answer.icon} />
    </Button>
  )
}

export default ItemButton;