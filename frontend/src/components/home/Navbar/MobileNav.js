import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilHome, cilCompass, cilSearch, cilPlaylistAdd, cilCalendar, cilBullhorn, cilMap, cilHamburgerMenu } from '@coreui/icons';
import './MobileNav.css';

export default function MobileNav({ profile }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Toggle the mobile menu
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);  // Toggle the menu
        console.log(isMenuOpen);
    };

    const currentPath = location.pathname;

    return (
        <nav className="mobile_nav" style={{ display: profile ? 'block' : 'none' }}>
            {/* Hamburger Button */}
            <div className="hamburger_menu" onClick={toggleMenu}>
                {/* <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span> */}
                <CIcon icon={cilHamburgerMenu} className='icon_size_20'></CIcon>
            </div>

            {/* Navigation Links */}
            <div className={`mobile_menu ${isMenuOpen ? 'open' : ''}`}>
                <Link
                    className={`mobile_link ${currentPath === '/' ? 'mobile_link_active' : ''}`}
                    to="/"
                    onClick={toggleMenu}
                >
                    <CIcon icon={cilHome} className="icon_size_20"/>
                    <span>Home</span>
                </Link>
                <Link
                    className={`mobile_link ${currentPath === '/discover' ? 'mobile_link_active' : ''}`}
                    to="/discover"
                    onClick={toggleMenu}
                >
                    <CIcon icon={cilCompass} className="icon_size_20" />
                    <span>Discover</span>
                </Link>
                <Link
                    className={`mobile_link ${currentPath === '/searchVenue' ? 'mobile_link_active' : ''}`}
                    to="/searchVenue"
                    onClick={toggleMenu}
                >
                    <CIcon icon={cilSearch} className="icon_size_20" />
                    <span>Search Venue</span>
                </Link>
                <Link
                    className={`mobile_link ${currentPath === '/foodVenueWishlist' ? 'mobile_link_active' : ''}`}
                    to="/foodVenueWishlist"
                    onClick={toggleMenu}
                >
                    <CIcon icon={cilPlaylistAdd} className="icon_size_20" />
                    <span>Wishlist</span>
                </Link>
                <Link
                    className={`mobile_link ${currentPath === '/foodEvent' ? 'mobile_link_active' : ''}`}
                    to="/foodEvent"
                    onClick={toggleMenu}
                >
                    <CIcon icon={cilCalendar} className="icon_size_20" />
                    <span>Food Event</span>
                </Link>
                <Link
                    className={`mobile_link ${currentPath === '/foodPromotion' ? 'mobile_link_active' : ''}`}
                    to="/foodPromotion"
                    onClick={toggleMenu}
                >
                    <CIcon icon={cilBullhorn} className="icon_size_20" />
                    <span>Promotion</span>
                </Link>
                <Link
                    className={`mobile_link ${currentPath === '/myFoodJourney' ? 'mobile_link_active' : ''}`}
                    to="/myFoodJourney"
                    onClick={toggleMenu}
                >
                    <CIcon icon={cilMap} className="icon_size_20" />
                    <span>Food Journey</span>
                </Link>
            </div>
        </nav>
    );
}
