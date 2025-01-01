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
import { useMediaQuery } from "react-responsive";
import MobileNav from "../home/Navbar/MobileNav";
import { Badge } from "@mui/material";

export default function Header({ setVisible, visible, page, currentPath, profile }) {
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

    const width481 = useMediaQuery({
        query: "(max-width: 481px)"
    });

    return (
        <header>
            <div className="header_left">
                {(width481 || profile) && <MobileNav profile />}
                {!profile && <Link to="/" className="" style={{ display: width481 ? 'none' : 'block' }}>
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
                </Link>}
            </div>
            <div className="header_middle">
                {(currentPath === "/" || currentPath === "/discover") && <SearchBar user={user} />}
            </div>
            <div className="header_right">
                {currentPath === "/" && <Tooltip title="Create Post"><MDBBtn outline href='#' className="btn_create_post" onClick={() => setVisible(true)}>
                    <span>Create Post</span> <MDBIcon className="btn_create_post_icon ml-2" fas icon="plus-circle" />
                </MDBBtn></Tooltip>}
                <div className="circle_icon" ref={searchIconRef}>
                    <Badge badgeContent={notificationNumber} color='default'
                        sx={{
                            '.MuiBadge-standard': {
                                backgroundColor: '#30BFBF',  // Background color for badge
                                color: 'white'
                            },
                        }}
                        onClick={() => setIsShowNotifications(prev => !prev)}
                    >
                        {/* <MailIcon color="action" /> */}
                        <CIcon icon={cilBell} className="icon_size_22" style={{ position: "relative" }} />
                    </Badge>
                    {/* <CIcon icon={cilBell} className="icon_size_22 hover_color" style={{ position: "relative" }} onClick={() => setIsShowNotifications(prev => !prev)} /> */}
                    {/* {notificationNumber > 0 && <div className="notification_number">{notificationNumber}</div>} */}
                    {isShowNotifications && <Notification userId={user?.id} token={user?.token} setNotificationNumber={setNotificationNumber} setIsShowNotifications={setIsShowNotifications} searchIconRef={searchIconRef} notifications={notifications} setNotifications={setNotifications} />}
                </div>
                <Link className="profile_link hover1" onClick={handleProfileLinkClick} ref={profileLinkRef}>
                    <img src={user?.picture} alt="profile-picture"></img>
                </Link>
                {isShowUserMenu && <UserMenu setIsShowUserMenu={setIsShowUserMenu} profileLinkRef={profileLinkRef} user={user} />}
            </div>
        </header>
    )
}
