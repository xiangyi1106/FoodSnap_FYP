import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

export default function MonthYearPicker() {
    // Initialize with the current date
    const [value, setValue] = React.useState(dayjs());
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                views={['year', 'month']}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                sx={{
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: 'none', fontFamily: 'Source Sans 3", sans-serif' },
                    '& .MuiInputBase-root .MuiOutlinedInput-root': { fontWeight: '500', fontFamily: 'Source Sans 3", sans-serif' },
                }}
            />
        </LocalizationProvider>
    );
}
