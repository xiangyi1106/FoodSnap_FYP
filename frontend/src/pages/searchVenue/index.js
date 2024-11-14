import React, { useEffect, useState } from 'react'
import "./style.css";
import Map from '../../components/searchVenue/Map';
import SearchBox from '../../components/searchVenue/SearchBox';
import ChangeLocationModal from '../../components/searchVenue/ChangeLocationModal';
import { getFoodVenueData } from '../../functions/foodVenue';
export default function SearchVenue({user}) {
    // Usage example
    const addresses = [
        "28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor",
        "28, Jalan Anggerik 2/4, Taman Anggerik, 81200 Johor Bahru, Johor",
        "32, Jalan Flora 1/10, Taman Pulai Flora, 81110 Skudai, Johor",
        // '45, Jalan Pulai Perdana 11, Taman Sri Pulai, 81300 Skudai, Johor'
    ];

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(localStorage.getItem('currentLocation') || '');
    const [foodVenues, setFoodVenues] = useState([]);
    const [error, setError] = useState("");

    const getFoodVenuesList = async () => {
        const response = await getFoodVenueData(selected, user.token);
        if (response.notFound) {
            // Handle the "No food venues found" message
            console.log(response.message); // or set a state to show the message in your UI
            setError(response.message); // Example: set it in a state variable called `error`
            setFoodVenues([]); // Clear any previous food venues if desired
        } else {
            setFoodVenues(response);
            setError(null); // Clear any previous error message
        }
    };

    useEffect(()=>{
        getFoodVenuesList();
    }, [])

    useEffect(()=>{
        getFoodVenuesList();
    }, [selected])

    return (
        <div className='search_venue'>
            <div className='map'>
                <Map addresses={addresses} selected={selected}/>
            </div>
            <div className='search_box'>
                <SearchBox setVisible={setVisible} user={user} foodVenues={foodVenues} error={error} />
            </div>
            {visible && <ChangeLocationModal setVisible={setVisible} visible={visible} setSelected={setSelected} selected={selected} />}
        </div>
    );
}
