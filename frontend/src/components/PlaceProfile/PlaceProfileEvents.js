import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import AddEvent from '../../pages/foodEvent/addEvent/addEvent';
import FoodEventCard from '../FoodEvent/FoodEventCard';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CardSkeleton from '../Skeleton/CardSkeleton';

export default function PlaceProfileEvents({ user }) {
  const { foodVenue } = useOutletContext(); // Fetch the user profile data from context
  const [isEvent, setIsEvent] = useState(true);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // State to store filtered events
  const [isCreateEventVisible, setIsCreateEventVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        if (!foodVenue?._id) {
          return;
        }
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getEventsByID/${foodVenue._id}`);
        // Check if the response is not empty
        if (response.data && response.data.length > 0) {
          setEvents(response.data); // Set all promotions
          setFilteredEvents(response.data); // Set filtered promotions to show all initially
        }
        // setLoading(false);
      } catch (error) {
        // setError(error.message); // Capture error message
        console.log("Error fetching event: " + error.message);
        setEvents([]);
        setFilteredEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [foodVenue?._id]); // Empty dependency array to run only once on component mount

  return (
    <div className='place_profile_photos'>
      {isCreateEventVisible && <AddEvent setIsCreateEventVisible={setIsCreateEventVisible} user={user} setEvents={setEvents} setFilteredEvents={setFilteredEvents} foodVenue={foodVenue} />}
      {loading ?
        <>
          <CardSkeleton />
        </> :
        <div className="food_event_card_container">
          {filteredEvents && filteredEvents.length > 0 ? filteredEvents.map((event, index) => (
            <FoodEventCard key={index} event={event} isEvent={isEvent} />
          )) : <div>
            No Event Found
          </div>}
        </div>}

      {!isCreateEventVisible &&
        <Fab
          color="#30BFBF"
          aria-label="add"
          variant="extended"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
          }}
          onClick={() => setIsCreateEventVisible(true)}
        >
          Create Event <AddIcon />
        </Fab>
      }
    </div>
  )
}
