import React, { useEffect, useRef, useState } from 'react'
import useClickOutside from "../../helpers/clickOutside";
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { clearSearchHistory, getSearchHistory, removeFromSearch, saveSearchTermAndHistory } from '../../functions/user';

export default function SearchMenu({ setIsShowMenu, searchRef, results, user, setSearchTerm }) {

    const searchMenu = useRef(null);

    useClickOutside(searchMenu, [searchRef], () => setIsShowMenu(false));
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        getHistory();
    }, []);
    const getHistory = async () => {
        const res = await getSearchHistory(user.token);
        // setSearchHistory(res);
        setSearchHistory([...res]);
        console.log("searchhistory", res);
    };

    const navigate = useNavigate();

    const saveSearchTermAndHistoryHandler = async (term) => {
        const res = await saveSearchTermAndHistory(term, user.token);
        await getHistory();
        setIsShowMenu(false);
        setSearchTerm("");
        navigate(`/searchResult/${term}`);
    };
    const handleRemove = async (term) => {
        const res = await removeFromSearch(term, user.token);
        console.log("afterremove", res);
        // setSearchHistory([]);
        // await getHistory();
    };

    const handleClearAll = async () => {
        const res = await clearSearchHistory(user.token);
        console.log(res);
        getHistory(); // Refresh the search history to show it's cleared
    };
    

    return (
        <div className="header_middle search_area scrollbar" ref={searchMenu}>
            <div className="search_history_header">
                <span>Recent Searches</span>
                <a onClick={handleClearAll}>Clear All</a>
            </div>
            <div className="search_history scrollbar">
                {searchHistory &&
                    results == "" &&
                    searchHistory
                        .sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        })
                        .map((search) => (
                            <div
                                className="search_user_item hover_style_1"
                                onClick={() => saveSearchTermAndHistoryHandler(search.searchTerm)}
                                key={search._id}
                                style={{ width: '100%', padding: '5px 10px' }}

                            >
                                <CIcon icon={cilSearch} className="icon_size_18" />
                                <span> {search.searchTerm}</span>
                                {/* <i
                                    className="exit_icon"
                                    onClick={() => {
                                        handleRemove(search.searchTerm);
                                    }}
                                ></i> */}
                            </div>

                        ))}
            </div>
            {/* <div className="search_result scrollbar">
                {results &&
                    results.map((user) => (
                        <Link
                            to={`/profile/${user.username}`}
                            className="search_user_item hover1"
                            // onClick={() => addToSearchHistoryHandler(user._id)}
                            key={user._id}
                        >
                            <img src={user.picture} alt="" />
                            <span>
                                {user.name}
                            </span>
                        </Link>
                    ))}
            </div> */}
            <div className="search_result scrollbar">
                {results &&
                    results.map((result) => {
                        if (result.name) {
                            return (
                                <Link
                                    to={`/profile/${result.username}`}
                                    className="search_user_item hover_style_1"
                                    onClick={() => saveSearchTermAndHistoryHandler(result.name)}
                                    key={result._id}
                                    style={{ width: '100%', color: 'black', marginBottom: '3px' }}
                                >
                                    <img src={result.picture} alt="" />
                                    <span>{result.name}</span>
                                </Link>
                            );
                        } else if (result.term) {
                            return (
                                <div
                                    className="search_user_item hover_style_1"
                                    onClick={() => saveSearchTermAndHistoryHandler(result.term)}
                                    key={result.term}
                                    style={{ width: '100%', padding: '5px 10px' }}

                                >
                                    <CIcon icon={cilSearch} className="icon_size_18" />
                                    <span> {result.term}</span>
                                </div>
                            );
                        }
                        return null;
                    })}
            </div>

        </div>

    )
}
