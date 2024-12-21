import "./style.css";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { cilHome, cilFastfood, cilCompass, cilNewspaper, cilUser, cilMap, cilSearch, cilBullhorn, cilCalendar, cilPlaylistAdd } from '@coreui/icons';
import { useState } from "react";

export default function LeftMenu({ page, setPage }) {
    const width1030 = useMediaQuery({
        query: "(max-width:1030px)"
    });

    // State to track the active menu item
    const [activeItem, setActiveItem] = useState("home");

    // Handler function to change the active item
    const handleMenuClick = (page) => {
        setActiveItem(page);
    };

    const location = useLocation();

    // Extract the current path to determine the active menu item
    const currentPath = location.pathname;

    return (
        <div className="left_menu">
            <Link className={`left_link ${currentPath === "/" ? "link_active" : ""}`} to="/" onClick={() => handleMenuClick("home")}>
                <CIcon icon={cilHome} className="icon_size_20 left_link_active" />
                <span>Home</span>
            </Link>
            <Link className={`left_link ${currentPath === "/discover" ? "link_active" : ""}`} to="/discover" onClick={() => handleMenuClick("discover")}>
                <CIcon icon={cilCompass} className="icon_size_20 left_link_active" />
                <span>Discover</span>
            </Link>
            <Link className={`left_link ${currentPath === "/searchVenue" ? "link_active" : ""}`} to="/searchVenue" onClick={() => handleMenuClick("searchVenue")}>
                <CIcon icon={cilSearch} className="icon_size_20 left_link_active" />
                <span>Search Food Venue</span>
            </Link>
            <Link className={`left_link ${currentPath === "/foodVenueWishlist" ? "link_active" : ""}`} to="/foodVenueWishlist" onClick={() => handleMenuClick("myWishlistVenue")}>
                <CIcon icon={cilPlaylistAdd} className="icon_size_20 left_link_active" />
                <span>Food Venue Wishlist</span>
            </Link>
            <Link className={`left_link ${currentPath === "/foodEvent" ? "link_active" : ""}`} to="/foodEvent" onClick={() => handleMenuClick("foodEvent")}>
                <CIcon icon={cilCalendar} className="icon_size_20 left_link_active" />
                <span>Food Event</span>
            </Link>
            <Link className={`left_link ${currentPath === "/foodPromotion" ? "link_active" : ""}`} to="/foodPromotion" onClick={() => handleMenuClick("foodPromotion")}>
                <CIcon icon={cilBullhorn} className="icon_size_20 left_link_active" />
                <span>Food Promotion</span>
            </Link>
            <Link className={`left_link ${currentPath === "/myFoodJourney" ? "link_active" : ""}`} to="/myFoodJourney" onClick={() => handleMenuClick("myFoodJourney")}>
                <CIcon icon={cilMap} className="icon_size_20 left_link_active" />
                <span>My Food Journey</span>
            </Link>
            {/* <Link className="left_link">
                <CIcon icon={cilUser} className="icon_size_20 left_link_active" />
                <span>Profile</span>
            </Link> */}
        </div>
    )
}
