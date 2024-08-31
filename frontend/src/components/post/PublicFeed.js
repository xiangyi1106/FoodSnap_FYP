import React, { useEffect, useRef, useState } from 'react'
import Post from "../post";
import axios from 'axios';
import { toast } from 'react-toastify';
import DiscoverPostList from '../../pages/Discover/DiscoverPostList';
import { useLocation } from 'react-router-dom';

export default function PublicFeed({ user }) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getPublicPosts`);
                setPosts(response.data);
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

    //Hide the outer scrollbar
    //   useEffect(() => {
    //     const mainContainer = document.querySelector('.home');
    //     if (currentPath === '/discover') {
    //       mainContainer.classList.add('overflow_hidden');
    //     } else {
    //       mainContainer.classList.remove('overflow_hidden');
    //     }

    //     return () => {
    //       mainContainer.classList.remove('overflow_hidden');
    //     };
    //   }, []);


    return (
        <div className='feed_middle' style={{ height: `${height + 80}px` }}>
            <div className="public_feed_middle" ref={middle} style={{overflowY: 'auto'}}>
                <DiscoverPostList />
            </div>
        </div>
    )
}
