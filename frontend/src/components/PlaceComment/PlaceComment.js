import React, { useState } from 'react';
import './PlaceComment.css';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PlaceCommentReply from './PlaceCommentReply';
import StarRating from '../searchVenue/StarRating';
import MediaCarousel from './MediaCarousel';

const PlaceComment = ({ author, date, text, avatarUrl, children, id, user, setComments, depth, rating, media }) => {
    const [isReplying, setIsReplying] = useState(false);
    // Format the date to a more readable format
    //  const formattedDate = format(new Date(date), 'MMMM d, yyyy h:mm a');
    return (
        <div className="comment_article">
            <div className="comment_footer">
                <div className="comment_author_info">
                    <p className="comment_author_name">
                        <img src={avatarUrl} alt={author} className="comment_author_avatar" />
                        {author}</p>
                    <p className="comment_date">
                        <time dateTime={date}>
                            {new Date(date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true, // This will display the time in 12-hour format (AM/PM)
                            })}
                        </time>
                    </p>
                </div>
            </div>
            {/* <p className="comment_text">{rating}</p> */}
            {rating && <div className='place-ratings'>
                <StarRating rating={rating} />
                <span className='rating-text' style={{ marginRight: '10px' }}>
                    {rating}
                </span>
            </div>}
            <p className="comment_text">{text}</p>
            {/* <MediaCarousel media={media} /> */}
            {media && media.length > 0 && (
                <div className='' style={{display: 'flex', gap: '10px'}}>
                    {media.map((item, index) => {
                        // Check the media type (you can extend this with more checks for different media types)
                        if (item.type === "image") {
                            return (
                                <div key={index}>
                                    <img src={item.url} alt={`Media ${index}`} style={{ width: '100%', marginBottom: '10px' }} className='comment_image'/>
                                </div>
                            );
                        }
                        if (item.type === "video") {
                            return (
                                <div key={index}>
                                    <video controls style={{ width: '100%', marginBottom: '10px' }}>
                                        <source src={item.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            );
                        }
                        // You can add other types (like audio, pdf, etc.) as needed
                        return null;  // If the media type is unsupported, return nothing
                    })}
                </div>
            )}

            {depth === 0 &&
                <div className="comment_actions">
                    <button type="button" className="comment_reply_button" onClick={() => setIsReplying(!isReplying)}>
                        <svg className="comment_reply_icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                        </svg>
                        Reply
                    </button>
                </div>
            }
            {isReplying && (
                <PlaceCommentReply setIsReplying={setIsReplying} author={author} user={user} reviewId={id} setComments={setComments} />
                // <div className="comment_reply_form">
                //     <TextField
                //         multiline
                //         margin="normal"
                //         rows={2}
                //         className="comment_reply_textarea"
                //         placeholder={`Reply to ${author}`}
                //         value={replyText}
                //         onChange={(e) => setReplyText(e.target.value)}
                //         sx={{
                //             '& .MuiOutlinedInput-root': {
                //                 '&.Mui-focused fieldset': {
                //                     borderColor: 'gray', // Focused border color
                //                 },
                //             },
                //         }}
                //     />
                //     <Button variant="contained" size="small" className="logo_color_background" onClick={handleReply}>
                //         Send
                //     </Button>
                // </div>
            )}
            {children}
        </div>
    );
};

export default PlaceComment;
