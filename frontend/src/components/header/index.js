import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { Notifications, Search } from "../../svg";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchMenu from "./SearchMenu";
import { useRef, useState, useMemo, useEffect } from "react";
import UserMenu from "./UserMenu";
import { useDispatch, useSelector } from "react-redux";
import CIcon from '@coreui/icons-react';
import { cilSearch, cilBell } from '@coreui/icons';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import Tooltip from '@mui/material/Tooltip';
import AddEvent from "../../pages/foodEvent/addEvent/addEvent";
import AddPromotion from "../../pages/foodPromotion/AddPromotion/AddPromotion";
import SearchBar from "./SearchBar";
import Notification from "../Notification";
import { getNotifications } from "../../functions/user";

export default function Header({ setVisible, visible, page, currentPath }) {
    const userSelector = (state) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    // Memoize the selector function
    const memoizedUserSelector = useMemo(() => userSelector, []);

    // const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowUserMenu, setIsShowUserMenu] = useState(false);
    const [isShowNotifications, setIsShowNotifications] = useState(false);
    const searchIconRef = useRef(null);
    // const searchInput = useRef(null);
    // const searchRef = useRef(null);

    const handleProfileLinkClick = () => {
        setIsShowUserMenu((prev) => !prev);
    };

    const profileLinkRef = useRef(null);

    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [isCreatePromotionVisible, setIsCreatePromotionVisible] = useState(false);
    const [notificationNumber, setNotificationNumber] = useState(0);
    // const [searchTerm, setSearchTerm] = useState("");
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    // Flag to track if the redirection is already done
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (hasRedirected) return;
            try {
                const response = await getNotifications(user?.id, user?.token);
                // Make sure response is an array
                if (Array.isArray(response)) {
                    const filteredNotifications = response.filter(
                        (n) => n.fromUserId._id !== user?.id
                    );
                    setNotifications(filteredNotifications);
                    // Set the notification number to unread notifications count
                    const unreadCount = filteredNotifications.filter(n => !n.isRead).length;
                    setNotificationNumber(unreadCount);  // Set only unread notifications count
                } else {
                    console.warn('Unexpected response:', response);
                    setNotifications([]); // Set an empty array if response is invalid
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
                if (error.response && error.response.status === 401 && !hasRedirected) {
                    console.log("i am here");
                    setHasRedirected(true);
                    alert("Session timed out. Please log in again.");
                    dispatch({
                      type: "LOGOUT",
                    });
                    navigate("/login");
                    return;
                  }
                setNotifications([]); // Set an empty array on error
            }
        };
        fetchNotifications();
    }, [user?.id, user?.token]);

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
                {(currentPath === "/" || currentPath === "/discover") && <SearchBar user={user} />}
            </div>
            <div className="header_right">
                {currentPath === "/" && <Tooltip title="Create Post"><MDBBtn outline href='#' className="btn_create_post" onClick={() => setVisible(true)}>
                    <span>Create Post</span> <MDBIcon className="btn_create_post_icon ml-2" fas icon="plus-circle" />
                </MDBBtn></Tooltip>}
                {/* {currentPath === "/foodEvent" && <Tooltip title="Create Event"><MDBBtn outline href='#' className="btn_create_post" onClick={() => setIsCreateFormVisible(true)}>
                    <span>Create Event</span> <MDBIcon className="btn_create_post_icon ml-2" fas icon="plus-circle" /> 
                </MDBBtn></Tooltip>}
                {currentPath === "/foodPromotion" && user.role === 'user' && <Tooltip title="Create Promotion"><MDBBtn outline href='#' className="btn_create_post" onClick={() => setIsCreatePromotionVisible(true)}>
                    <span>Create Promotion</span> <MDBIcon className="btn_create_post_icon ml-2" fas icon="plus-circle" /> 
                </MDBBtn></Tooltip>} */}
                <div className="circle_icon" ref={searchIconRef}>
                    <CIcon icon={cilBell} className="icon_size_22 hover_color" style={{ position: "relative" }} onClick={() => setIsShowNotifications(prev => !prev)} />
                    {/* <NotificationsIcon className="icon_size_20" style={{ position: "relative" }} /> */}
                    {notificationNumber > 0 && <div className="notification_number">{notificationNumber}</div>}
                    {/* <MDBBadge color='danger' notification pill>1</MDBBadge> */}
                    {isShowNotifications && <Notification userId={user?.id} token={user?.token} setNotificationNumber={setNotificationNumber} setIsShowNotifications={setIsShowNotifications} searchIconRef={searchIconRef} notifications={notifications} setNotifications={setNotifications} />}
                </div>
                <Link className="profile_link hover1" onClick={handleProfileLinkClick} ref={profileLinkRef}>
                    <img src={user?.picture} alt="profile-picture"></img>
                    {/* <span>Username <ExpandMoreIcon style={{}} className="user_dropdown_icon icon_size_20"/></span> */}
                </Link>
                {isShowUserMenu && <UserMenu setIsShowUserMenu={setIsShowUserMenu} profileLinkRef={profileLinkRef} user={user} />}
                {/* {isCreateFormVisible && <AddEvent setIsCreateFormVisible={setIsCreateFormVisible} user={user} />} */}
                {/* {isCreatePromotionVisible && <AddPromotion setIsCreatePromotionVisible={setIsCreatePromotionVisible} user={user}/>} */}
            </div>
        </header>
    )
}
