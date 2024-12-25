import React, { useEffect, useRef, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
    cilLockLocked, cilPeople, cilThumbUp, cilCommentBubble, cilShare
} from '@coreui/icons';
import CreateComment from '../post/CreateComment';
import LikeButton from '../InteractionButton/LikeButton';
import SharePostPopUp from '../sharePostPopup';
import { fetchComments, fetchLikeStatus } from '../../functions/post';
import Comment from '../post/Comment';
import FeedComment from '../post/FeedComment';

export default function PostInteraction({ post, user, isPost, onShowFeedComment, feedComment, dispatch }) {
    const [likesCount, setLikesCount] = useState(post.likes.length); // Initialize likes count
    const [commentCount, setCommentCount] = useState(0); // Initialize likes count
    const [comments, setComments] = useState([]); // Initialize likes count
    const [count, setCount] = useState(1);
    const [sharesCount, setSharesCount] = useState(post.shares.length); // Initialize likes count

    const [isLiked, setIsLiked] = useState(false);
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        // const getPostLikes = async () => {
        //     const res = await fetchLikeStatus(post?._id, user?.token);
        //     setIsLiked(res.isLiked);
        //     // setLikesCount(post.likes.length);
        //     // setSharesCount(post.shares.length);
        // };
        // const getPostComments = async () => {
        //     const res = await fetchComments(post?._id, user.token);
        //     setComments(res);
        //     setCommentCount(res.length);
        // };

        // getPostLikes();
        // getPostComments();
        const fetchInitialData = async () => {
            try {
                const likeData = await fetchLikeStatus(post?._id, user.token);
                setIsLiked(likeData.isLiked);

                const commentData = await fetchComments(post?._id, user.token);
                setComments(commentData);
                setCommentCount(commentData.length);
            } catch (error) {
                console.error("Error fetching post data", error);
            }
        };

        fetchInitialData();

    }, [post?._id], user.token);

    const showMore = () => {
        setCount((prev) => prev + 3);
    };

    const handleLike = (updatedLikes) => {
        setLikesCount(updatedLikes.length);
    };

    const handleNewComment = (newComments) => {
        setComments(newComments);
        setCommentCount(newComments.length);
    };

    // const [isFeedCommentVisible, setIsFeedCommentVisible] = useState(false);
    const [focusCommentInput, setFocusCommentInput] = useState(false);

    const handleCommentIconClick = () => {
        setFocusCommentInput(true); // Toggle focus
    };

    return (
        <div>
            <div className="post_infos">
                <div className="reacts_count">
                    <div className="reacts_count_imgs">
                        <LikeButton
                            // postId={post?._id}
                            post={post}
                            user={user}
                            setLikesCount={setLikesCount} // Pass setLikesCount function
                            isLiked={isLiked}
                            setIsLiked={setIsLiked}
                            dispatch={dispatch}
                        // setLikesCount={(newCount) => onUpdatePost({ ...post, likes: newCount })}
                        // isLiked={isLiked}
                        // setIsLiked={(newStatus) => onUpdatePost({ ...post, isLiked: newStatus })}
                        // onUpdatePost={onUpdatePost}

                        />
                    </div>
                    <div className="reacts_count_imgs">
                        <CIcon icon={cilCommentBubble} className="icon_size_22 icon_button" onClick={() => !feedComment ? onShowFeedComment(post) : handleCommentIconClick()} />
                    </div>
                    <div className="reacts_count_imgs">
                        <CIcon icon={cilShare} className="icon_size_22 icon_button" onClick={() => setVisible(true)} />
                        {isVisible && <SharePostPopUp setVisible={setVisible} post={post} user={user} />}
                    </div>
                </div>
                <div className="to_right">
                    <div className="likes_count">{likesCount} {likesCount > 1 ? 'likes' : 'like'}</div>
                    <div className="comments_count">{commentCount} {commentCount > 1 ? 'comments' : 'comment'}</div>
                    <div className="share_count">{sharesCount} {sharesCount > 1 ? 'shares' : 'share'}</div>
                </div>
            </div>
            {!isPost &&
                <div className="comments_wrap">
                    <div className="comments_order"></div>
                    <CreateComment
                        user={user}
                        postId={post?._id}
                        setComments={setComments}
                        setCount={setCount}
                        setCommentCount={setCommentCount}
                        // setComments={handleNewComment}
                        focusInput={focusCommentInput}
                    />
                    <div className='comment_section'>
                        <h5 style={{ marginBottom: '20px' }}>Comments</h5>
                        {/* {comments &&
                            comments
                                .sort((a, b) => {
                                    return new Date(b.createdAt) - new Date(a.createdAt);
                                })
                                .slice(0, count)
                                .map((comment, i) => <Comment comment={comment} key={i} />)}
                        {count < comments.length && (
                            <div className="view_comments" onClick={() => showMore()}>
                                View more comments
                            </div>
                        )} */}
                        {comments && comments.length > 0 ? (
                            <>
                                {comments
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .slice(0, count)
                                    .map((comment, i) => (
                                        <Comment comment={comment} key={i} />
                                    ))}

                                {/* Show "View more comments" button if there are more comments */}
                                {count < comments.length && (
                                    <div className="view_comments" onClick={() => showMore()}>
                                        View more comments
                                    </div>
                                )}
                            </>
                        ) : (
                            // Message when no comments are available
                            <div>No comments yet. Be the first to comment!</div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}
