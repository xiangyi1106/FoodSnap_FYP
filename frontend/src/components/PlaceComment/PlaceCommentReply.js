import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { addFoodVenueReviewReply } from '../../functions/foodVenue';
import { toast } from 'react-toastify';

export default function PlaceCommentReply({ setIsReplying, author, user, reviewId, setComments }) {
    const [replyText, setReplyText] = useState('');

    const handleReply = async () => {
        try {
            if (replyText.trim()) {
                const response = await addFoodVenueReviewReply(user, replyText, reviewId);
                // If successful, replace the old comment with the populated comment
                const updatedComment = response.comment;
                // Update comments with the latest replies for the specific review
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment._id === reviewId ? updatedComment : comment
                    )
                );
                toast.success(response.message);
                setReplyText('');
                setIsReplying(false);
            }
        } catch (error) {
            console.log(error.message);
        }

    };

    return (
        <div className="comment_reply_form">
            <TextField
                multiline
                margin="normal"
                rows={2}
                className="comment_reply_textarea"
                placeholder={`Reply to ${author}`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'gray', // Focused border color
                        },
                    },
                }}
            />
            <Button variant="contained" size="small" className="logo_color_background" onClick={handleReply}>
                Send
            </Button>
        </div>
    )
}
