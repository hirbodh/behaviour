import React from "react";
import { Link } from "react-router-dom";

export default function SideBarMenuItems({ menuItems, setActiveItemId, activeItemId }) {
  
  const handleClick = (id) => {
    setActiveItemId(id);
  };

  return (
    <li
      id={menuItems.id}
      key={menuItems.id}
      className={activeItemId === menuItems.id ? "active" : ""}
    >
      <Link to={menuItems.path} 
      onClick={() => handleClick(menuItems.id)}
      >
        {menuItems.title}
      </Link>
    </li>
  );
}
