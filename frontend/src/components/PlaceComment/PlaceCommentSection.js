import React, { useState } from 'react';
import PlaceComment from './PlaceComment';
import { Divider } from '@mui/material';

const PlaceCommentSection = ({ initialComments, comments, onAddComment, user, setComments }) => {
    const [isReplyTo, setIsReplyTo] = useState(true);

    const handleReply = (text, commentId) => {
        onAddComment(text, commentId);
    };

    const [showAllReplies, setShowAllReplies] = useState(false);

    const renderComments = (comments, depth = 0) => {
        return comments.map((comment) => (
            <div key={comment.id} style={{ paddingLeft: depth * 20 }}>
                <PlaceComment
                    author={comment?.user.name}
                    date={comment?.createdAt}
                    text={comment?.text}
                    avatarUrl={comment?.user.picture}
                    id={comment?._id}
                    user={user}
                    setComments={setComments}
                    depth={depth}
                    rating={comment?.rating}
                    media={comment?.media}
                >
                    {/* Show only first two replies by default */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="subcomment">
                            {comment.replies.length <= 2 ? (
                                // If there are 2 or fewer replies, show them all without the "See More" button
                                comment.replies.map((subcomment) => (
                                    <div key={`${comment._id}-reply-${subcomment._id}`} style={{ paddingLeft: (depth + 1) * 20 }}>
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
                                        <div key={`${comment._id}-reply-${subcomment._id}`} style={{ paddingLeft: (depth + 1) * 20 }}>
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
                                        <div key={`${comment._id}-reply-${subcomment._id}`} style={{ paddingLeft: (depth + 1) * 20 }}>
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
