import React, { useState } from 'react'
import "./style.css";
import Map from '../../components/searchVenue/Map';
import SearchBox from '../../components/searchVenue/SearchBox';
import ChangeLocationModal from '../../components/searchVenue/ChangeLocationModal';
export default function SearchVenue() {
    // Usage example
    const addresses = [
        "28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor",
        "28, Jalan Anggerik 2/4, Taman Anggerik, 81200 Johor Bahru, Johor",
        "32, Jalan Flora 1/10, Taman Pulai Flora, 81110 Skudai, Johor",
        // '45, Jalan Pulai Perdana 11, Taman Sri Pulai, 81300 Skudai, Johor'
    ];

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(localStorage.getItem('currentLocation') || '');

    return (
        <div className='search_venue'>
            <div className='map'>
                <Map addresses={addresses} selected={selected}/>
            </div>
            <div className='search_box'>
                <SearchBox setVisible={setVisible} />
            </div>
            {visible && <ChangeLocationModal setVisible={setVisible} visible={visible} setSelected={setSelected} selected={selected} />}
        </div>
    );
}
