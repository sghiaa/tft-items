import React from "react";
import "./ItemIcon.css";

interface Props {
  icon: string;
}

const ItemIcon = ({ icon, ...rest }: Props) => {
  return (
    <img className="thumbnail" src={icon} {...rest} />
  )
}

export default ItemIcon;