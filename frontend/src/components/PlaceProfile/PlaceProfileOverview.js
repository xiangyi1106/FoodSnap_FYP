import React from 'react'
import PlaceProfileOverviewInfoLeftPart from './PlaceProfileOverviewInfo/PlaceProfileOverviewInfoLeftPart';
import PlaceProfileOverviewInfoRightPart from './PlaceProfileOverviewInfo/PlaceProfileOverviewInfoRightPart';
import { useOutletContext } from 'react-router-dom';

export default function PlaceProfileOverview() {
    const { foodVenue } = useOutletContext(); // Fetch the user profile data from context
    return (
        <div className="profile_grid" style={{ gap: '40px' }}>
            <div className="profile_left">
                <PlaceProfileOverviewInfoLeftPart
                    foodVenue={foodVenue}
                />
            </div>
            <div className="profile_right">
                <PlaceProfileOverviewInfoRightPart foodVenue={foodVenue}/>
            </div>
        </div>
    )
}
