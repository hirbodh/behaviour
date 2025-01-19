import React from "react";
import { Link } from "react-router-dom";

export default function TabGenerator({ activeTab, setActiveTab, tab }) {
  return (
    <li onClick={() => setActiveTab(tab.id)} key={tab.id} className={activeTab === tab.id ? 'active' : 'btn'}>
        <Link to={tab.path} >{tab.title}</Link>
    </li>
  );
}
