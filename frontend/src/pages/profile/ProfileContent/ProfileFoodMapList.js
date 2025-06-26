import React, { useEffect, useState } from 'react';
import styles from './ProfileFoodMapList.css';
import { Pagination } from '@mui/material';
import ProfileFoodMapVenueDetails from './ProfileFoodMap/ProfileFoodMapVenueDetails';

const ProfileFoodMapList = ({ foodVenuesMap, currentPage, itemsPerPage, onPageChange, setIsVisible, isVisible }) => {
  const [selectedVenue, setSelectedVenue] = useState(null);
   // Calculate paginated venues
   const indexOfLastVenue = currentPage * itemsPerPage;
   const indexOfFirstVenue = indexOfLastVenue - itemsPerPage;
   const currentVenues = foodVenuesMap.slice(indexOfFirstVenue, indexOfLastVenue);

  const openVenueDetails = (venue) => {
    setSelectedVenue(venue);
    setIsVisible(true);
  };

  const closeVenueDetails = () => {
    setSelectedVenue(null);
    setIsVisible(false);
  };

  return (
    <div className={"foodMapListContainer"}>
      {selectedVenue && isVisible && (
        <ProfileFoodMapVenueDetails
          selectedVenue={selectedVenue}
          setIsVisible={setIsVisible}
          setSelectedVenue={setSelectedVenue}
        />
      )}
      {currentVenues && currentVenues.length > 0 ? (
        currentVenues.map((venue, index) => (
          <div
            key={index}
            className={"foodMapCard"}
            onClick={() => openVenueDetails(venue)}
          >
            {venue.venueImage && (
              <div className={"foodMapImageWrapper"}>
                <img src={venue.venueImage} alt={venue.name} className={"foodMapImage"} />
              </div>
            )}
            <div className={"foodMapContent"}>
              <h5 className={"foodMapTitle"}>{venue.name}</h5>
              <p className={"foodMapAddress"}>{venue.address}</p>
            </div>
          </div>
        ))
      ) : (
        <p className={"foodMapNoVenuesMessage"}>No food venues available.</p>
      )}
      
      <Pagination
        count={Math.ceil(foodVenuesMap.length / itemsPerPage)} // Total pages
        page={currentPage} // Current page
        onChange={(event, newPage) => onPageChange(event, newPage)}
        className="foodMapPagination"
        sx={{
          '.MuiPaginationItem-root': {
            // backgroundColor: 'lightblue', // Change background color
            // color: 'white', // Text color
            '&.Mui-selected': {
              backgroundColor: '#30BFBF', // Selected page background color
              color: 'white', // Selected text color
            },
          },
        }}
      />
    </div>
  );
};

export default ProfileFoodMapList;
