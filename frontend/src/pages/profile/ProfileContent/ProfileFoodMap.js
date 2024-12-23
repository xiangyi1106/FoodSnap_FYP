import React from 'react'
import { useOutletContext } from 'react-router-dom';
import ProfileMap from './ProfileMap';

export default function ProfileFoodMap() {
    const { foodVenuesMap } = useOutletContext();

    // const addresses = [
    //     "28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor",
    //     "28, Jalan Anggerik 2/4, Taman Anggerik, 81200 Johor Bahru, Johor",
    // ];
    return (
        <div className='profile_card' style={{height: '600px'}}>
            <ProfileMap foodVenues={foodVenuesMap || []} />
        </div>
    )
}
