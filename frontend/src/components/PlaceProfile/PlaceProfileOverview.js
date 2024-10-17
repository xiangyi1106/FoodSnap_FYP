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
                {/* <PlaceProfileOverviewInfoRight /> */}
                <PlaceProfileOverviewInfoRightPart
                    telephone="0127127492"
                    website="https://www.tribus.com"
                    address="28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor"
                    openingHours={[
                        { day: 'Mon', time: '11:30 AM - 12:30 AM' },
                        { day: 'Tue', time: '11:30 AM - 12:30 AM' },
                        { day: 'Wed', time: '11:30 AM - 12:30 AM' },
                        { day: 'Thu', time: '11:30 AM - 12:30 AM' },
                        { day: 'Fri', time: '11:30 AM - 12:30 AM' },
                        { day: 'Sat', time: '11:30 AM - 12:30 AM' },
                        { day: 'Sun', time: '11:30 AM - 12:30 AM' },
                    ]}
                />
            </div>
        </div>
    )
}
