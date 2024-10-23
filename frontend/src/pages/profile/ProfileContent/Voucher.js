import React from 'react';
import './Voucher.css';

const Voucher = () => {
  return (
    <div className="d-flex justify-content-center align-items-center voucher_container">
      <div className="d-flex voucher_card text-center">
        <div className="voucher_image">
          <img src="https://i.imgur.com/DC94rZe.png" width="150" alt="Decorative" />
        </div>
        <div className="voucher_image2">
          <img src="https://i.imgur.com/DC94rZe.png" width="150" alt="Decorative" />
        </div>
        <h1>50% OFF</h1>
        <span className="d-block">On Everything</span>
        <span className="d-block">Today</span>
        <div className="mt-4">
          <small>With Code: bbbootstrap2020</small>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
