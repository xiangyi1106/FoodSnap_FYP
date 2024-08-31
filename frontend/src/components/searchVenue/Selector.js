import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Selector({ data, selected, setSelected }) {

    // Map the data array to extract the country names
  const countryNames = data.map((country) => country.name);
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
  });
  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      filterOptions={filterOptions}
      options={countryNames}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Country" />}
    //   value={selected}
      onChange={(event, newValue) => {
        setSelected(newValue);
      }}
    />
  );
}

export default Selector;