import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from "@mui/material/styles";

export default function CenteredTabs({ tabs, currentTab, setCurrentTab }) {

  const StyledTab = styled(Tab)({
    "&.Mui-selected": {
      color: "#30BFBF"
    },
  });

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={currentTab}
        onChange={handleChange}
        centered
        className='logo_color_text'
      sx={{
        '& .MuiTabs-indicator': {
          backgroundColor: '#30BFBF', // Indicator color
        },
        '& .MuiTab-root': {
          color: '#000', // Default tab text color
          '&:hover': {
            color: '#005555', // Hover color for tabs
          },
        },
        '& .Mui-selected': {
          color: '#30BFBF', // Active tab text color
          '&:hover': {
            color: '#30BFBF', // Maintain the active color on hover
          },
        },
      }}
      >
        {tabs.map((tab, index) => (
          <StyledTab key={index} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
    </Box>
  );
}
