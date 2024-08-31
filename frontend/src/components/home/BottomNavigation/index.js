import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Paper } from '@mui/material';
import CIcon from '@coreui/icons-react';
import { cilHome, cilFastfood, cilCompass, cilNewspaper, cilUser, cilMap, cilSearch, cilBullhorn, cilCalendar } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';

export default function MobileBottomNavigation() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          '& .Mui-selected': {
            color: '#30BFBF', // Change color of selected icon and label
          },
          '& .Mui-selected .MuiBottomNavigationAction-label': {
            color: '#30BFBF', // Ensure the label is also colored
          },
          '& .Mui-selected .MuiSvgIcon-root': {
            color: '#30BFBF', // Change color of the selected icon
          },
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<CIcon icon={cilHome} className="icon_size_20" onClick={() => navigate('/')}/>} />
        <BottomNavigationAction label="Discover" icon={<CIcon icon={cilCompass} className="icon_size_20" />} onClick={() => navigate('/discover')} />
        <BottomNavigationAction label="Nearby" icon={<CIcon icon={cilSearch} className="icon_size_20" />} onClick={() => navigate('/searchVenue')} />
        <BottomNavigationAction label="Event" icon={<CIcon icon={cilCalendar} className="icon_size_20" />} onClick={() => navigate('/foodEvent')} />
        <BottomNavigationAction label="Promotion" icon={<CIcon icon={cilBullhorn} className="icon_size_20" onClick={() => navigate('/foodPromotion')} />} />
      </BottomNavigation>
    </Paper>
  );
}
