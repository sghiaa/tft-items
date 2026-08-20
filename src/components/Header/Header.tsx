import React from "react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../navigation";
import { createSetPath, useSelectedSet } from "../../setSelection";
import "./Header.css"

const Header = () => {
  const { selectedSet, updateSet } = useSelectedSet();

  return (
    <div className="siteHeader">
      <div className="siteHeader-top">
        <div>
          <div className="siteHeader-kicker">Item Trainer</div>
          <h1 className="siteHeader-title">TFT trainer</h1>
          <p className="siteHeader-subtitle">Sharpen item recognition, recipe memory, and board-building habits in one place.</p>
        </div>
        <div className="siteHeader-controls">
          <div className="siteHeader-badge">Live set: Set 18</div>
          <div className="siteHeader-setSwitcher" aria-label="Select TFT set">
            <button
              className={`siteHeader-setTab${selectedSet === "17" ? " is-active" : ""}`}
              onClick={() => updateSet("17")}
              type="button"
            >
              Set 17
            </button>
            <button
              className={`siteHeader-setTab${selectedSet === "18" ? " is-active" : ""}`}
              onClick={() => updateSet("18")}
              type="button"
            >
              Set 18
            </button>
          </div>
        </div>
      </div>
      <nav className="siteHeader-nav" aria-label="Primary">
        {navigationItems.map((item) => (
          <NavLink
            key={item.id}
            className={({ isActive }) => `siteHeader-link${isActive ? " is-active" : ""}`}
            to={createSetPath(item.path, selectedSet)}
          >
            <span className="siteHeader-linkTitle">{item.label}</span>
            <span className="siteHeader-linkDescription">{item.description}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Header;
