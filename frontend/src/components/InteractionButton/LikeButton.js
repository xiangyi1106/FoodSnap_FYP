import React, { useState } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilThumbUp } from '@coreui/icons';
import { toast } from 'react-toastify';
import './interactionButton.css'
const LikeButton = ({ postId, user, setLikesCount, isLiked, setIsLiked}) => {
    // const [isLiked, setIsLiked] = useState(false);
    const handleLike = async () => {
        // if (isLiked || !user?.token) {
        //     if (!user?.token) {
        //         toast.error('User not authenticated');
        //     }
        //     return;
        // }

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/likePost/${postId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            // Update the state based on the response from the server
            setIsLiked(!isLiked);
            setLikesCount(response.data.likes); // Update the likes count from the server response

            // toast.success(isLiked ? 'Unliked successfully!' : 'Liked successfully!');
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
