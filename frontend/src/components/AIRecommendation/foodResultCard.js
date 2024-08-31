import React from 'react';
import StarRating from '../searchVenue/StarRating';
import CIcon from '@coreui/icons-react';
import { cilLocationPin, cilThumbUp
} from '@coreui/icons';

const FoodResultCard = ({ name, hours, rating, description, reason, address }) => {
    return (
        <div className="result_card">
            <div className="description">
                <h2>{name}</h2>
                <h4>{hours}</h4>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StarRating rating={rating} />
                    <h1>({rating})</h1>
                </div>
                <p>{description}</p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom:'15px', gap:'5px' }}>
                    <CIcon icon={cilThumbUp} style={{ marginRight: '3px', position: 'relative', bottom: '3px', color: 'green' }} className="icon_size_20" />
                    <h4 style={{color: 'gray' }}>{reason}</h4>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom:'15px', gap:'5px' }}>
                    <CIcon icon={cilLocationPin} style={{ marginRight: '3px', position: 'relative', bottom: '3px', color: 'red' }} className="icon_size_22" />
                    <h4 style={{color: 'gray' }}>{address}</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button>See Details</button>
                </div>
            </div>
        </div>
    );
};

export default FoodResultCard;
