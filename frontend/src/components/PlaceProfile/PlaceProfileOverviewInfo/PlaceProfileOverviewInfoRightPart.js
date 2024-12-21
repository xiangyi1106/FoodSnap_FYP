import React from 'react';
import PropTypes from 'prop-types';
import CIcon from '@coreui/icons-react';
import { cilCarAlt } from '@coreui/icons';

export default function PlaceProfileOverviewInfoRight({
    foodVenue
}) {
    // Helper function to open Google Maps in a new tab
    const handleGetDirection = () => {
        if (foodVenue?.latitude && foodVenue?.longitude) {
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${foodVenue.latitude},${foodVenue.longitude}`;
            window.open(mapsUrl, '_blank', 'noopener noreferrer');
        } else {
            alert('Coordinates not available for this location.');
        }
    };
    return (
        <div className="profile_card">
            {/* Telephone */}
            <div className="info_profile">
                <div className="info_profile_title logo_color_text source-sans-3-bold">Telephone</div>
            </div>
            <span className="info_profile_title_text">{foodVenue?.phone || "-"}</span>
            <div className="divider_split"></div>

            {/* Website */}
            <div className="info_profile">
                <div className="info_profile_title logo_color_text source-sans-3-bold">Website</div>
            </div>
            <span className="info_profile_title_text">
                <a href={foodVenue?.website} target="_blank" rel="noopener noreferrer">
                    {foodVenue?.website || "-"}
                </a>
            </span>
            <div className="divider_split"></div>
            {/* Address */}
            <div className="info_profile">
                <div className="info_profile_title logo_color_text source-sans-3-bold">Address</div>
            </div>
            <span className="info_profile_title_text">{foodVenue?.address || "-"}</span>
            {foodVenue?.latitude && foodVenue?.longitude && <div style={{ marginTop: '5px' }}>
                <button className='green_btn' onClick={handleGetDirection}>Get Direction <CIcon icon={cilCarAlt} className='icon_size_22'></CIcon></button>
            </div>}
            <div className="divider_split"></div>

            {/* Opening Hours */}
            <div className="info_profile">
                <div className="info_profile_title logo_color_text source-sans-3-bold">Opening Hours</div>
            </div>
            <div className="opening_hour">
                {Object.entries(foodVenue?.openingHours || {}).map(([day, times], index) => (
                    <div key={index} className="opening_hour_row">
                        <div className="opening_hour_day" style={{ minWidth: '50px', textAlign: 'left', paddingRight: '16px' }}>{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                        <div className="opening_hour_time">
                            {times.length > 0 ? (
                                times.map((time, idx) => (
                                    <div key={idx}>
                                        {time.open} - {time.close}
                                    </div>
                                ))
                            ) : (
                                <span>Closed</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Defining propTypes for better readability and type-checking
PlaceProfileOverviewInfoRight.propTypes = {
    telephone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    openingHours: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
        })
    ).isRequired,
};

// Default props in case none are passed
PlaceProfileOverviewInfoRight.defaultProps = {
    telephone: 'Not available',
    website: '#',
    address: 'Not available',
    openingHours: [
        { day: 'Mon', time: 'N/A' },
        { day: 'Tue', time: 'N/A' },
        { day: 'Wed', time: 'N/A' },
        { day: 'Thu', time: 'N/A' },
        { day: 'Fri', time: 'N/A' },
        { day: 'Sat', time: 'N/A' },
        { day: 'Sun', time: 'N/A' },
    ],
};
