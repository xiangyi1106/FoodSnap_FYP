import React, { useState } from 'react';
import './Rating.css';

const Rating = () => {
  const [rating, setRating] = useState(1); // Default rating is 1

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  return (
    <div>
      <p>CSS-only Star Rating</p>
      <h2>How excited are you for the new Avengers movie on a scale of 1-5 stars?</h2>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <React.Fragment key={star}>
            <input 
              type="radio" 
              name="rating" 
              id={`star-${star}`} 
              value={star}
              checked={rating === star} 
              onChange={handleRatingChange} 
            />
            <label htmlFor={`star-${star}`}>
              <i className="fa fa-star"></i>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Rating;
