import React from 'react';
import StarRating from '../searchVenue/StarRating';
import CIcon from '@coreui/icons-react';
import {
    cilLocationPin, cilThumbUp
} from '@coreui/icons';

const FoodResultCard = ({ name, hours, rating, description, reason, address }) => {
    return (
        <div className="result_card">
            <div className="description">
                <h2>{name}</h2>
                <h4 style={{fontSize: '0.9rem'}}>{hours}</h4>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StarRating rating={rating} />
                    <h1>({rating})</h1>
                </div>
                <p>{description}</p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', gap: '5px' }}>
                    <div style={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
                        <CIcon icon={cilThumbUp} style={{ color: 'green' }} className="icon_size_22" />
                    </div>
                    <h4 style={{ color: 'gray', flex: 1 }}>{reason}</h4>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', gap: '5px' }}>
                    <div style={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
                        <CIcon icon={cilLocationPin} style={{ color: 'red' }} className="icon_size_22" />
                    </div>
                    <h4 style={{ color: 'gray', flex: 1 }}>{address}</h4>
                </div>
            </div>
        </div>
    );
};

export default FoodResultCard;
