import React, { useEffect, useRef, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilCommentBubble, cilShare } from '@coreui/icons';
import CreateComment from '../post/CreateComment';
import LikeButton from '../InteractionButton/LikeButton';
import { fetchComments, fetchLikeStatus } from '../../functions/post';
import Comment from '../post/Comment';

export default function PostInteraction({ post, user, isPost, onShowFeedComment, feedComment, dispatch, setIsShareVisible, onUpdatePost, postDetailsPage, setSelectedSharePost, sharesCount, setSharesCount, setPosts, fromPage }) {
    const [likesCount, setLikesCount] = useState(post?.likes?.length); // Initialize likes count
    const [commentCount, setCommentCount] = useState(0); // Initialize likes count
    const [comments, setComments] = useState([]); // Initialize likes count
    const [count, setCount] = useState(1);

    const [isLiked, setIsLiked] = useState(false);

    const handleCommentUpdate = (newComment) => {
        // Update local state
        const updatedComments = [newComment, ...comments];
        const updatedCommentCount = commentCount + 1;
        const updatedCommentVisibleCount = count + 1;
        setComments(updatedComments);
        setCommentCount(updatedCommentCount);
        setCount(updatedCommentVisibleCount);

        // Call the parent callback with updated post data
        const updatedPost = {
            ...post,
            comments: updatedComments,
            commentCount: updatedCommentCount,
            count: updatedCommentVisibleCount,
        };
        onUpdatePost(updatedPost); // Notify parent
    };

    const fetchInitialData = async () => {
        try {
            const likeData = await fetchLikeStatus(post?._id, user.token);
            setIsLiked(likeData.isLiked);

            const commentData = await fetchComments(post?._id, user.token);
            setComments(commentData);
            setCommentCount(commentData.length);
            dispatch({
                type: "UPDATE_COMMENT_COUNT",
                payload: {
                    postId: post._id,
                    updates: {
                        comments: commentData,
                        commentCount: commentData.length,
                        commentVisibleCount: 1,
                    },
                },
            });

            setSharesCount(post.shares.length);

        } catch (error) {
            console.error("Error fetching post data", error);
        }
    };

    useEffect(() => {
        console.log("Updated comment count:", commentCount);
        dispatch({
            type: "UPDATE_COMMENT_COUNT",
            payload: {
                postId: post._id,
                updates: {
                    comments: comments,
                    commentCount: comments.length,
                    commentVisibleCount: (prevCount) => prevCount + 1,
                },
            },
        });
    }, [commentCount, dispatch]);


    useEffect(() => {
        if (user && post?._id) {  // Ensure user is not undefined before fetching data
            fetchInitialData();
        }
    }, [post?._id, user]);

    const showMore = () => {
        setCount((prev) => prev + 3);
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
                            setPosts={setPosts}
                            fromPage={fromPage}
                        />
                    </div>
                    <div className="reacts_count_imgs">
                        <CIcon icon={cilCommentBubble}
                            className="icon_size_22 icon_button"
                            onClick={() => !feedComment ? onShowFeedComment(post) : handleCommentIconClick()}
                        />
                    </div>
                    <div className="reacts_count_imgs">
                        <CIcon icon={cilShare} className="icon_size_22 icon_button" onClick={() => { setIsShareVisible(true); setSelectedSharePost(post) }} />
                    </div>
                </div>
                <div className="to_right">
                    <div className="likes_count">{postDetailsPage ? likesCount : post?.likes?.length || 0} {(post?.likes?.length || 0) > 1 || likesCount > 1 ? 'likes' : 'like'}</div>
                    {/* <div className="comments_count">{commentCount} {commentCount > 1 ? 'comments' : 'comment'}</div> */}
                    <div className="comments_count"> {postDetailsPage ? commentCount : commentCount} {(post?.commentCount || 0) > 1 || commentCount > 1 ? 'comments' : 'comment'}</div>
                    <div className="share_count">{postDetailsPage ? sharesCount : post?.shares?.length || 0} {sharesCount > 1 || post?.shares?.length > 1 ? 'shares' : 'share'}</div>
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
                        focusInput={focusCommentInput}
                        dispatch={dispatch}
                        onCommentAdded={handleCommentUpdate}
                    />
                    <div className='comment_section'>
                        <h5 style={{ marginBottom: '20px' }}>Comments</h5>
                        {comments && comments.length > 0 ? (
                            <>
                                {comments
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .slice(0, count)
                                    // .slice(0, 5)
                                    .map((comment, i) => (
                                        <Comment comment={comment} key={i} />
                                    ))}

                                {/* Show "View more comments" button if there are more comments */}
                                {/* {comments.length > 5 && ( */}
                                {count < comments.length && (
                                    <div className="view_comments" onClick={() => showMore()}>
                                        View more comments
                                    </div>
                                )}
                            </>
                        ) : (
                            // Message when no comments are available
                            <div style={{ color: 'gray', fontSize: '0.9rem' }}>No comments yet. Be the first to comment!</div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}
