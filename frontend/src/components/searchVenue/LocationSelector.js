import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export default function LocationSelector({ data, selected, setSelected }) {
  // Handle the change event
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="location-select-label">Location</InputLabel>
        <Select
          labelId="location-select-label"
          id="location-select"
          value={selected || ""}
          label="Location"
          onChange={handleChange}
        >
          {data.map((location, index) => (
            <MenuItem key={index} value={location}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
