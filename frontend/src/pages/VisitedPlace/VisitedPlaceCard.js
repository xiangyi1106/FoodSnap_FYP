import React from 'react';
import './VisitedPlaceCard.css'; // Assuming the CSS is in this file
import CIcon from '@coreui/icons-react';
import { cilLocationPin } from '@coreui/icons';

export default function VisitedPlaceCard({ imageUrl, date, title, onClick, location }) {
    return (
        <div className="visited_place_card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            {imageUrl && (
                <img src={imageUrl} className="card__image" alt={title} />
            )}
            <div className="card__content" style={{width: imageUrl ? '55%' : '100%'}}>
                <time dateTime={date} className="card__date">{date}</time>
                <span className="">
                <CIcon icon={cilLocationPin}  className="icon_size_18" />
                    {location}
                    </span>
                <span className="card__title">{title}</span>
            </div>
        </div>
    );
}
