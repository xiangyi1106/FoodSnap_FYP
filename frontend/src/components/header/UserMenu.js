import { Link, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import React, { useRef } from 'react'
import useClickOutside from "../../helpers/clickOutside";

import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import CIcon from '@coreui/icons-react';
import {
  cilSettings
  , cilAccountLogout
  , cilX
} from '@coreui/icons';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,//62
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));


export default function UserMenu({ user, setIsShowUserMenu, profileLinkRef }) {
  const userMenu = useRef(null);
  useClickOutside(userMenu, [profileLinkRef], () => setIsShowUserMenu(false));

  const [isChecked, setIsChecked] = React.useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleItemClick = () => {
    setIsChecked(!isChecked);
    // Additional logic for handling item click
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",//Dispatches a "LOGOUT" action to the Redux store using dispatch. This action informs the userReducer to update the state by setting it to null.
    });
    navigate("/login");
  }

  const handleNavigate = () => {
    navigate('/settings'); // Change the path to the desired settings link
  };

  return (
    <div className="user_menu" ref={userMenu}>
      <Link to={`/profile/${user.username}`} className="user_menu_header">
        <img src={user?.picture} alt="profile-picture"></img>
        <div className="user_menu_col">
          <span>{user?.name}</span>
          <span>See your profile</span>
        </div>
      </Link>
      <div className="user_menu_item" onClick={handleNavigate}>
        {/* <SettingsIcon /> */}
        <CIcon icon={cilSettings} className="icon_size_20" />
        <span>Settings</span>
      </div>
      {/* <div className="user_menu_item" onClick={handleItemClick}>
                <div className='user_menu_left'>
                    <DarkModeIcon />
                    <span>Dark Mode</span>
                </div>
                <div className='user_menu_right'>
                    <div className=''>
                    <MaterialUISwitch sx={{ m: 1 }} checked={isChecked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }} />
                    </div>
                    
                </div>
            </div> */}
      <div className="user_menu_item" onClick={logout}>
        {/* <LogoutIcon /> */}
        <CIcon icon={cilAccountLogout} className="icon_size_18" />
        <span>Logout</span>
      </div>
    </div>
  )
}
