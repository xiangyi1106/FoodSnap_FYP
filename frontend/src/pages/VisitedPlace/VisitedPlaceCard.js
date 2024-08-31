import React from 'react';
import './VisitedPlaceCard.css'; // Assuming the CSS is in this file

export default function VisitedPlaceCard({ imageUrl, date, title }) {
    return (
        <div className="visited_place_card">
            {imageUrl && (
                <img src={imageUrl} className="card__image" alt={title} />
            )}
            <div className="card__content" style={{width: imageUrl ? '55%' : '100%'}}>
                <time dateTime={date} className="card__date">{date}</time>
                <span className="card__title">{title}</span>
            </div>
        </div>
    );
}
