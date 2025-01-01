import React, { useState } from 'react';
import List from '@mui/material/List';
import FoodVenueListCard from './FoodVenueListCard';
import { HashLoader } from 'react-spinners';

const FoodVenueList = ({ foodVenues, setVisible }) => {

  return (
    <div className="restaurant-finder-page" style={{ backgroundColor: "#f0f2f5", height: '100vh' }}>
      <List sx={{
        width: '100%', overflowY: 'auto',
        maxHeight: '80vh',
      }}>
            {foodVenues &&
              foodVenues.map((place, i) => <FoodVenueListCard place={place} key={i} setVisible={setVisible} />)}
      </List>
    </div>
  );
};

export default FoodVenueList;
