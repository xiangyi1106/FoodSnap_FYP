import React, { useState } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilThumbUp } from '@coreui/icons';
import { toast } from 'react-toastify';
import './interactionButton.css'
const LikeButton = ({ post, user, setLikesCount, isLiked, setIsLiked, dispatch }) => {

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
                // Update likes count with server response
                setLikesCount(response.data.likes.length);
                // setLikesCount(response.data.likes);

                // Update global state via dispatch
                dispatch({
                    type: "UPDATE_POST",
                    payload: {
                        _id: post._id, // Ensure post ID is sent
                        likes: response.data.likes, // The updated likes array
                    },
                });

                console.log(response.data);
            }

        } catch (error) {
            toast.error('Error liking post: ' + error.message);
        }
    };

    return (
        <div className="like_button_wrapper" onClick={handleLike}>
            <CIcon icon={cilThumbUp} className={`icon_size_22 icon_button ${isLiked ? 'liked' : 'unliked'}`} />
        </div>
    );
};


export default LikeButton;
