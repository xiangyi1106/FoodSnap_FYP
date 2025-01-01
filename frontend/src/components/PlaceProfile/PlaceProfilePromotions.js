import { Fab } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import FoodEventCard from '../FoodEvent/FoodEventCard';
import AddPromotion from '../../pages/foodPromotion/AddPromotion/AddPromotion';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import axios from 'axios';
import CardSkeleton from '../Skeleton/CardSkeleton';

export default function PlaceProfilePromotions({ user }) {
  const { foodVenue} = useOutletContext(); // Fetch the user profile data from context
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]); // State to store filtered promotions
  const [isEvent, setIsEvent] = useState(false);
  const [isCreatePromotionVisible, setIsCreatePromotionVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        if (!foodVenue?._id) {
          return;
        }
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getPromotionsByID/${foodVenue._id}`);
        // Check if the response is not empty
        if (response.data && response.data.length > 0) {
          setPromotions(response.data); // Set all promotions
          setFilteredPromotions(response.data); // Set filtered promotions to show all initially
        }
      } catch (error) {
        // setError(error.message); // Capture error message
        console.log("Error fetching promotions: " + error.message);
      } finally {
        // setLoading(false); // Set loading state to false once the fetch completes
      }
    };

    fetchPromotions();
  }, [foodVenue?._id]); // Empty dependency array to run only once on component mount

  return (
    <div className='place_profile_photos'>
      {isCreatePromotionVisible && <AddPromotion setIsCreatePromotionVisible={setIsCreatePromotionVisible} user={user} setPromotions={setPromotions} setFilteredPromotions={setFilteredPromotions} foodVenue={foodVenue} />}
      {loading ?
        <>
          <CardSkeleton />
        </> :
      <div className="food_event_card_container">
        {filteredPromotions.length > 0 ? filteredPromotions.map((event, index) => (
          <FoodEventCard key={index} event={event} isEvent={isEvent} />
        )) : <div>
          No Promotion Found
        </div>}
      </div>
      }
      {!isCreatePromotionVisible &&
        <Fab
          color="#30BFBF"
          aria-label="add"
          variant="extended"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
          }}
          onClick={() => setIsCreatePromotionVisible(true)}
        >
          Create Promotion <AddIcon />
        </Fab>
      }
    </div>
  )
}
