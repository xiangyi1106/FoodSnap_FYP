import React from 'react'
import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import Rating from '@mui/material/Rating';
import FilterCombobox from './FilterCombobox';
import { Button, CircularProgress } from '@mui/material';
// import Rating from './Rating';
import SendIcon from '@mui/icons-material/Send';
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadMedias } from "../../functions/uploadMedia";
import { addFoodVenueReview } from '../../functions/foodVenue';
import '../Loader/loader.css';
import { toast } from 'react-toastify';

export default function PlaceProfileWriteReview({ user, foodVenue }) {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [commentImage, setCommentImage] = useState([]);
    const textRef = useRef(null);
    const imgInput = useRef(null);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleMedias = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (readerEvent) => {
                // Add each media item at the end of the array
                setCommentImage((prevMedias) => [...prevMedias, readerEvent.target.result]);

            }
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
        });
    };


    // const handleImage = (e) => {
    //     let file = e.target.files[0];
    //     if (
    //         file.type !== "image/jpeg" &&
    //         file.type !== "image/png" &&
    //         file.type !== "image/webp" &&
    //         file.type !== "image/gif"
    //     ) {
    //         setError(`${file.name} format is not supported.`);
    //         return;
    //     } else if (file.size > 1024 * 1024 * 10) {
    //         setError(`${file.name} is too large. Maximum size allowed is 10MB.`);
    //         return;
    //     }

    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = (event) => {
    //         setCommentImage(event.target.result);
    //     };
    // };

    const commentSubmit = async () => {
        // Validate input for rating and text
        if (!rating) {
            toast.error("Please provide a rating before submitting your review.");
            return;
        }
        if (!text.trim()) {
            toast.error("Please enter text for your review before submitting.");
            return;
        }
        setLoading(true);
        var response = "";
        try {
            if (commentImage && commentImage.length > 0) {
                console.log(commentImage);
                const postMedias = commentImage.map((media) => {
                    return dataURItoBlob(media);
                });
                const path = `${foodVenue._id}/review_medias`;
                let formData = new FormData();
                formData.append("path", path);
                postMedias.forEach((media) => {
                    formData.append("file", media);
                });
                console.log(formData);

                response = await uploadMedias(formData, path, user.token);
                // Check if media upload was successful
                if (!response || response.length === 0) {
                    throw new Error("Failed to upload media");
                }
            }
            // Then, create the post with the uploaded media
            const res = await addFoodVenueReview(
                foodVenue._id, user, text, rating, response
            );
            if (!res) {
                throw new Error("Failed to add food venue review");
            }

            setLoading(false);
            console.log("Review Response:", res);
            toast.success(res);
            setCommentImage([]);
            setText("");
            setRating(0);

        } catch (error) {
            setLoading(false);
            toast.error('Error comment: ' + error.message);
        }
    };

    return (
        <div className="create_comment_wrap" style={{ position: 'relative' }}>
            {loading && (
                <div className="loading-overlay">
                    {/* <CircularProgress color="inherit" /> */}
                    <div className='flex_center' style={{ gap: '40px', textAlign: 'center' }}>
                        <div className='coffee_loader'></div>
                        <div style={{ marginTop: '10px' }}><p>Loading...</p></div>
                    </div>
                </div>
            )}
            <>
                <div className="place_create_comment">
                    <div className='place_comment_id'>
                        <img src={user?.picture} alt="user_profile_picture" />
                        <div className='place_comment_id_names'>
                            <span>{user?.name}</span>
                            <span>@{user?.username}</span>
                        </div>
                    </div>
                    <div className='place_comment_rating'>
                        <div>How will you rate for this restaurant on a scale of 1-5 stars?</div>
                        <Rating
                            name="simple-controlled"
                            className='star_rating'
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </div>
                    <div className='place_comment_textarea'>
                        <textarea ref={textRef}
                            value={text}
                            placeholder="Write a comment..."
                            onChange={(e) => setText(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div className='place_comment_buttons'>
                        <div className='place_comment_button_left'>
                            <input
                                type="file"
                                hidden
                                multiple
                                ref={imgInput}
                                accept="image/jpeg,image/png,image/gif,image/webp"
                                onChange={handleMedias}
                            />
                            {error && (
                                <div className="postError comment_error">
                                    <div className="postError_error">{error}</div>
                                    <button className="green_btn" onClick={() => setError("")}>
                                        Try again
                                    </button>
                                </div>
                            )}
                            <div
                                className="comment_circle_icon hover_style_2"
                                onClick={() => { imgInput.current.click(); }}
                            >
                                <i className="camera_icon"></i>
                            </div>
                        </div>
                        <div className='place_comment_button_left'>
                            {/* <button className='green_btn'>Post</button> */}
                            <Button variant="contained" size="small" className="logo_color_background" onClick={commentSubmit}>
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1px' }}>
                    {commentImage && commentImage.length > 0 && (
                        commentImage.map((image, i) => (
                            <div className="comment_img_preview" key={i}>
                                <img src={image} alt={`comment-preview-${i}`} />
                                <div
                                    className="small_white_circle"
                                    onClick={() => setCommentImage(commentImage.filter((_, index) => index !== i))}
                                >
                                    <i className="exit_icon" style={{ right: '6px', top: '5px' }}></i>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </>
        </div>
    )
}
