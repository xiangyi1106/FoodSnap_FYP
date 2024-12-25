import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Dots, Public } from '../../../svg';
import CIcon from '@coreui/icons-react';
import {
    cilLockLocked, cilPeople, cilThumbUp, cilCommentBubble, cilShare,
    cilLocationPin
} from '@coreui/icons';
import PostMenu from '../../../components/post/PostMenu';
import PostInteraction from '../../../components/PostInteraction/PostInteraction';

const PostDetailsInformation = ({ post, user, feedComment, dispatch }) => {
    const [checkSaved, setCheckSaved] = useState();
    const [showMenu, setShowMenu] = useState();

    const postRef = useRef(null);
    const dotRef = useRef(null);

    return (
        <>
            <Box sx={{ flex: 1, padding: '10px 0px', height: '100vh' }} ref={postRef}>
                <div className="post_header">
                    <Link
                        to={`/profile/${post?.user?.username}`}
                        className="post_header_left"
                    >
                        <img src={post?.user?.picture} alt="" />
                        <div className="header_col">
                            <div className="post_profile_name">
                                {post?.user?.name} <span> @{post?.user?.username} </span>
                            </div>
                            <div className="post_profile_privacy_date">
                                <Moment fromNow interval={30}>
                                    {post?.createdAt}
                                </Moment>
                                . {post?.privacy === 'public' ? <Public color="#828387" /> : post?.privacy === 'followers' ? <CIcon icon={cilPeople} className="icon_size_12" style={{ marginLeft: '2px' }} /> : <CIcon icon={cilLockLocked} className="icon_size_12" style={{ marginLeft: '2px' }} />}
                            </div>
                        </div>
                        {post?.location && post.location[0]?.name &&
                            <span className='post_location'>
                                <CIcon icon={cilLocationPin} style={{ color: 'red', position: 'relative', bottom: '1px', marginRight: '2px' }} className="icon_size_16" />
                                {post.location[0].name}
                            </span>
                        }
                    </Link>
                    <div
                        className="post_header_right hover_style_1"
                        onClick={() => setShowMenu((prev) => !prev)}
                        ref={dotRef}
                    >
                        <Dots color="#828387" />
                    </div>
                </div>
                <Typography variant="body1" sx={{ marginTop: 1, padding: '10px 15px' }}>
                    {post?.text}
                </Typography>
                <PostInteraction post={post} user={user} feedComment={feedComment} dispatch={dispatch} />

                {showMenu && (
                    <PostMenu
                        userId={user.id}
                        postUserId={post.user._id}
                        setShowMenu={setShowMenu}
                        postId={post._id}
                        token={user.token}
                        checkSaved={checkSaved}
                        setCheckSaved={setCheckSaved}
                        postRef={postRef}
                        dotRef={dotRef}
                    />
                )}
            </Box>
        </>
    );
};

export default PostDetailsInformation;
