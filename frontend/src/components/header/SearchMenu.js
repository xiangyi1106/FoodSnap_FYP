import React, { useRef, useState } from 'react'
import useClickOutside from "../../helpers/clickOutside";

export default function SearchMenu( {setIsShowMenu, searchRef}) {
    
    const searchMenu = useRef(null);
    // useClickOutside(searchMenu, () => {setIsShowMenu(false)});
    useClickOutside(searchMenu, [searchRef], () => setIsShowMenu(false));
    
    return (
        <div className="header_middle search_area scrollbar" ref={searchMenu}>
            <div className="search_history_header">
                <span>Recent Searches</span>
                <a>Clear All</a>
            </div>
            <div className="search_history"></div>
            <div className="search_result scrollbar"></div>
        </div>

    )
}
