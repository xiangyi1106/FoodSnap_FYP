import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, IconButton, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/lab';
import johorBahruAreas from '../../data/johorBahruAreas';
import './Filter.css';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilBell } from '@coreui/icons';
import axios from 'axios';

// const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami']; // Example locations
const dates = ['Any Date', 'Today', 'Tomorrow', 'This Week', 'Next Week', 'This Month', 'Next Month']; // Example locations

export default function PromotionFilter({ onResults }) {
    const [keyword, setKeyword] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('none');
    const [startDate, setStartDate] = useState("Any Date");

    const handleFilter = async () => {
        console.log(keyword, selectedLocation, startDate);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/event/search`, {
                params: {
                    keyword,
                    location: selectedLocation,
                    startDate,
                },
            });
            // Send results back to the parent component
            onResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error searching events:', error);
        }
    };

    return (
        <div className="promotion-filter">
            <TextField
                label="Search keywords"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                variant="outlined"
                // style={{ marginRight: '16px', minWidth: '350px' }}
                style={{ marginRight: '16px', minWidth: '30%' }}
                className='filter_select'
                sx={{
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#30BFBF', // Change the label color when focused
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#30BFBF', // Focused border color
                        },
                    },
                }}
                // InputProps={{
                //     endAdornment: (
                //         <InputAdornment position="end">
                //             <IconButton  edge="end" style={{ color: '#30BFBF' }}>
                //                 <CIcon icon={cilSearch} className="icon_size_20" />
                //             </IconButton>
                //         </InputAdornment>
                //     ),
                // }}
            >
            </TextField>
            <FormControl>
                <InputLabel id="demo-simple-select-label"
                    sx={{
                        '&.Mui-focused': {
                            color: '#30BFBF', // Change the label color when focused
                        },
                    }}
                >Location</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={selectedLocation}
                    label="Location"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    MenuProps={{
                        disableScrollLock: true,
                        PaperProps: {
                            style: {
                                maxHeight: 250, // Set your desired height here
                            },
                        },
                    }}
                    style={{ marginRight: '16px', minWidth: '200px' }}
                    className='filter_select'
                    sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#30BFBF', // Change the outline color when focused
                        },
                    }}

                >
                    <MenuItem value="none">Any Location</MenuItem>
                    {johorBahruAreas.map((location) => (
                        <MenuItem key={location} value={location}>
                            {location}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label"
                    sx={{
                        '&.Mui-focused': {
                            color: '#30BFBF', // Change the label color when focused
                        },
                    }}
                >Date</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={startDate}
                    label="Date"
                    onChange={(e) => setStartDate(e.target.value)}
                    MenuProps={{ disableScrollLock: true }}
                    style={{ marginRight: '16px', minWidth: '200px' }}
                    className='filter_select'
                    sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#30BFBF', // Change the outline color when focused
                        },
                    }}
                >
                    {dates.map((date) => (
                        <MenuItem key={date} value={date}>
                            {date}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" style={{ backgroundColor: '#30BFBF' }} onClick={handleFilter}>
                Search
            </Button>
        </div>
    );
}
