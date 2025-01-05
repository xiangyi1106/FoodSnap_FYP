import { cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { useEffect } from 'react'
import { toggleScroll } from '../../../../functions/fileUtils';

export default function ProfileFoodMapVenueDetails({ selectedVenue, setIsVisible, setSelectedVenue }) {
    useEffect(() => {
        toggleScroll(true);
        return () => toggleScroll(false); // Re-enable scrolling on cleanup
    }, []);

    return (
        <div className='blur place_detail_information' >
            <div className='container_wrapper' style={{ backgroundColor: 'white' }}>
                <div className='close_button hover_style_2'><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => {
                    toggleScroll(false);
                    setIsVisible(false);
                    setSelectedVenue(null);
                }} /></div>
                <div className="settings_layout" style={{padding: '1rem 2.5rem'}}>
                    <div className="settings_header">
                        <h2 className="settings_title">Food Venue Details</h2>
                    </div>
                </div>
                <div className="settings_separator" style={{margin: 0}}></div>
                <div className="popup_container">
                    {selectedVenue.venueImage && (
                        <img
                            src={selectedVenue.venueImage}
                            alt={selectedVenue.name}
                            className="foodMapDetailImage"
                            style={{borderRadius: '8px'}}
                        />
                    )}
                    <p><strong>Address:</strong> {selectedVenue.address}</p>
                    <p><strong>Latitude:</strong> {selectedVenue.latitude}</p>
                    <p><strong>Longitude:</strong> {selectedVenue.longitude}</p>
                    <p><strong>Note:</strong> {selectedVenue.description || 'No description available.'}</p>
                </div>
            </div>
        </div>
    )
}
