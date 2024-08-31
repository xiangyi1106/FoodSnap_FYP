import React, { useState } from 'react';
import { IconButton, Typography, Box, MenuItem, Select } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dayjs from 'dayjs';

export default function CustomCalendarHeader() {
    const [currentDate, setCurrentDate] = useState(dayjs());

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    const handleMonthChange = (event) => {
        const newMonth = event.target.value;
        setCurrentDate(currentDate.month(newMonth));
    };

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setCurrentDate(currentDate.year(newYear));
    };

    // Manually create an array of month names
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Create an array of years around the current year
    //   const years = Array.from(new Array(21), (val, index) => currentDate.year() + index);

    // Create a static array of years
    const startYear = 2024;
    const endYear = 2044;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <IconButton onClick={handlePrevMonth}>
                <ArrowBack />
            </IconButton>

            <Box display="flex" alignItems="center">
                {/* Month Dropdown */}
                <Select
                    value={currentDate.month()}
                    onChange={handleMonthChange}
                    variant="outlined"
                    margin="dense"
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none', // Remove the border
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none', // Ensure the border remains removed when focused
                        },
                        '& .MuiSelect-icon': {
                            display: 'none', // Hide the dropdown icon
                        }
                    }}
                    MenuProps={{ disableScrollLock: true }}
                >
                    {months.map((month, index) => (
                        <MenuItem key={index} value={index}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>

                {/* Year Dropdown */}
                <Select
                    value={currentDate.year()}
                    onChange={handleYearChange}
                    variant="outlined"
                    margin="dense"
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none', // Remove the border
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none', // Ensure the border remains removed when focused
                        }, '& .MuiSelect-icon': {
                            display: 'none', // Hide the dropdown icon
                        }
                    }}
                    MenuProps={{ disableScrollLock: true }}
                >
                    {years.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <IconButton onClick={handleNextMonth}>
                <ArrowForward />
            </IconButton>
        </Box>
    );
}
