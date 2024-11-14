import React, { useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const labelMap = {
  'Halal Options': 'halalOptions',
  'Accepts Credit Cards': 'acceptsCreditCards',
  'Accepts Debit Cards': 'acceptsDebitCards',
  'Air Conditioning': 'airConditioning',
  'Alcoholic Drinks': 'alcoholicDrinks',
  'Dogs Allowed': 'dogsAllowed',
  'Needs Reservations': 'needsReservations',
  'Offers Takeout': 'offersTakeout',
  'Vegetarian Options': 'vegetarianOptions',
  'Wheelchair Accessible': 'wheelchairAccessible',
  'Free Wifi': 'wifi',
  'Accepts QR Payment': 'acceptsTNGBoostQRPayment'
};

const OtherInfoToggleButtons = ({ formData, setFormData }) => {
  const handleToggleChange = (key, value) => {
    // Update formData with new value for the selected option
    setFormData(prevData => ({
      ...prevData,
      otherInfo: {
        ...prevData.otherInfo,
        [key]: value
      }
    }));
  };

  return (
    <div>
      {Object.keys(labelMap).map((label) => {
        const dbKey = labelMap[label];
        const currentValue = formData.otherInfo?.[dbKey] || 'No Info';

        return (
          <div key={dbKey} style={{ marginBottom: '8px', display: 'flex'}}>
            <span style={{ minWidth: '180px', textAlign: 'right', paddingRight: '16px' }}>{label}: </span>
            <ToggleButtonGroup
              color="success"
              value={currentValue}
              exclusive
              onChange={(event, newValue) => handleToggleChange(dbKey, newValue)}
              aria-label={label}
            >
              <ToggleButton value="Yes">Yes</ToggleButton>
              <ToggleButton value="No Info">No Info</ToggleButton>
              <ToggleButton value="No">No</ToggleButton>
            </ToggleButtonGroup>
          </div>
        );
      })}
    </div>
  );
};

export default OtherInfoToggleButtons;
