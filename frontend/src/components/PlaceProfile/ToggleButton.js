import React, { memo } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ColorToggleButton = memo(({ value, onChange }) => {
  return (
    <ToggleButtonGroup
      color="success"
      value={value}
      exclusive
      onChange={onChange}
      aria-label="Platform"
    >
      <ToggleButton value="yes">Yes</ToggleButton>
      <ToggleButton value="noInfo">No Info</ToggleButton>
      <ToggleButton value="no">No</ToggleButton>
    </ToggleButtonGroup>
  );
});

export default ColorToggleButton;
