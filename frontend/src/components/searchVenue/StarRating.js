import React from "react";
import './StarRating.css';

const StarRating = ({ rating }) => {
  // Create an array with 5 elements
  const stars = Array(5).fill(0);

  return (
    <div className="star-rating">
      {stars.map((_, index) => {
        const filled = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? true : false;
        
        return (
          <span
            key={index}
            className={`star ${index < filled ? 'filled' : ''} ${index === filled && half ? 'half' : ''}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
