import { ImageList } from '@mui/material'
import React from 'react'
import MasonryImageList from './ImageList'
import { useOutletContext } from 'react-router-dom';

export default function PlaceProfilePhotos({user}) {
  const { foodVenue } = useOutletContext(); // Fetch the user profile data from context
  return (
    <div className='place_profile_photos'>
        <MasonryImageList user={user} foodVenue={foodVenue}/>
    </div>
  )
}
