import React, { useEffect, useState } from 'react'
import { CButton, CModalBody, CModalFooter, CModalHeader, CModalTitle, CModal } from '@coreui/react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import johorBahruAreas from '../../data/johorBahruAreas';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function ChangeLocationModal({ setVisible, visible, selected, setSelected }) {

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    
    return (
        <div className='modal-open'>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">Change Location</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div style={{ marginBottom: '20px' }}>
                        {/* <p className="text-teal-800 font-semibold">Country :</p> */}
                        <FormControl fullWidth>
                            <InputLabel id="country-select-label">Country</InputLabel>
                            <Select
                                labelId="country-select-label"
                                id="country-select"
                                value="Malaysia"
                                label="Country"
                                disabled
                            >
                                <MenuItem value="Malaysia">Malaysia</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <LocationSelector
                data={countryData}
                selected={country}
                setSelected={setCountry}
            /> */}
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        {/* <p className="text-teal-800 font-semibold">State :</p> */}
                        <FormControl fullWidth>
                            <InputLabel id="state-select-label">State</InputLabel>
                            <Select
                                labelId="state-select-label"
                                id="state-select"
                                value="Johor"
                                label="State"
                                disabled
                            >
                                <MenuItem value="Johor">Johor</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <LocationSelector
                data={stateData}
                selected={state}
                setSelected={setState}
            /> */}
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="city-select-label">City</InputLabel>
                            <Select
                                labelId="city-select-label"
                                id="city-select"
                                value={selected || ""}
                                label="city"
                                onChange={handleChange}
                                MenuProps={{ disableScrollLock: true }}
                            >
                                {/* <MenuItem value="currentLocation">
                                    <MyLocationIcon style={{ marginRight: '10px' }} /> Use Your Current Location
                                </MenuItem> */}
                                {johorBahruAreas.map((location, index) => (
                                    <MenuItem key={index} value={location}>
                                        {location}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* <p className="text-teal-800 font-semibold">City :</p> */}
                        {/* <LocationSelector data={cityData} selected={city} setSelected={setCity} /> */}
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary">Ok</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}
