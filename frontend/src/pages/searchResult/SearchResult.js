import React, { useState, useEffect } from 'react';
import Tabs from '../../components/SearchResult/Tabs';
import UserList from '../../components/SearchResult/UserList';
import SearchPostList from '../../components/SearchResult/SearchPostList';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getSearchResult } from '../../functions/user';
import UserGrid from '../../components/SearchResult/UserGrid';
import FeedComment from '../../components/post/FeedComment';
import SharePostPopUp from '../../components/sharePostPopup';

export default function SearchResult({ user, dispatch }) {
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
    }, []);

    useEffect(() => {
        if (activeTab === "User") {
            setFilteredResults(combinedResults.filter(item => item.type === 'user'));
        } else if (activeTab === "Post") {
            setFilteredResults(combinedResults.filter(item => item.type === 'post'));
        } else {
            setFilteredResults(combinedResults); // Show all for "All" tab
        }
    }, [activeTab, combinedResults]);

    const [selectedPost, setSelectedPost] = useState("");
    const [isFeedCommentVisible, setIsFeedCommentVisible] = useState(true);
    const [isShareVisible, setIsShareVisible] = useState(false);
    const [sharesCount, setSharesCount] = useState(0);
    const [selectedSharePost, setSelectedSharePost] = useState(null);

    // const updateProfilePosts = (newPost) => {
    //     const updatedPosts = filteredResults.map(post =>
    //         post._id === newPost._id ? newPost : post // Replace the old post with the new post by matching the _id
    //     );
    //     setFilteredResults(updatedPosts); // Update the profile posts state
    // };

    // const fetchPostById = async (postId) => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/post/${postId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`,
    //             },
    //         });
    //         setSelectedPost(response.data);
    //         updateProfilePosts(response.data);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Error fetching the post data:', error);
    //     }
    // };

    // useEffect(() => {
    //     if (selectedPost) {
    //         fetchPostById(selectedPost._id);
    //     }
    // }, [selectedPost])

    return (
        <div className='food_event_container'>
            {isFeedCommentVisible && selectedPost && <FeedComment post={selectedPost} user={user} setIsFeedCommentVisible={setIsFeedCommentVisible} setIsShareVisible={setIsShareVisible} dispatch={dispatch} sharesCount={sharesCount} setSharesCount={setSharesCount} setSelectedSharePost={setSelectedSharePost}/>}
            {isShareVisible && <SharePostPopUp setIsShareVisible={setIsShareVisible} post={selectedPost} user={user} dispatch={dispatch} />}
            <div style={{ padding: '10px 35px 0px 35px', marginTop: '10px' }}>
                <div style={{ width: '200px', margin: '10px 0px 20px 0' }}>
                    <Tabs
                        tabs={["All", "User", "Post"]}
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
                            dispatch={dispatch}
                            setSharesCount={setSharesCount}
                            sharesCount={sharesCount}
                            setSelectedPost={setSelectedPost}
                            setIsFeedCommentVisible={setIsFeedCommentVisible}
                            setIsShareVisible={setIsShareVisible}
                            setSelectedSharePost={setSelectedSharePost}

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
                                        dispatch={dispatch}
                                        setSharesCount={setSharesCount}
                                        sharesCount={sharesCount}
                                        setSelectedPost={setSelectedPost}
                                        setIsFeedCommentVisible={setIsFeedCommentVisible}
                                        setIsShareVisible={setIsShareVisible}
                                        setSelectedSharePost={setSelectedSharePost}
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
