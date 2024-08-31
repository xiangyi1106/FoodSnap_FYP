import React, { useState } from 'react';
import PlaceComment from './PlaceComment';
import { Divider } from '@mui/material';

const PlaceCommentSection= ({ initialComments }) => {
    const [comments, setComments] = useState(initialComments);

    const handleReply = (replyText, author, parentId, depth) => {
        const newComment = {
            id: comments.length + 1,
            author: 'CurrentUser',  // Replace with the actual current user's name
            date: new Date().toISOString(),
            text: `Reply to ${author}: ${replyText}`,
            avatarUrl: 'path/to/current/user/avatar.png',  // Replace with the actual avatar URL
            replies: [],
        };

        const updatedComments = addReplyToComments(comments, parentId, newComment, depth);
        setComments(updatedComments);
    };

    const addReplyToComments = (comments, parentId, newComment, depth) => {
        return comments.map(comment => {
            if (comment.id === parentId && depth < 2) {
                return {
                    ...comment,
                    replies: [...comment.replies, newComment],
                };
            } else if (comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: addReplyToComments(comment.replies, parentId, newComment, depth),
                };
            }
            return comment;
        });
    };

    const renderComments = (comments, depth = 0) => {
        return comments.map((comment) => (
            <div key={comment.id} style={{ paddingLeft: depth * 20 }}>
                <PlaceComment
                    author={comment.author}
                    date={comment.date}
                    text={comment.text}
                    avatarUrl={comment.avatarUrl}
                    depth={depth}
                    onReply={(replyText) => handleReply(replyText, comment.author, comment.id, depth)}
                >
                    {comment.replies.length > 0 && renderComments(comment.replies, depth + 1)}
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
