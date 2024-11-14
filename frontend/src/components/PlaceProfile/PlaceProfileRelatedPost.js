import React from 'react'
import PostList from './PostList'
import { useOutletContext } from 'react-router-dom';

export default function PlaceProfileRelatedPost({user}) {
  const { foodVenue } = useOutletContext(); // Fetch the user profile data from context
  return (
    <div className='place_profile_photos'>
        <PostList user={user} foodVenue={foodVenue}/>
    </div>
  )
}
