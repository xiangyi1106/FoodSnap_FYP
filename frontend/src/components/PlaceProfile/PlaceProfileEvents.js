import React from 'react'
import { useOutletContext } from 'react-router-dom';

export default function PlaceProfileEvents({user}) {
  const { foodVenue } = useOutletContext(); // Fetch the user profile data from context
  return (
    <div className='place_profile_photos'>
    </div>
  )
}
