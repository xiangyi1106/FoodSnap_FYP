import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Public } from '../../../svg';
import CIcon from '@coreui/icons-react';
import {
    cilLockLocked, cilPeople, cilThumbUp, cilCommentBubble, cilShare
} from '@coreui/icons';
import CreateComment from '../../../components/post/CreateComment';
import LikeButton from '../../../components/InteractionButton/LikeButton';
import axios from 'axios';
import SharePostPopUp from '../../../components/sharePostPopup';

const PostDetailsInformation = ({ post, user }) => {
    const [likesCount, setLikesCount] = useState(post.likes.length); // Initialize likes count
    const [commentCount, setCommentCount] = useState(post.comments.length); // Initialize likes count
    const [sharesCount, setSharesCount] = useState(post.shares.length); // Initialize likes count
    const [isLiked, setIsLiked] = useState(false);
    const [ isVisible, setVisible] = useState(false);

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/getLikeStatus/${post._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                setIsLiked(response.data.isLiked); // Update the like status based on server response
                console.log(response.data.isLiked);
            } catch (error) {
                console.log('Error fetching like status: ' + error.message);
            }
        };

        fetchLikeStatus();
    }, []);
    return (
        <>
            {/* Right part - Post Details and Comments */}
            <Box sx={{ flex: 1, padding: '10px 0px' }}>
                <div className="post_header">
                    <Link
                        to={`/profile/${post.user.username}`}
                        className="post_header_left"
                    >
                        <img src={post.user.picture} alt="" />
                        <div className="header_col">
                            <div className="post_profile_name">
                                {post.user.name} <span> @{post.user.username} </span>
                            </div>
                            <div className="post_profile_privacy_date">
                                <Moment fromNow interval={30}>
                                    {post.createdAt}
                                </Moment>
                                . {post.privacy === 'public' ? <Public color="#828387" /> : post.privacy === 'followers' ? <CIcon icon={cilPeople} className="icon_size_12" style={{ marginLeft: '2px' }} /> : <CIcon icon={cilLockLocked} className="icon_size_12" style={{ marginLeft: '2px' }} />}
                            </div>
                        </div>
                    </Link>
                </div>
                <Typography variant="body1" sx={{ marginTop: 1, padding: '10px 15px' }}>
                    {post.text}
                </Typography>

                <div className="post_infos">
                    <div className="reacts_count">
                        <div className="reacts_count_imgs">
                            {/* <CIcon icon={cilThumbUp} className="icon_size_22 icon_button" /> */}
                            <LikeButton
                                postId={post._id}
                                user={user}
                                setLikesCount={setLikesCount} // Pass setLikesCount function
                                currentLikes={likesCount}     // Pass current likes count
                                isLiked={isLiked}
                                setIsLiked={setIsLiked}
                            />
                        </div>
                        <div className="reacts_count_imgs">
                            <CIcon icon={cilCommentBubble} className="icon_size_22 icon_button" />
                        </div>
                        <div className="reacts_count_imgs">
                            <CIcon icon={cilShare} className="icon_size_22 icon_button"  onClick={()=> setVisible(true)}/>
                            {isVisible && <SharePostPopUp setVisible={setVisible} post={post} user={user}/>} 
                        </div>
                        {/* <div className="reacts_count_imgs">
                        <CIcon icon={cilBookmark} className="icon_size_22 icon_button" />
                    </div> */}
                        {/* <div className="reacts_count_num">Like</div> */}
                    </div>
                    <div className="to_right">
                        <div className="comments_count">{likesCount} {likesCount > 1 ? 'likes' : 'like'}</div>
                        <div className="comments_count">13 comments</div>
                        <div className="share_count">{sharesCount} {sharesCount > 1 ? 'shares' : 'share'}</div>
                    </div>
                </div>
                <div className="comments_wrap">
                    <div className="comments_order"></div>
                    <CreateComment user={user} />
                </div>
                {/* Comments Section */}
                {/* <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">Comments</Typography> */}

                {/* Comment Input */}
                {/* <TextField
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 2 }}
                    />
                    <Button variant="contained" color="primary">
                        Submit
                    </Button> */}

                {/* Comment List (Static example) */}
                {/* <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body2">User1: Great post!</Typography>
                        <Typography variant="body2">User2: Thanks for sharing.</Typography>
                    </Box>
                </Paper> */}
            </Box>
        </>
    );
};

export default PostDetailsInformation;
