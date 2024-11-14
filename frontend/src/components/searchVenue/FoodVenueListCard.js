import React from "react";
import StarRating from "./StarRating";
import { Link, useNavigate } from "react-router-dom";

const FoodVenueListCard = ({ place }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/foodVenue/${place._id}`); // Change the path to the desired settings link
  };
  return (
    // <div className="place-detail" onClick={() => setVisible(true)}>
    <Link to={`/foodVenue/${place._id}`} className="place-detail">
      <div className="place-header">
        <div className="place-info">
          <div className="place-title">
            <span className="place-name">{place.name}</span>
          </div>
          <div className="place-ratings">
            <StarRating rating={place.rating} />
            {/* <span className="rating-text">{`(${place.review_count})`}</span> */}
            <span className="price-level">{place.priceRange}</span>
          </div>
          <div className="open-status">{place.opening_status}</div>
          {place?.dietary_restrictions && (
            <div className="dietary-restrictions">
              {place.dietary_restrictions.map((n, i) => (
                <span className="badge" key={i}>{n.name}</span>
              ))}
            </div>
          )}
        </div>
        <div className="place-image-container">
          <img
            className="place-image"
            src={
              place.picture
                ? place.picture
                : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
            }
            alt={place.name}
          />
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
