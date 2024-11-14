// RollingBanner.js
import React from 'react';
import './RollingBanner.css';

const RollingBanner = ({ messages }) => {
  return (
    <div className="banner_container">
      <div className="banner_content">
        {messages.map((message, index) => (
          <span key={index}>{message}</span>
        ))}
      </div>
    </div>
  );
};

export default RollingBanner;
