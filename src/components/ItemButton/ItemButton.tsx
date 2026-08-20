import React from "react";
import Button from 'react-bootstrap/Button';
import { Item } from "../../data";
import ItemIcon from "../ItemIcon/ItemIcon";

interface Props {
  answer: Item;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const ItemButton = ({ answer, className = "", disabled = false, onClick}: Props) => {
  return (
    <Button className={`p-0 m-1 ${className}`.trim()} disabled={disabled} onClick={() => onClick()}>
      <ItemIcon name={answer.name} icon={answer.icon} />
    </Button>
  )
}

export default ItemButton;
