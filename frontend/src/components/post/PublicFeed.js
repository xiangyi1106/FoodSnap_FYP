import React, { useEffect, useRef, useState } from 'react'
import Post from "../post";
import axios from 'axios';
import { toast } from 'react-toastify';
import DiscoverPostList from '../../pages/Discover/DiscoverPostList';
import { useLocation } from 'react-router-dom';

export default function PublicFeed({ user, dispatch }) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getPublicPosts`);
                // setPosts(response.data);
                const rawPosts = response.data;

                // Process posts to add `hasLiked` property
                const processedPosts = rawPosts.map((post) => ({
                    ...post,
                    hasLiked: post.likes.some((like) => like._id === user.id), // Assuming `user._id` is available
                }));

                setPosts(processedPosts);
                // console.log(processedPosts);
            } catch (error) {
                toast.error("Error fetching posts: " + error.message);
            }
        };

        fetchPosts();
    }, []);

    const middle = useRef(null);
    const [height, setHeight] = useState();

    useEffect(() => {
        if (middle.current) {
            setHeight(middle.current.clientHeight);
        }
    }, [posts]);

    const location = useLocation();

    // Extract the current path to determine the active menu item
    const currentPath = location.pathname;

    return (
        <div className='feed_middle' style={{ height: `${height + 80}px` }}>
            <div className="public_feed_middle" ref={middle} style={{ overflowY: 'auto' }}>
                <DiscoverPostList posts={posts} user={user} setPosts={setPosts} dispatch={dispatch} />
            </div>
        </div>
    )
}
