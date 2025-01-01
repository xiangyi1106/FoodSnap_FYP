import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from '../searchVenue/StarRating';
import { IconButton, Tooltip } from '@mui/material';
import CIcon from '@coreui/icons-react';
import { cilColorBorder, cilBookmark } from '@coreui/icons';
import EditPlaceInfo from './EditPlaceInfo';
import { addToFoodVenueWishlist, checkFoodVenueInWishlist, getFoodVenueWishlist, removeFromFoodVenueWishlist } from '../../functions/user';

export default function PlaceProfilePictureInfo({ foodVenue, user, setFoodVenue }) {
  const [visible, setVisible] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [validityToEditFoodVenue, setValidityToEditFoodVenue] = useState(false);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      const isInWishlist = await checkFoodVenueInWishlist(foodVenue._id, user.token);
      setIsWishlisted(isInWishlist);
    };
    checkWishlistStatus();
    if (user.role === 'business' && user.foodVenueOwned === foodVenue._id) {
      setValidityToEditFoodVenue(true);  // Set validity to true if both conditions are met
    }
  }, []);


  const handleWishlistToggle = async () => {
    try {
      // Toggle wishlist state
      const newWishlistStatus = !isWishlisted;
      setIsWishlisted(newWishlistStatus);

      if (newWishlistStatus) {
        await addToFoodVenueWishlist(foodVenue._id, user.token); // Assume this is your API call
      } else {
        await removeFromFoodVenueWishlist(foodVenue._id, user.token); // Assume this is your API call
      }
    } catch (error) {
      console.error('Error updating wishlist', error);
    }
  };

  return (
    <div className='profile_picture_wrapper' style={{ padding: '0 4rem' }}>
      {/* {visible && validityToEditFoodVenue && <EditPlaceInfo setVisible={setVisible} id={foodVenue._id} user={user} setFoodVenue={setFoodVenue}/>} */}
      {visible && <EditPlaceInfo setVisible={setVisible} id={foodVenue._id} user={user} setFoodVenue={setFoodVenue}/>}
      <div className='profile_picture_left'>
        <div className='profile_picture'>
          <div
            className='profile_picture_bg'
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${foodVenue?.picture || 'https://cdn.pixabay.com/photo/2016/02/09/05/29/simply-1188338_1280.jpg'})`,
            }}
          ></div>
        </div>
        <div className='profile_col'>
          <div className='place_profile'>
            <span className='place_profile_name'>{foodVenue?.name}</span>
            <span>
              <div className='place-ratings'>
                <StarRating rating={foodVenue?.rating} />
                <span className='rating-text' style={{ marginRight: '10px' }}>
                  {foodVenue?.rating}
                </span>
                {/* <span className='rating-text'>{`(${reviewCount})`}</span> */}
                <span className='price-level'>{foodVenue?.priceRange}</span>
              </div>
            </span>
            <div className='badge_category_container source-sans-3-bold'>
              {foodVenue && foodVenue?.category?.length > 0 && foodVenue.category.map((c) => (
                <span className='badge_category' key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className='profile_picture_right'
        style={{ gap: '15px', position: 'relative', top: '20px' }}
      >
        {/* {validityToEditFoodVenue && <Tooltip title='Edit Information'> */}
          {<Tooltip title='Edit Information'>
          <IconButton aria-label='edit' sx={{ border: '1px solid gray' }} onClick={() => setVisible(true)}>
            <CIcon icon={cilColorBorder} className='icon_size_20' />
          </IconButton>
        </Tooltip>}
        <Tooltip title='Save Wishlist Place'>
          <IconButton aria-label='save'
            sx={{
              border: '1px solid gray',
              backgroundColor: isWishlisted ? '#30BFBF' : 'white',
              transition: 'background-color 0.3s ease',
            }}
            onClick={handleWishlistToggle}>
            <CIcon icon={cilBookmark} className='icon_size_20' />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
