import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import Post from '../../../components/post';
import FeedComment from '../../../components/post/FeedComment';
import SharePostPopUp from '../../../components/sharePostPopup';
import { HashLoader } from "react-spinners";

export default function ProfilePost({ user }) {
    const [isFeedCommentVisible, setIsFeedCommentVisible] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedSharePost, setSelectedSharePost] = useState(null);
    const [isShareVisible, setIsShareVisible] = useState(false);
    const [sharesCount, setSharesCount] = useState(0);
    const [profilePost, setProfilePost] = useState([]);

    const handleShowFeedComment = (post) => {
        setSelectedPost(post);
        setIsFeedCommentVisible(true);
    };
    const { profile, dispatch, loading } = useOutletContext();

    // Function to update the profile posts with the new version of the selected post
    const updateProfilePosts = (newPost) => {
        const updatedPosts = profilePost.map(post =>
            post._id === newPost._id ? newPost : post // Replace the old post with the new post by matching the _id
        );
        setProfilePost(updatedPosts); // Update the profile posts state
    };


    const fetchPostById = async (postId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            // Only update the selectedPost if it differs from the current one
            if (!selectedPost || selectedPost._id !== response.data._id) {
                setSelectedPost(response.data); // Update selectedPost with the latest data
            }
            updateProfilePosts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching the post data:', error);
        }
    };

    useEffect(() => {
        if (selectedPost) {
            fetchPostById(selectedPost._id);
        }
    }, [selectedPost])

    useEffect(() => {
        if (profile?.posts) {
            setProfilePost(profile.posts);
        }
    }, [profile?.posts]);

    return (
        <div className="posts">
            {isFeedCommentVisible && selectedPost && <FeedComment post={selectedPost} user={user} setIsFeedCommentVisible={setIsFeedCommentVisible} setIsShareVisible={setIsShareVisible} sharesCount={sharesCount} setSharesCount={setSharesCount} setSelectedSharePost={setSelectedSharePost} dispatch={dispatch} />}
            {isShareVisible && selectedSharePost && <SharePostPopUp setIsShareVisible={setIsShareVisible} post={selectedSharePost} user={user} sharesCount={sharesCount} setSharesCount={setSharesCount} dispatch={dispatch} />}
            {loading ?
                <>
                    <div className="skelton_loader">
                        <HashLoader color="#30BFBF" />
                    </div>
                </> :
                <>
                    {profilePost && profilePost.length > 0 ? (
                        profilePost.map((post) => (
                            <Post post={post} user={user} key={post._id} profile onShowFeedComment={handleShowFeedComment} setIsShareVisible={setIsShareVisible} setSelectedSharePost={setSelectedSharePost} dispatch={dispatch} setSharesCount={setSharesCount} />
                        ))
                    ) : (
                        <div className="no_posts">No posts available</div>
                    )}
                </>
            }
        </div>
    )
}
