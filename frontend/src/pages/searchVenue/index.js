import * as React from 'react';
import "./style.css";
import Map from '../../components/searchVenue/Map';
import SearchBox from '../../components/searchVenue/SearchBox';
export default function SearchVenue() {
    // Usage example
    const addresses = [
        "28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor",
        "28, Jalan Anggerik 2/4, Taman Anggerik, 81200 Johor Bahru, Johor",
        "32, Jalan Flora 1/10, Taman Pulai Flora, 81110 Skudai, Johor",
        '45, Jalan Pulai Perdana 11, Taman Sri Pulai, 81300 Skudai, Johor'
    ];

    return (
        <div className='search_venue'>
            <div className='map'>
                <Map addresses={addresses}/>
            </div>
            <div className='search_box'>
                <SearchBox />
            </div>
        </div>
    );
}
