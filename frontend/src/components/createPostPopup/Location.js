import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilLocationPin, cilX } from '@coreui/icons';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
};


export default function Location({ setPage, searchText, setSearchText, listPlace, setListPlace, setLocation, setLocationList, activeButtons, handleButtonClick, isLoading, setIsLoading }) {

    // // Function to handle search
    // const handleSearch = (e) => {
    //     setIsLoading(true);
    //     setSearchText(e.target.value);
    //     // // Search
    //     const params = {
    //         q: e.target.value,
    //         format: "json",
    //         addressdetails: 1,
    //         polygon_geojson: 0,
    //     };
    //     const queryString = new URLSearchParams(params).toString();
    //     const requestOptions = {
    //         method: "GET",
    //         redirect: "follow",
    //     };
    //     fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
    //         .then((response) => response.text())
    //         .then((result) => {
    //             setListPlace(JSON.parse(result));
    //             setIsLoading(false);
    //         })
    //         .catch((err) => { console.log("err: ", err); setIsLoading(false); });
    // };
    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((value) => {
            setIsLoading(true);
            const params = {
                q: value,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
            };
            const queryString = new URLSearchParams(params).toString();
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.json()) // parse JSON directly
                .then((result) => {
                    setListPlace(result);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching data: ", err);
                    setIsLoading(false);
                });
        }, 500), // Adjust the delay as needed
        []
    );

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleItemClick = (index) => {
        // Copy the list of places
        const newList = [...listPlace];
        // Move the clicked item to the top
        const selectedItem = newList.splice(index, 1)[0];
        newList.unshift(selectedItem);
        // Update the list of places
        setListPlace(newList);
        // Set the searchText and location based on the clicked item
        setSearchText(selectedItem.name);
        // setLocation(selectedItem.name);
        // Construct the location data object to send to the backend
        setLocation({
            place_id: selectedItem.place_id,
            name: selectedItem.name,
            displayName: selectedItem.display_name,
            address: selectedItem.address,
            latitude: selectedItem.lat,
            longitude: selectedItem.lon,
            license: selectedItem.licence // Make sure this matches the property name in your schema
        });
        setLocationList(newList);
        // !activeButtons.has("location") && handleButtonClick("location");
        setPage(0);
    };
    return (
        <div style={{ height: "400px" }}>
            <div className="create_post_popup_header" style={{ justifyContent: "center" }}>
                <div><CIcon icon={cilArrowLeft} className="icon_size_22 icon_button exit_icon_left" onClick={() => setPage(0)} /></div>
                <span className="create_post_popup_header_title" style={{ textAlign: "center" }}>Select Location</span>
            </div>
            <div className='location_input'>
                <div className="search search1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input id="searchLocation" autoFocus={true} type="text" placeholder="Where are you?" className="hide_input" onChange={handleSearch} value={searchText}></input>
                    {/* <CIcon icon={cilX} className="icon_size_18" onClick={() => { setLocation(""); setLocationList(""); setSearchText(''); handleButtonClick("location") }} /> */}
                    <CIcon icon={cilX} className="icon_size_18" onClick={() => { setLocation(null); setLocationList(""); setSearchText(''); }} />
                </div>
            </div>
            {isLoading && <div className='middle' style={{ height: "260px" }}> <CircularProgress className='logo_color_text' /></div>}
            {/* Render search results */}
            {!isLoading && <div className='location_list'>
                <List component="nav" aria-label="main mailbox folders">
                    {listPlace.map((item, index) => {
                        return (
                            <div key={item?.place_id}>
                                <ListItem
                                    button
                                    onClick={() => handleItemClick(index)}
                                >
                                    <ListItemIcon>
                                        <CIcon icon={cilLocationPin} className="icon_size_22 icon_button" />
                                    </ListItemIcon>
                                    <ListItemText primary={item?.name} secondary={item?.display_name} />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
                </List>
            </div>}
        </div>
    )
}
