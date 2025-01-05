import React from 'react';
import './FoodEventCard.css'; // Import the updated CSS file for FoodEventCard
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { convertTo12HourFormat } from '../../functions/fileUtils';

export default function FoodEventCard({ event, isEvent }) {

  const navigate = useNavigate();

  const handleClick = (eventId) => {
    if (isEvent) {
      navigate(`/foodEvent/${eventId}`);
    } else {
      navigate(`/foodPromotion/${eventId}`);
    }
  };

  return (
    <div className="food_event_card_card" onClick={() => handleClick(event?._id)}>
      <div className="food_event_card_card_image">
        <img src={event?.image ? event?.image : `${process.env.PUBLIC_URL}/images/no-picture.png`} alt={event?.name} />
      </div>
      <div className="food_event_card_card_header">
        <div className='food_event_card_card_header_title'>{event?.name}</div>
      </div>
      <div className="food_event_card_card_meta">
        <p>{event?.location?.name}</p>
      </div>
      <div className="food_event_card_card_footer">
        <div className="food_event_card_card_meta">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="Calendar">
            <rect x="2" y="4" width="20" height="18" rx="4" />
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <path d="M2 10h20" />
          </svg>
          <p>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className='' style={{ marginLeft: '10px' }}>{convertTo12HourFormat(event?.time)}</p>
        </div>
      </div>
    </div>
  );
}
