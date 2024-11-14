import React, { memo } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ColorToggleButton = memo(({ value, onChange, valueKey }) => {
  return (
    <ToggleButtonGroup
      color="success"
      value={value}
      exclusive
      onChange={onChange}
      aria-label={valueKey}
    >
      <ToggleButton value="Yes">Yes</ToggleButton>
      <ToggleButton value="NoInfo">No Info</ToggleButton>
      <ToggleButton value="No">No</ToggleButton>
    </ToggleButtonGroup>
  );
});


export default ColorToggleButton;
