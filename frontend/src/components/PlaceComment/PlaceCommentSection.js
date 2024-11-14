import React, { useState } from 'react';
import PlaceComment from './PlaceComment';
import { Divider } from '@mui/material';

const PlaceCommentSection = ({ initialComments, comments, onAddComment, user, setComments }) => {
    const [isReplyTo, setIsReplyTo] = useState(true);

    const handleReply = (text, commentId) => {
        onAddComment(text, commentId);
    };

    // const handleReply = (replyText, author, parentId, depth) => {
    //     const newComment = {
    //         id: comments.length + 1,
    //         author: 'CurrentUser',  // Replace with the actual current user's name
    //         date: new Date().toISOString(),
    //         text: `Reply to ${author}: ${replyText}`,
    //         avatarUrl: 'path/to/current/user/avatar.png',  // Replace with the actual avatar URL
    //         replies: [],
    //     };

    //     const updatedComments = addReplyToComments(comments, parentId, newComment, depth);
    //     setComments(updatedComments);
    // };

    // const addReplyToComments = (comments, parentId, newComment, depth) => {
    //     return comments.map(comment => {
    //         if (comment.id === parentId) {
    //             // If we're at depth level 2, stop further nesting by adding the reply directly here
    //             if (depth >= 2) {
    //                 return {
    //                     ...comment,
    //                     replies: [...comment.replies, newComment],
    //                 };
    //             }
    //             return {
    //                 ...comment,
    //                 replies: [...comment.replies, newComment],
    //             };
    //         } else if (comment.replies.length > 0) {
    //             return {
    //                 ...comment,
    //                 replies: addReplyToComments(comment.replies, parentId, newComment, depth + 1),
    //             };
    //         }
    //         return comment;
    //     });
    // };

    const [showAllReplies, setShowAllReplies] = useState(false);

    const renderComments = (comments, depth = 0) => {
        return comments.map((comment) => (
            <div key={comment.id} style={{ paddingLeft: depth * 20 }}>
                <PlaceComment
                    author={comment.user.name}
                    date={comment.createdAt}
                    text={comment.text}
                    avatarUrl={comment.user.picture}
                    id={comment._id}
                    user={user}
                    setComments={setComments}
                    depth={depth}
                // onReply={(replyText) => handleReply(replyText, comment.author, comment.id, depth)}
                >
                    {/* {comment.replies.length > 0 && (depth <= 2 ? renderComments(comment.replies, depth + 1) : renderComments(comment.replies, depth))} */}
                    {/* {comment.replies.length > 0 && renderComments(comment.replies, depth + 1)} */}

                    {/* {comment.replies && comment.replies.length > 0 && (
                        <div className="subcomment">
                            {comment.replies.map((subcomment) => (
                                <div key={subcomment?.id} style={{ paddingLeft: (depth || 1) * 20 }}>
                                    <PlaceComment
                                        author={subcomment?.user?.name}
                                        date={subcomment?.createdAt}
                                        text={subcomment?.text}
                                        avatarUrl={subcomment?.user?.picture}
                                        id={comment._id}
                                        user={user}
                                        setComments={setComments}
                                        depth={depth + 1}
                                    // onReply={(replyText) => handleReply(replyText, subcomment.user._id, comment._id, depth)}
                                    />
                                </div>
                            ))}
                        </div>
                    )} */}
                    {/* Show only first two replies by default */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="subcomment">
                            {comment.replies.length <= 2 ? (
                                // If there are 2 or fewer replies, show them all without the "See More" button
                                comment.replies.map((subcomment) => (
                                    <div key={subcomment._id} style={{ paddingLeft: (depth + 1) * 20 }}>
                                        <PlaceComment
                                            author={subcomment?.user?.name}
                                            date={subcomment?.createdAt}
                                            text={subcomment?.text}
                                            avatarUrl={subcomment?.user?.picture}
                                            id={comment._id}
                                            user={user}
                                            setComments={setComments}
                                            depth={depth + 1}
                                        />
                                    </div>
                                ))
                            ) : (
                                // If there are more than 2 replies, show only the first 2 and the "See More" button
                                <>
                                    {comment.replies.slice(0, 2).map((subcomment) => (
                                        <div key={subcomment._id} style={{ paddingLeft: (depth + 1) * 20 }}>
                                            <PlaceComment
                                                author={subcomment?.user?.name}
                                                date={subcomment?.createdAt}
                                                text={subcomment?.text}
                                                avatarUrl={subcomment?.user?.picture}
                                                id={comment._id}
                                                user={user}
                                                setComments={setComments}
                                                depth={depth + 1}
                                            />
                                        </div>
                                    ))}
                                    
                                    {showAllReplies && comment.replies.slice(2).map((subcomment) => (
                                        <div key={subcomment._id} style={{ paddingLeft: (depth + 1) * 20 }}>
                                            <PlaceComment
                                                author={subcomment?.user?.name}
                                                date={subcomment?.createdAt}
                                                text={subcomment?.text}
                                                avatarUrl={subcomment?.user?.picture}
                                                id={comment._id}
                                                user={user}
                                                setComments={setComments}
                                                depth={depth + 1}
                                            />
                                        </div>
                                    ))}
                                    {comment.replies.length > 2 && (
                                        <button onClick={() => setShowAllReplies((prev) => !prev)} className='see_more_btn'>
                                            {showAllReplies ? 'See Less <<' : 'See More >>'}
                                        </button>
                                    )}
                                </>
                            )}

                        </div>
                    )}
                </PlaceComment>
                <Divider />
            </div>
        ));
    };

    return (
        <div className="comments_section">
            {renderComments(comments)}
        </div>
    );
};

export default PlaceCommentSection;
