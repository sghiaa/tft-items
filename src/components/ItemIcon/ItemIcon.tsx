import React from "react";
import "./ItemIcon.css";

interface Props {
  icon: string;
  name: string;
}

const ItemIcon = ({ icon, name, ...rest }: Props) => {
  return (
    <img className="thumbnail" alt={name} src={icon} {...rest} />
  )
}

export default ItemIcon;