import React, { useState } from 'react';
import { IconButton, Typography, Box, MenuItem, Select } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dayjs from 'dayjs';

export default function CustomCalendarHeader({setSelectedMonth, setSelectedYear}) {
    const [currentDate, setCurrentDate] = useState(dayjs());

    const handlePrevMonth = () => {
        const minDate = dayjs().year(2024).month(0); // January 2024

        // Prevent going before January 2024
        if (currentDate.isSame(minDate, 'month')) {
            return; // Do nothing if already January 2024
        }

        const newDate = currentDate.subtract(1, 'month');
        setCurrentDate(newDate);
        setSelectedMonth(newDate.month());
        setSelectedYear(newDate.year());
    };

    const handleNextMonth = () => {
        const newDate = currentDate.add(1, 'month');
        setCurrentDate(newDate);
        setSelectedMonth(newDate.month());
        setSelectedYear(newDate.year());

    };

    const handleMonthChange = (event) => {
        const newMonth = event.target.value;
        setCurrentDate(currentDate.month(newMonth));
        setSelectedMonth(newMonth);
    };

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setCurrentDate(currentDate.year(newYear));
        setSelectedYear(newYear);
    };

    // Manually create an array of month names
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Create a static array of years
    const startYear = 2024;
    const endYear = 2044;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <IconButton onClick={handlePrevMonth} disabled={currentDate.isSame(dayjs().year(2024).month(0), 'month')}>
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
