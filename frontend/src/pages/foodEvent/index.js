import React, { useEffect, useState } from 'react'
import FoodEventCard from '../../components/FoodEvent/FoodEventCard'
import PromotionFilter from '../../components/foodPromotion/Filter';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RollingBanner from '../../components/Banner/RollingBanner';
import { Fab } from '@mui/material';
import AddEvent from './addEvent/addEvent';
import AddIcon from '@mui/icons-material/Add';

export default function FoodEvent({user}) {
    
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]); // State to store filtered events
    const [isCreateEventVisible, setIsCreateEventVisible] = useState(false);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getPublicEvents`,
                );
                setEvents(response.data);
                setFilteredEvents(response.data);
            } catch (error) {
                toast.error("Error fetching Events: " + error.message);
            }
        };

        fetchEvents();
    }, []);

    // Function to handle filtered results
    const handleResults = (results) => {
        if (results.length > 0) {
            setFilteredEvents(null);
            setFilteredEvents(results); // Set the filtered events
        } else {
            setFilteredEvents(null);
        }
    };

    const [isEvent, setIsEvent] = useState(true);
    const messages = [
        "Don't waste food! Help reduce food waste and make a difference.",
        "Remember to compost leftovers and recycle whenever possible.",
        "Plan your meals to avoid excess food waste!",
        "Store food properly to keep it fresh for longer.",
    ];

    return (
        <div className='food_event_container'>
            <RollingBanner messages={messages} />
            {isCreateEventVisible && <AddEvent setIsCreateEventVisible={setIsCreateEventVisible} setEvents={setEvents} setFilteredEvents={setFilteredEvents} user={user}/>}
            <div className='food_event_container_title'>Food Events</div>
            <div className='filter_container'><PromotionFilter onResults={handleResults} isEvent={isEvent} /></div>
            <div className="food_event_card_container">
                {filteredEvents ? filteredEvents.map((event, index) => (
                    <FoodEventCard key={index} event={event} isEvent={isEvent} />
                )) : <div>
                    No Event Found
                </div>}
            </div>
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
