import React, { useState } from 'react';
import List from '@mui/material/List';
import FoodVenueListCard from './FoodVenueListCard';

const FoodVenueList = ({ foodVenues, setVisible}) => {

  return (
    <div className="restaurant-finder-page">
      <List sx={{ width: '100%', overflowY: 'auto',
        maxHeight: '80vh', }}>
        {foodVenues &&
          foodVenues.map((place, i) => <FoodVenueListCard place={place} key={i} setVisible={setVisible} />)}
      </List>
    </div>
  );
};

export default FoodVenueList;
