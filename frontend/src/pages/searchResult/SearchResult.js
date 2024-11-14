import React, { useState, useEffect } from 'react';
import Tabs from '../../components/SearchResult/Tabs';
import UserList from '../../components/SearchResult/UserList';
import SearchPostList from '../../components/SearchResult/SearchPostList';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getSearchResult } from '../../functions/user';
import UserGrid from '../../components/SearchResult/UserGrid';

export default function SearchResult({ user }) {
    const [combinedResults, setCombinedResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const { term } = useParams();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const data = await getSearchResult(term, user.token);
                setCombinedResults(data || []); // Ensure data is at least an empty array
                setFilteredResults(data || []); // Initialize with all results
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch search results", error);
            }
        };

        fetchSearchResults();
    }, [term]);

    useEffect(() => {
        if (activeTab === "User") {
            setFilteredResults(combinedResults.filter(item => item.type === 'user'));
        } else if (activeTab === "Post") {
            setFilteredResults(combinedResults.filter(item => item.type === 'post'));
        } else {
            // Duplicate the example user ten times
            // const exampleUser = {
            //     type: 'user',
            //     name: 'Test User',
            //     username: 'testuser',
            //     picture: 'https://res.cloudinary.com/dgcctevjo/image/upload/v1724231314/amy.chang/profile_pictures/ojrzff2lqfukkhxgvx5g.jpg'
            // };
            // const testUsers = Array(10).fill(exampleUser);
            // setFilteredResults(testUsers);
            setFilteredResults(combinedResults); // Show all for "All" tab
        }
        console.log("combine result", combinedResults);
        console.log("filter result", filteredResults);

        console.log(activeTab);
    }, [activeTab, combinedResults]);

    return (
        <div className='food_event_container'>
            <div style={{ padding: '10px 35px 0px 35px', marginTop: '10px' }}>
                <div style={{ width: '200px', margin: '10px 0px 20px 0' }}>
                    <Tabs
                        tabs={["All", "User", "Post"]}
                        // onSelectTab={setActiveTab} // Handler to change the active tab
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                    />
                </div>
                <div className="settings_header">
                    <h2 className="settings_title">Search Result</h2>
                    <p className="settings_description">
                        Show <span style={{ textTransform: "lowercase" }}>{activeTab}</span> search results.
                    </p>
                </div>
                <div className="settings_separator"></div>

                {/* Check if there are any results */}
                {filteredResults.length === 0 && activeTab === "All" ? (
                    <p style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>No results found.</p>
                ) : (
                    // Display relevant list based on tab
                    activeTab === "User" ? (
                        <UserGrid
                            userlists={filteredResults}
                            title="User"
                            subtitle="Displaying users matching your search term."
                            activeTab={activeTab}

                        />
                    ) : activeTab === "Post" ? (
                        <SearchPostList
                            posts={filteredResults}
                            title="Posts"
                            subtitle="Displaying posts related to your search term."
                            user={user}
                            activeTab={activeTab}
                        />
                    ) : (
                        <div>
                            {filteredResults.filter(item => item.type === 'user').length > 0 && (
                                <>
                                    <UserList
                                        userlists={filteredResults.filter(item => item.type === 'user')}
                                        title="User"
                                        subtitle="Displaying users matching your search term."
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                </>
                            )}
                            {filteredResults.filter(item => item.type === 'post').length > 0 && (
                                <>
                                <SearchPostList
                                    posts={filteredResults.filter(item => item.type === 'post')}
                                    title="Posts"
                                    subtitle="Displaying posts related to your search term."
                                    user={user}
                                    activeTab={activeTab}
                                />
                                </>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
