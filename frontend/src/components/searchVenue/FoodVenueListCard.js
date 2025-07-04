import React from "react";
import StarRating from "./StarRating";
import { Link, useNavigate } from "react-router-dom";

const formatTime = (time) => {
  if (!time) {
    return null; // Return null if time is invalid or empty
  }
  
  const [timeStr, period] = time.split(/(am|pm)/i);
  if (!period) {
    return null; // Return null if "am" or "pm" is missing
  }

  const [hours, minutes] = timeStr.split(":").map(Number);
  const isPM = period.toLowerCase() === "pm";
  let hour24 = isPM && hours !== 12 ? hours + 12 : hours;
  if (hours === 12 && period.toLowerCase() === 'am') {
    hour24 = 0; // Handle 12 AM (midnight)
  }
  
  return new Date().setHours(hour24, minutes, 0, 0);
};

const isOpenNow = (openingHours) => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const currentDay = daysOfWeek[new Date().getDay()]; // Get current day (0 = Sunday, 6 = Saturday)

  if (!openingHours || !openingHours[currentDay] || openingHours[currentDay].length === 0) {
    return false; // No opening hours for today
  }

  const todayHours = openingHours[currentDay][0]; // Assuming one entry per day (open-close)
  if (!todayHours || !todayHours.open || !todayHours.close) {
    return false; // Missing opening or closing time
  }

  const currentTime = new Date();

  // Convert open and close times to Date objects
  const [openHours, openMinutes] = todayHours.open.split(':').map(Number);
  const [closeHours, closeMinutes] = todayHours.close.split(':').map(Number);

  const openTime = new Date();
  openTime.setHours(openHours, openMinutes, 0, 0); // Set open time

  let closeTime = new Date();
  closeTime.setHours(closeHours, closeMinutes, 0, 0); // Set close time

  // Handle the case when close time is after midnight (next day)
  if (closeTime <= openTime) {
    closeTime.setDate(currentTime.getDate() + 1); // Move to the next day
  }

  return currentTime >= openTime && currentTime <= closeTime;
};

const getOpeningTime = (openingHours) => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const currentDay = daysOfWeek[new Date().getDay()]; // Get current day (0 = Sunday, 6 = Saturday)

  if (!openingHours || !openingHours[currentDay] || openingHours[currentDay].length === 0) {
    return null; // Return null if no opening hours for the current day
  }

  const todayHours = openingHours[currentDay][0]; // Assuming one entry per day (open-close)
  if (!todayHours || !todayHours.open || !todayHours.close) {
    return null; // Return null if open or close time is missing
  }

  return todayHours;
};

const convertTo12HourFormat = (time) => {
  if (!time) return null;  // Handle empty or invalid time
  const [hours, minutes] = time.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    return null; // Return null if time is invalid
  }

  const hoursIn12HourFormat = (hours % 12) || 12; // Convert 0 to 12 for midnight
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${hoursIn12HourFormat}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
};

const FoodVenueListCard = ({ place }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/foodVenue/${place._id}`); // Change the path to the desired settings link
  };

  
  const openingTime = getOpeningTime(place.openingHours); // Get current day's opening time
  const isCurrentlyOpen = isOpenNow(place.openingHours); // Check if open now
  
  return (
    <Link to={`/foodVenue/${place._id}`} className="place-detail">
      <div className="place-header">
        <div className="place-info">
          <div className="place-title">
            <span className="place-name">{place.name}</span>
          </div>
          <div className="place-ratings">
            <StarRating rating={place.rating} />
            <span className="price-level">{place.priceRange}</span>
          </div>
          <div className="open-status">
            {openingTime ? (
              <>
                {isCurrentlyOpen ? <span style={{color: '#30BFBF', marginRight: '5px'}}>Open Now</span> : <span style={{color: '#9B1003', marginRight: '5px'}}>Closed Now</span>}
                <span>{convertTo12HourFormat(openingTime.open)} - {convertTo12HourFormat(openingTime.close)}</span>
              </>
            ) : (
              <span>Today Closed</span>
            )}
          </div>
          {place?.category && (
            <div className="dietary-restrictions">
              {place.category.map((n, i) => (
                <span className="badge" key={i}>{n}</span>
              ))}
            </div>
          )}
        </div>
        <div className="place-image-container">
          {place.picture && <img
            className="place-image"
            src={
              place.picture
            }
            alt={place.name}
          /> }
        </div>

      </div>
      {place?.address && (
        <div className="place-address">
          <span className="address-text">{place.address}</span>
        </div>
      )}
    </Link>
  );
};

export default FoodVenueListCard;
