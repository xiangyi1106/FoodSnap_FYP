import React, { useState } from "react";
import "./Tabs.css";

const Tabs = ({ tabs, setActiveTab, activeTab}) => {

  return (
    <div className="tab-container">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
