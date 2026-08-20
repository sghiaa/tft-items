import React from "react"
import { Link } from "react-router-dom";
import { navigationItems } from "../../navigation";
import { createSetPath, useSelectedSet } from "../../setSelection";
import "./Footer.css";

interface Props {
  page: string;
}

const Footer = ({ page }: Props) => {
  const { selectedSet } = useSelectedSet();

  return (
    <section className="footerNav">
      <div className="footerNav-card">
        <div className="footerNav-eyebrow">Explore More Trainers</div>
        <h2 className="footerNav-title">Jump to another TFT tool</h2>
        <p className="footerNav-copy">Each trainer focuses on a different item skill, so the next drill is always one click away.</p>
        <ul className="footerNav-links">
          {navigationItems.filter((item) => item.id !== page).map((item) => (
            <li key={item.id}>
              <Link className="footerNav-link" to={createSetPath(item.path, selectedSet)}>
                <span className="footerNav-linkTitle">{item.label}</span>
                <span className="footerNav-linkDescription">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Footer;
