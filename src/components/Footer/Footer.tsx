import React from "react"
import { Link } from "react-router-dom";

interface Props {
  page: string;
}

const pages = ["whats-missing", "what-can-you-build", "team-comps", "item-combos"]
const Footer = ({ page }: Props) => {
  return (
    <ul>
      {pages.map((p) => {
        if(p !== page) {
          return (
            <li key={p}>
              <Link to={`/tft-items/${p}`}>{p}</Link>
            </li>
          )}}
        )}
    </ul>
  )
}

export default Footer;