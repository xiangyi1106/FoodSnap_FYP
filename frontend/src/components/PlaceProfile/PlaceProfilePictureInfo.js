import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from '../searchVenue/StarRating';
import { IconButton, Tooltip } from '@mui/material';
import CIcon from '@coreui/icons-react';
import { cilColorBorder, cilBookmark } from '@coreui/icons';
import EditPlaceInfo from './EditPlaceInfo';

export default function PlaceProfilePictureInfo({
  imageUrl,
  placeName,
  rating,
  reviewCount,
  priceLevel,
  categories,
  // setVisible,
  // visible,
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className='profile_picture_wrapper' style={{ padding: '0 4rem' }}>
      {visible && <EditPlaceInfo setVisible={setVisible} />}
      <div className='profile_picture_left'>
        <div className='profile_picture'>
          <div
            className='profile_picture_bg'
            style={{
              backgroundSize: 'cover',
              cursor: 'default',
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        </div>
        <div className='profile_col'>
          <div className='place_profile'>
            <span className='place_profile_name'>{placeName}</span>
            <span>
              <div className='place-ratings'>
                <StarRating rating={rating} />
                <span className='rating-text' style={{ marginRight: '10px' }}>
                  {rating}
                </span>
                <span className='rating-text'>{`(${reviewCount})`}</span>
                <span className='price-level'>{priceLevel}</span>
              </div>
            </span>
            <div className='badge_category_container source-sans-3-bold'>
              {categories.map((category) => (
                <span className='badge_category' key={category}>
                  {category}
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
        <Tooltip title='Edit Information'>
          <IconButton aria-label='edit' sx={{ border: '1px solid gray' }} onClick={() => setVisible(true)}>
            <CIcon icon={cilColorBorder} className='icon_size_20' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Save Wishlist Place'>
          <IconButton aria-label='save' sx={{ border: '1px solid gray' }}>
            <CIcon icon={cilBookmark} className='icon_size_20' />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
