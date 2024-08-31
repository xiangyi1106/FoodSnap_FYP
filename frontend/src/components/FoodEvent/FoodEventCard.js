import React from 'react';
import './FoodEventCard.css'; // Import the updated CSS file for FoodEventCard
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function FoodEventCard({ event }) {
  return (
    <div className="food_event_card_card">
      <div className="food_event_card_card_image">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="food_event_card_card_header">
        <div className='food_event_card_card_header_title'>{event.title}</div>
        <button className="food_event_card_icon_button">
          <span className="material-symbols-outlined"><FavoriteBorderIcon /></span>
        </button>
      </div>
      <div className="food_event_card_card_meta">
          <p>{event.location}</p>
        </div> 
      <div className="food_event_card_card_footer">
        <div className="food_event_card_card_meta">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="Calendar">
            <rect x="2" y="4" width="20" height="18" rx="4" />
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <path d="M2 10h20" />
          </svg>
          <p>{event.date}</p>
        </div>

        {/* <div className="food_event_card_card_meta" style={{ alignItems: 'center', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '25px', alignItems: 'center' }}>
            <span style={{ color: 'green' }}>SEP</span>
            <span style={{ fontSize: '1.5rem' }}>10</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
            <span>7:00 P.M.</span>
            <span style={{ marginTop: '6px' }}>{event.location}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
