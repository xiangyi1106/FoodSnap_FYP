import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilThumbUp } from '@coreui/icons';
import { toast } from 'react-toastify';
import './interactionButton.css'
const LikeButton = ({ post, user, setLikesCount, isLiked, setIsLiked, dispatch, setPosts, fromPage }) => {
    
    const handleLike = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/likePost/${post._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (response.data) {
                // Toggle the like status
                setIsLiked(!isLiked);
                // console.log(isLiked);
                // Update likes count with server response
                setLikesCount(response.data.likes.length);
                // setLikesCount(response.data.likes);
                if (fromPage) {
                    // Update the post data
                    if (fromPage === 'discover') {
                        // Discover page: update local state (setPosts)
                        // setPosts((prevPosts) =>
                        //     prevPosts.map((post) =>
                        //         post._id === post._id
                        //             ? {
                        //                 ...post,
                        //                 hasLiked: !post.hasLiked,
                        //                 likes: post.hasLiked
                        //                     ? post.likes.filter((like) => like._id !== user.id)
                        //                     : [...post.likes, { _id: user.id }],
                        //             }
                        //             : post
                        //     )
                        // );
                        setPosts((prevPosts) =>
                            prevPosts.map((currentPost) =>
                                currentPost._id === post._id
                                    ? {
                                        ...currentPost,
                                        hasLiked: !currentPost.hasLiked,
                                        likes: currentPost.hasLiked
                                            ? currentPost.likes.filter((like) => like._id !== user.id)
                                            : [...currentPost.likes, { _id: user.id }],
                                    }
                                    : currentPost
                            )
                        );
                        return;
                    }
                    // else {
                    //     // Post page: use dispatch to update global state (e.g., Redux)
                    //     dispatch({
                    //         type: "UPDATE_POST",
                    //         payload: {
                    //             _id: post._id,
                    //             likes: response.data.likes,
                    //         },
                    //     });
                    // }
                }

                dispatch({
                    type: "UPDATE_POST",
                    payload: {
                        _id: post._id,
                        likes: response.data.likes,
                    },
                });
                // // Update global state via dispatch
                // dispatch({
                //     type: "UPDATE_POST",
                //     payload: {
                //         _id: post._id, // Ensure post ID is sent
                //         likes: response.data.likes, // The updated likes array
                //     },
                // });

                // discover && setPosts((prevPosts) =>
                //     prevPosts.map((post) =>
                //         post._id === post._id
                //             ? {
                //                 ...post,
                //                 hasLiked: !post.hasLiked,
                //                 likes: post.hasLiked
                //                     ? post.likes.filter((like) => like._id !== user.id)
                //                     : [...post.likes, { _id: user.id }],
                //             }
                //             : post
                //     )
                // );

                console.log(response.data);
            }

        } catch (error) {
            toast.error('Error liking post: ' + error.message);
        }
    };

    useEffect(() => {
        setIsLiked(post.likes.some((like) => like._id === user.id));
        setLikesCount(post.likes.length);
    }, [post.likes, user.id]);

    return (
        <div className="like_button_wrapper" onClick={handleLike}>
            <CIcon icon={cilThumbUp} className={`icon_size_22 icon_button ${isLiked ? 'liked' : 'unliked'}`} />
        </div>
    );
};


export default LikeButton;
