import React, { useState } from 'react';
import List from '@mui/material/List';
import FoodVenueListCard from './FoodVenueListCard';

const samplePlaces = [
  {
    name: "Restaurant The Tribus",
    price: "$$",
    rating: 4.3,
    review_count: 712,
    price_level: "$$",
    // ranking: "1 of 50 Cafes in Town",
    opening_status: "Open Now",
    dietary_restrictions: [{ name: "Western" }, { name: "Mexican" }, { name: "Italian" }],
    photo: {
      images: {
        large: {
          url: "https://lh5.googleusercontent.com/p/AF1QipNkg5kyWMn-zicbUQuSyB0ge4TMTAyzGfxfWmW4=w408-h306-k-no",
        },
      },
    },
    address: "28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor",
  },
  {
    name: "228 美食中心 Restoran Dua Dua Lapan",
    price: "$",
    rating: 3.7,
    review_count: 622,
    price_level: "$",
    // ranking: "2 of 50 Bistros in Town",
    opening_status: "Closed Now",
    dietary_restrictions: [{ name: "Food Court" }],
    photo: {
      images: {
        large: {
          url: "https://lh5.googleusercontent.com/p/AF1QipNr4JVM-5IVMZdh9XNCLEYvIEoiKVBvjC2JJ-P_=w408-h544-k-no",
        },
      },
    },
    address: "28, Jalan Anggerik 2/4, Taman Anggerik, 81200 Johor Bahru, Johor",
  },
  {
    name: "Tungku Impian Restaurant",
    price: "$$",
    rating: 4.4,
    review_count: 344,
    price_level: "$",
    // ranking: "3 of 50 Diners in Town",
    opening_status: "Open Now",
    dietary_restrictions: [],
    photo: {
      images: {
        large: {
          url: "https://lh5.googleusercontent.com/p/AF1QipMhcyA_CqJXn0l__wn7vxiAJdBgSXrbNBjoOIuD=w408-h306-k-no",
        },
      },
    },
    address: "32, Jalan Flora 1/10, Taman Pulai Flora, 81110 Skudai, Johor",
  },
];

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
