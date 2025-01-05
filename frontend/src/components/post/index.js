import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dots, Public } from "../../svg";
import Moment from "react-moment";
import CIcon from '@coreui/icons-react';
import { cilShare, cilThumbUp, cilCommentBubble, cilBookmark, cilPeople, cilLockLocked, cilLocationPin } from '@coreui/icons';
import CreateComment from "./CreateComment";
import { linkifyMentionsAndHashtags } from "../../functions/linkify";
import PostMenu from "./PostMenu";
import PostInteraction from "../PostInteraction/PostInteraction";
import FeedComment from "./FeedComment";
import { getCheckSaved } from "../../functions/post";

export default function Post({ post, user, profile, skip, onShowFeedComment, depth = 1, dispatch, setIsShareVisible, setSelectedSharePost, sharesCount, setSharesCount, fromPage }) {
    const [visible, setVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [checkSaved, setCheckSaved] = useState();

    const navigate = useNavigate();

    const handleClick = (postId, i) => {
        // navigate(`/post/${postId}/${i}`);
        navigate(`/post/${postId}/${i}`, { state: { post } });
    };

    const mentionMap = (post?.mentions || []).reduce((acc, mention) => {
        const { name, userId, username } = mention;
        if (!acc[name]) {
            acc[name] = [];
        }
        acc[name].push({ userId, username }); // Store both userId and username
        return acc;
    }, {});

    const formattedText = linkifyMentionsAndHashtags(post?.text, mentionMap, user);

    const postRef = useRef(null);
    const dotRef = useRef(null);

    const [isOriginalPostAvailable, setIsOriginalPostAvailable] = useState(true);
    const [isPost, setIsPost] = useState(true);

    const [orientation, setOrientation] = useState(null);

    // Function to determine image orientation
    const handleImageLoad = (event) => {
        const { width, height } = event.target;
        if (width > height) {
            setOrientation('landscape'); // Horizontal image
        } else if (width < height) {
            setOrientation('portrait'); // Vertical image
        } else {
            setOrientation('square'); // Square image (optional)
        }
    };

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
        <div className={`post`} style={{ width: `${profile && "100%"}`, }} ref={postRef} >
            <div className="post_header">
                <Link
                    to={`/profile/${post?.user?.username}`}
                    className="post_header_left"
                >
                    <img src={post?.user?.picture} alt="" />
                    <div className="header_col">
                        <div className="post_profile_name">
                            {post?.user?.name} <span> @{post?.user?.username} </span>
                            <div className="updated_p">
                                {post?.type === "profilePicture" &&
                                    `updated ${post?.user?.gender === "custom"
                                        ? "the"
                                        : post?.user?.gender === "male"
                                            ? "his"
                                            : "her"
                                    } profile picture`}
                                {post?.type === "cover" &&
                                    `updated ${post?.user?.gender === "custom"
                                        ? "the"
                                        : post?.user?.gender === "male"
                                            ? "his"
                                            : "her"
                                    } cover picture`}
                                {post?.type === "shared" &&
                                    `Repost`}
                            </div>
                        </div>
                        <div className="post_profile_privacy_date">
                            <Moment fromNow interval={30}>
                                {post?.createdAt}
                            </Moment>
                            . {post?.privacy === 'public' ? <Public color="#828387" /> : post?.privacy === 'followers' ? <CIcon icon={cilPeople} className="icon_size_12" style={{ marginLeft: '2px' }} /> : <CIcon icon={cilLockLocked} className="icon_size_12" style={{ marginLeft: '2px' }} />}
                        </div>
                    </div>
                    {post?.location && post?.location[0]?.name &&
                        <span className='post_location'>
                            <CIcon icon={cilLocationPin} style={{ color: 'red', position: 'relative', bottom: '1px', marginRight: '2px' }} className="icon_size_16" />
                            {post?.location[0]?.name}
                        </span>
                    }
                </Link>
                {!skip && <div
                    className="post_header_right hover_style_1"
                    onClick={() => setShowMenu((prev) => !prev)}
                    ref={dotRef}
                >
                    <Dots color="#828387" />
                </div>}
            </div>
            <>
                {post?.text && <div className="post_text"><p>{formattedText}</p></div>}
                {post?.tag && post?.tag.length > 0 && <div className="post_text">
                    {post?.tag?.map((tag, index) => (
                        <span key={index} className="tag_badge">
                            {tag.name} @{tag.username}
                        </span>
                    ))}
                </div>}

                {/* Render shared post if it exists and is available */}
                {post?.sharedPost && isOriginalPostAvailable && depth < 2 && (
                    <div className="shared_post">
                        <Post post={post?.sharedPost} user={post?.sharedPost?.user} skip={true} depth={depth + 1} profile />
                    </div>

                )}

                {/* Handle case where original post is not available */}
                {post?.sharedPost && !isOriginalPostAvailable && (
                    <div className="shared_post">
                        <p>This post is no longer available.</p>
                    </div>
                )}

                {post?.media && post?.media?.length > 0 && (
                    <div
                        className={
                            post.media.length === 1
                                ? `grid_1 ${orientation}`
                                : post.media.length === 2
                                    ? "grid_2"
                                    : post.media.length === 3
                                        ? "grid_3"
                                        : post.media.length === 4
                                            ? "grid_4"
                                            : post.media.length >= 5 && "grid_5"
                        }
                    >
                        {post.media.slice(0, 5).map((mediaItem, i) => (
                            <Fragment key={`media-${i}`}>
                                <div className="media-item">
                                    {mediaItem.type === "image" ? (
                                        <img src={mediaItem.url} key={`image-${i}`} alt="" onLoad={handleImageLoad} className={`img-${i} post_grid_media`} style={{ cursor: 'pointer' }} onClick={() => handleClick(post._id, i)} />
                                    ) : mediaItem.type === "video" ? (
                                        <video key={`video-${i}`} className={`video-${i}`} style={{ cursor: 'pointer' }} controls onClick={() => handleClick(post._id, i)}>
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
            </>

            {!skip && <PostInteraction post={post} user={user} isPost={isPost} onShowFeedComment={onShowFeedComment} dispatch={dispatch} setIsShareVisible={setIsShareVisible} setSelectedSharePost={setSelectedSharePost} sharesCount={sharesCount} setSharesCount={setSharesCount} fromPage={fromPage} />}

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
        </div>
    )
}
