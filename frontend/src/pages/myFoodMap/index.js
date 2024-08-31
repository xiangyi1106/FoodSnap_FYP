import * as React from 'react';
import "./style.css";
import SearchBox from '../../components/searchVenue/SearchBox';
import MyMap from '../../components/myFoodMap/myFoodMap';
import MyFoodMapContainer from '../../components/myFoodMap/MyFoodMapContainer';
import Map from '../../components/searchVenue/Map';
import VisitedPlaceGrid from '../VisitedPlace';
export default function MyFoodMap() {
    const locations = [
        [51.505, -0.09],
        [52.52, 13.405],
        [48.8566, 2.3522]
    ];
    const addresses = [
        "28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor",
        "28, Jalan Anggerik 2/4, Taman Anggerik, 81200 Johor Bahru, Johor",
    ];

    const visits = [1, 3, 15, 23, 29]; // Example visited days in the month
    return (
        <div className='search_venue'>
            <div className='map'>
                <Map addresses={addresses} />
                {/* <VisitedPlaceGrid year={2024} month={8} visits={visits} /> */}
            </div>
            <div className='search_box'>
                <MyFoodMapContainer />
            </div>
        </div>
    );
}
