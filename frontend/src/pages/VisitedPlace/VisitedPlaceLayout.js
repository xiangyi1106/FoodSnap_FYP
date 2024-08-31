import React from 'react'
import VisitedPlaceGrid from '.'
import Book from './JourneyBook';
import VisitedPlaceCard from './VisitedPlaceCard';
import GameProfileCard from './GameProfileCard';
import MonthYearPicker from './MonthYearPicker';
import CustomCalendarHeader from './CustomCalendarHeader';

export default function VisitedPlaceLayout() {
    const visits = [1, 4, 24, 28];
    return (
        <div className='search_venue'>
            <div className='map' style={{height: '100vh'}}>
                {/* <Map addresses={addresses} /> */}
                <div className='month_selector source-sans-3-bold'>
                    {/* <MonthYearPicker /> */}
                    <CustomCalendarHeader />
                </div>
                <VisitedPlaceGrid year={2024} month={8} visits={visits} />
            </div>
            <div className='search_box' style={{ overflowY: 'scroll' }}>
                <div className='food_journey_info'>
                    <div className="page__content">
                        <h1 className="page__content-book-title">Amy's Food Journey</h1>
                        <p className="page__content-author">28 August 2024</p>
                        {/* <p className="page__content-author">Click on the date to see the details</p> */}
                        <p className="page__content-credits">Add a new food journey by creating a post with location tag!</p>
                    </div>
                    {/* <VisitedPlaceCard
                    date="2021-03-30"
                    title="Duis autem vel eum iriure dolor in hend in vulputate"
                /> */}
                    <VisitedPlaceCard
                    imageUrl="https://images.deliveryhero.io/image/fd-my/LH/vxnp-listing.jpg"
                    date="11:20"
                    title="I just had the most amazing experience at Half Sugar Desserts Cafe"
                />

                    {/* Achievement like game profile record how many place visited */}
                    {/* <div className='game_profile_card_wrapper'>
                        <GameProfileCard />
                    </div> */}
                </div>

            </div>
        </div>
    )
}
