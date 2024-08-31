import React from 'react'
import PostList from './PostList'
import PlaceProfilePostList from './PlaceProfilePostList'

export default function PlaceProfileRelatedPost({user}) {
  return (
    <div className='place_profile_photos'>
        <PostList />
        {/* <PlaceProfilePostList user={user}/> */}
    </div>
  )
}
