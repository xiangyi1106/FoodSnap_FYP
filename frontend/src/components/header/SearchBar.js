import React, { useState, useRef } from "react";
import SearchMenu from "./SearchMenu"; // Import your SearchMenu component
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";
import { getSearchHistory, saveSearchTermAndHistory, search } from "../../functions/user";
import { useNavigate } from "react-router-dom";
import { saveRestaurantData } from "../../functions/foodVenue";
import { foodVenues } from "../../data/foodVenue";

const SearchBar = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isShowMenu, setIsShowMenu] = useState(false);
    const searchInput = useRef(null);
    const searchRef = useRef(null);
    const [results, setResults] = useState([]);
    const searchHandler = async (e) => {
        if (searchTerm === "") {
            // setResults([]);
            setResults("");

        } else {
            const res = await search(searchTerm, user.token);
            setResults(res);
            console.log(res);
            if (e.key === 'Enter') {
                performSearch();
            }
        }
    };

    // const searchHandler = async () => {
    //     if (searchTerm === "") {
    //         // setResults([]);
    //         setResults('');
    //     } else {
    //         const res = await search(searchTerm, user.token);
    //         console.log(res);
    //         // Ensure `res` is an array before mapping, or set it as an empty array if not.
    //         const formattedResults = Array.isArray(res)
    //             ? res.map((item) => ({
    //                 ...item,
    //                 type: item.username ? "user" : "searchTerm",
    //             }))
    //             : [];

    //         setResults(formattedResults);
    //         console.log(formattedResults);
    //     }
    // };

    // const getHistory = async () => {
    //     const res = await getSearchHistory(user.token);
    //     // setSearchHistory(res);
    //     setSearchHistory([...res]);
    //     console.log("searchhistory", res);
    // };
    const navigate = useNavigate();

    const performSearch = async () => {
        if (searchTerm !== "") {
            const res = await saveSearchTermAndHistory(searchTerm, user.token);
            navigate(`/searchResult/${searchTerm}`);
            setIsShowMenu(false);
        }
        // console.log("foodVenues", foodVenues);
        // const response = await saveRestaurantData(foodVenues, user.token);
        // console.log(response);
    };

    const handleSearchButtonClick = () => {
        performSearch();
    };

    return (
        <div>
            <div ref={searchRef} className="search search1" onClick={() => { setIsShowMenu(true) }} >
                <input
                    type="text"
                    placeholder="Search"
                    className="hide_input"
                    ref={searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyUp={searchHandler}
                />
                <button type="button" className="search_button" onClick={handleSearchButtonClick}>
                    <CIcon icon={cilSearch} className="icon_size_18" />
                </button>
            </div>
            {isShowMenu && <SearchMenu setIsShowMenu={setIsShowMenu} searchRef={searchRef} results={results} user={user} setSearchTerm={setSearchTerm} />}
        </div>
    );
};

export default SearchBar;
