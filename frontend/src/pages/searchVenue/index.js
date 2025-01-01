import React, { useEffect, useState } from 'react'
import "./style.css";
import Map from '../../components/searchVenue/Map';
import SearchBox from '../../components/searchVenue/SearchBox';
import ChangeLocationModal from '../../components/searchVenue/ChangeLocationModal';
import { getFoodVenueData } from '../../functions/foodVenue';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddPlaceInfo from '../../components/PlaceProfile/AddPlaceInfo';

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
    const [loading, setLoading] = useState(false);
    const [isAddFoodVenueOpen, setIsAddFoodVenueOpen] = useState(false);
    const [isAISearchVisible, setIsAISearchVisible] = useState(false);
    const [validityToCreateFoodVenue, setValidityToCreateFoodVenue] = useState(false);

    const getFoodVenuesList = async () => {
        const response = await getFoodVenueData(selected, user.token);
        if (response.notFound) {
            // Handle the "No food venues found" message
            console.log(response.message); // or set a state to show the message in your UI
            setError(response.message); // Example: set it in a state variable called `error`
            setFoodVenues([]); // Clear any previous food venues if desired
        } else {
            // setFoodVenues(response);
            setFoodVenues(Array.isArray(response) ? response : []);
            setError(null); // Clear any previous error message
        }
    };

    useEffect(()=>{
        setLoading(true);
        getFoodVenuesList();
        setLoading(false);
        if (user.role === 'business' && user.foodVenueOwned === null) {
            setValidityToCreateFoodVenue(true);  // Set validity to true if both conditions are met
          }
    }, [])


    useEffect(()=>{
        getFoodVenuesList();
        
    }, [selected])

    return (
        <div className='search_venue'>
            {isAddFoodVenueOpen && <AddPlaceInfo setVisible={setIsAddFoodVenueOpen} user={user}/>}
            <div className='map'>
                <Map addresses={addresses} selected={selected} foodVenues={foodVenues}/>
            </div>
            <div className='search_box'>
                <SearchBox setVisible={setVisible} user={user} foodVenues={foodVenues} error={error} setFoodVenues={setFoodVenues} isAISearchVisible={isAISearchVisible} setIsAISearchVisible={setIsAISearchVisible} loading={loading} setLoading={setLoading} />
            </div>
            {visible && <ChangeLocationModal setVisible={setVisible} visible={visible} setSelected={setSelected} selected={selected} />}
            {!isAddFoodVenueOpen && !isAISearchVisible && validityToCreateFoodVenue &&
            <Fab
                color="#30BFBF"
                aria-label="add"
                variant="extended"
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                }}
                onClick={() => setIsAddFoodVenueOpen(true)}
            >
                Create Food Venue <AddIcon />
            </Fab>}
        </div>
    );
}
