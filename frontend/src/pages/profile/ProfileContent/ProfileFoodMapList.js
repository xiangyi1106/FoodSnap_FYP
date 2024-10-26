import React, { useState } from 'react';
import styles from './ProfileFoodMapList.css';

const ProfileFoodMapList = ({ items }) => {
  // State to manage which description is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    // Toggle visibility for the clicked item
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="my_foodmap_list">
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => handleToggle(index)} className={`listItem ${expandedIndex === index ? 'expanded' : ''}`}>
            {expandedIndex === index ? <div className='expanded_title'>{item.title}</div>:
            <span>{item.title}</span>}
            {/* Conditionally render the description and toggle button */}
            {expandedIndex === index && (
              <div className="my_foodmap_list_description">
                <p>{item.description}</p>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation();
                    handleToggle(index); 
                  }}
                  className="toggleButton"
                >
                  See less
                </button>
              </div>
            )}
            {/* {expandedIndex !== index && (
              <button 
                onClick={(e) => { 
                  e.stopPropagation();
                  handleToggle(index); 
                }}
                className="toggleButton"
              >
                See more
              </button>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileFoodMapList;
