import React from 'react'
import PlaceProfileOverviewInfoLeft from './PlaceProfileOverviewInfoLeft'
import PlaceProfileOverviewInfoRight from './PlaceProfileOverviewInfoRight'
import PlaceProfileOverviewInfoLeftPart from './PlaceProfileOverviewInfo/PlaceProfileOverviewInfoLeftPart';
import PlaceProfileOverviewInfoRightPart from './PlaceProfileOverviewInfo/PlaceProfileOverviewInfoRightPart';

export default function PlaceProfileOverview() {
    const otherInfoData = [
        { status: 'yes', text: 'Halal Options' },
        { status: 'yes', text: 'Vegetarian Options' },
        { status: 'yes', text: 'Air Conditioning' },
        { status: 'no', text: 'Alcoholic Drinks' },
        { status: 'yes', text: 'Wheelchair Accessible' },
        { status: 'noInfo', text: 'Dogs Allowed' }, // This won't be displayed
        { status: 'yes', text: 'Accepts Credit Cards' },
        { status: 'yes', text: '10% Service Charge' },
        { status: 'no', text: 'Needs Reservations' },
    ];

    const hoursData = [
        { day: 'Mon', time: '2:00 PM - 10:00 PM' },
        { day: 'Tue', time: '2:00 PM - 10:00 PM' },
        { day: 'Wed', time: '2:00 PM - 10:00 PM' },
        { day: 'Thu', time: '2:00 PM - 10:00 PM' },
        { day: 'Fri', time: '2:00 PM - 10:00 PM' },
        { day: 'Sat', time: '2:00 PM - 10:00 PM' },
        { day: 'Sun', time: '2:00 PM - 10:00 PM' },
    ];

    return (
        <div className="profile_grid" style={{ gap: '40px' }}>
            <div className="profile_left">
                {/* <PlaceProfileOverviewInfoLeft /> */}
                <PlaceProfileOverviewInfoLeftPart
                    aboutText="The Tribus is a rare discovery within the labyrinth of Johor Bahru’s food culture that showcases a good mix of Western, Mediterranean and Mexican fare."
                    signatureDishesText="Italian, Mexican, Bar, Grill, Malaysian"
                    otherInfo={otherInfoData}
                />
            </div>
            <div className="profile_right">
                <PlaceProfileOverviewInfoRight />
                {/* <PlaceProfileOverviewInfoRightPart
                    telephone="0127127492"
                    website="www.tribus.com"
                    address="28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor"
                    hours={hoursData}
                /> */}
            </div>
        </div>
    )
}
