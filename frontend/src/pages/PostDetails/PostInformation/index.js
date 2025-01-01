import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { Dots, Public } from '../../../svg';
import CIcon from '@coreui/icons-react';
import {
    cilLockLocked, cilPeople, cilThumbUp, cilCommentBubble, cilShare,
    cilLocationPin
} from '@coreui/icons';
import PostMenu from '../../../components/post/PostMenu';
import PostInteraction from '../../../components/PostInteraction/PostInteraction';
import { getCheckSaved } from '../../../functions/post';

const PostDetailsInformation = ({ post, user, feedComment, dispatch, setIsShareVisible, postDetailsPage, sharesCount, setSharesCount, setSelectedSharePost, setPosts, fromPage }) => {
    const [checkSaved, setCheckSaved] = useState();
    const [showMenu, setShowMenu] = useState();

    const postRef = useRef(null);
    const dotRef = useRef(null);

    const navigate = useNavigate();

    const handleClick = (postId, i) => {
        navigate(`/post/${postId}/${i}`);
    };

    //bugs
    useEffect(() => {
        if (post?._id && user?.token) {
            getPostSaved();
        }
    }, [post, user]);

    const getPostSaved = async () => {
        try {
            // Ensure res has a checkSaved property before calling
            const res = await getCheckSaved(post?._id, user); // Make sure you pass user.token, not the entire user object
            setCheckSaved(res.checkSaved);
        } catch (error) {
            console.error('Error fetching saved status:', error);
            setCheckSaved(false); // Optionally handle error by setting checkSaved to false
        }
    };

    return (
        <>
            <Box sx={{ flex: 1, padding: '10px 0px', height: '100vh' }} className="postDetailsInformation" ref={postRef}>
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
                <div className='post_grid_media'>
                    {!postDetailsPage && post.media && post.media.length > 0 && (
                        <div
                            className={`
                            ${post.media.length === 1
                                    ? "grid_1"
                                    : post.media.length === 2
                                        ? "grid_2"
                                        : post.media.length === 3
                                            ? "grid_3"
                                            : post.media.length === 4
                                                ? "grid_4"
                                                : post.media.length >= 5 && "grid_5"
                                }`}
                        >
                            {post.media.slice(0, 5).map((mediaItem, i) => (
                                <Fragment key={`media-${i}`}>
                                    <div className="media-item">
                                        {mediaItem.type === "image" ? (
                                            <img src={mediaItem.url} key={`image-${i}`} alt="" className={`img-${i}`}
                                                onClick={() => handleClick(post._id, i)} />
                                        ) : mediaItem.type === "video" ? (
                                            <video key={`video-${i}`} className={`video-${i}`} style={{ cursor: 'pointer' }} controls onClick={() => handleClick(post.id, i)}>
                                                <source src={mediaItem.url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : null}
                                    </div>
                                </Fragment>
                            ))}

                            {post.media.length > 5 && (
                                <div className="more-pics-shadow">
                                    +{post.media.length - 5}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <PostInteraction post={post} user={user} feedComment={feedComment} dispatch={dispatch} setIsShareVisible={setIsShareVisible} postDetailsPage sharesCount={sharesCount} setSharesCount={setSharesCount} setSelectedSharePost={setSelectedSharePost} setPosts={setPosts} fromPage={fromPage} />
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
