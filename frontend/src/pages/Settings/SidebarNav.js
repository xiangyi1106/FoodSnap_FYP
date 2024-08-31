import React from "react"
import PropTypes from "prop-types"
import './style.css'
import { Link, useLocation } from "react-router-dom"

function SidebarNav({ className, items, ...props }) {
    const location = useLocation();
    return (
        <nav
            className={`form_nav_flex form_nav_space_x_2 form_nav_lg_flex_col form_nav_lg_space_x_0 form_nav_lg_space_y_1 ${className}`}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    to={item.href}
                    className={`form_nav_button ${location.pathname === item.href ? "form_nav_bg_muted form_nav_hover_bg_muted" : "form_nav_hover_bg_transparent form_nav_hover_underline"} form_nav_justify_start`}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}

SidebarNav.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default SidebarNav
