import React from 'react'
import { useOutletContext } from 'react-router-dom';
import ProfileMap from './ProfileMap';

export default function ProfileFoodMap() {
    const { foodVenuesMap } = useOutletContext();
    return (
        <div className='profile_card' style={{height: '600px'}}>
            <ProfileMap foodVenues={foodVenuesMap || []} />
        </div>
    )
}
