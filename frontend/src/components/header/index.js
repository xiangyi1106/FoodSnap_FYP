import "./style.css";
import { Link } from "react-router-dom";
import { Notifications, Search } from "../../svg";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchMenu from "./SearchMenu";
import { useRef, useState, useMemo } from "react";
import UserMenu from "./UserMenu";
import { useSelector } from "react-redux";
import CIcon from '@coreui/icons-react';
import { cilSearch, cilBell } from '@coreui/icons';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import Tooltip from '@mui/material/Tooltip';
import AddEvent from "../../pages/foodEvent/addEvent/addEvent";
import AddPromotion from "../../pages/foodPromotion/AddPromotion/AddPromotion";
import SearchBar from "./SearchBar";

export default function Header({ setVisible, visible, page, currentPath }) {
    const userSelector = (state) => state.user;
    const user = useSelector(userSelector);
  
    // Memoize the selector function
    const memoizedUserSelector = useMemo(() => userSelector, []);

    // const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowUserMenu, setIsShowUserMenu] = useState(false);

    // const searchInput = useRef(null);
    // const searchRef = useRef(null);

    const handleProfileLinkClick = () => {
        setIsShowUserMenu((prev) => !prev);
    };

    const profileLinkRef = useRef(null);

    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [isCreatePromotionVisible, setIsCreatePromotionVisible] = useState(false);

    // const [searchTerm, setSearchTerm] = useState("");

    return (
        <header>
            <div className="header_left">
                <Link to="/" className="">
                    <div className="header_logo">
                        <svg width="0" height="0">
                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                <stop stopColor="rgb(43, 192, 228)" offset="0%" />
                                <stop stopColor="rgb(234, 236, 198)" offset="100%" />
                            </linearGradient>
                        </svg>
                        <PhotoCameraIcon style={{ fontSize: "larger", marginRight: "6px", fill: "url(#blue-gradient)" }} className="logo_icon icon_size_28" ></PhotoCameraIcon>
                        <h4 className="fw-bold text-uppercase logo_color logo_name">FoodSnap</h4>
                    </div>
                </Link>
            </div>
            <div className="header_middle">
                {/* <div className="search search1" ref={searchRef} onClick={() => { setIsShowMenu(true); searchInput.current.focus(); }}>
                    <input type="text" placeholder="Search" className="hide_input" ref={searchInput}></input>
                    <button type="submit" className="search_button"> <CIcon icon={cilSearch} className="icon_size_18" /></button>
                </div>
                {isShowMenu && <SearchMenu setIsShowMenu={setIsShowMenu} searchRef={searchRef} />} */}
                <SearchBar user={user} />
            </div>
            <div className="header_right">
                {currentPath === "/" && <Tooltip title="Create Post"><MDBBtn outline href='#' className="btn_create_post" onClick={() => setVisible(true)}>
                    <span>Create Post</span> <MDBIcon className="btn_create_post_icon ml-2" fas icon="plus-circle" /> 
                </MDBBtn></Tooltip>}
                {currentPath === "/foodEvent" && <Tooltip title="Create Event"><MDBBtn outline href='#' className="btn_create_post" onClick={() => setIsCreateFormVisible(true)}>
                    <span>Create Event</span> <MDBIcon className="btn_create_post_icon ml-2" fas icon="plus-circle" /> 
                </MDBBtn></Tooltip>}
                {currentPath === "/foodPromotion" && user.role === 'user' && <Tooltip title="Create Promotion"><MDBBtn outline href='#' className="btn_create_post" onClick={() => setIsCreatePromotionVisible(true)}>
                    <span>Create Promotion</span> <MDBIcon className="btn_create_post_icon ml-2" fas icon="plus-circle" /> 
                </MDBBtn></Tooltip>}
                <div className="circle_icon hover_color">
                    <CIcon icon={cilBell} className="icon_size_22" style={{ position: "relative" }} />
                    {/* <NotificationsIcon className="icon_size_20" style={{ position: "relative" }} /> */}
                    <div className="notification_number">10</div>
                    {/* <MDBBadge color='danger' notification pill>1</MDBBadge> */}
                </div>
                <Link className="profile_link hover1" onClick={handleProfileLinkClick} ref={profileLinkRef}>
                    <img src={user?.picture} alt="profile-picture"></img>
                    {/* <span>Username <ExpandMoreIcon style={{}} className="user_dropdown_icon icon_size_20"/></span> */}
                </Link>
                {isShowUserMenu && <UserMenu setIsShowUserMenu={setIsShowUserMenu} profileLinkRef={profileLinkRef} user={user} />}
                {isCreateFormVisible && <AddEvent setIsCreateFormVisible={setIsCreateFormVisible} user={user}/>}
                {isCreatePromotionVisible && <AddPromotion setIsCreatePromotionVisible={setIsCreatePromotionVisible} user={user}/>}
            </div>
        </header>
    )
}
