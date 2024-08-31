import React from 'react'
import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import Rating from '@mui/material/Rating';
import FilterCombobox from './FilterCombobox';
import { Button } from '@mui/material';
// import Rating from './Rating';
import SendIcon from '@mui/icons-material/Send';

export default function PlaceProfileWriteReview({ user }) {
    const [picker, setPicker] = useState(false);
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [commentImage, setCommentImage] = useState("");
    const [cursorPosition, setCursorPosition] = useState(null);
    const textRef = useRef(null);
    const imgInput = useRef(null);
    const [rating, setRating] = useState(0);

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
          title: 'The Lord of the Rings: The Return of the King',
          year: 2003,
        },
    ]
    const handleEmoji = (emojiData) => {
        const cursor = textRef.current.selectionStart;
        const message = text.slice(0, cursor) + emojiData.emoji + text.slice(cursor);
        setText(message);
        //Codes added for the new cursor
        const newCursor = cursor + emojiData.emoji.length
        setTimeout(() => textRef.current.setSelectionRange(newCursor, newCursor), 10)
        textRef.current.focus();
    };


    const handleImage = (e) => {
        let file = e.target.files[0];
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/webp" &&
            file.type !== "image/gif"
        ) {
            setError(`${file.name} format is not supported.`);
            return;
        } else if (file.size > 1024 * 1024 * 10) {
            setError(`${file.name} is too large. Maximum size allowed is 10MB.`);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setCommentImage(event.target.result);
        };
    };

    return (
        <div className="create_comment_wrap">
            <div className="place_create_comment">
                <div className='place_comment_id'>
                    {/* <img src={"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="user_profile_picture" /> */}
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
                        // precision={0.5}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    {/* <Rating /> */}
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
                            onChange={handleImage}
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
                            onClick={() => { imgInput.current.click();}}
                        >
                            <i className="camera_icon"></i>
                        </div>
                    </div>
                    <div className='place_comment_button_left'>
                        {/* <button className='green_btn'>Post</button> */}
                        <Button variant="contained" size="small" className="logo_color_background">
                        Post
                    </Button>
                    </div>
                </div>
            </div>
            {commentImage && (
                <div className="comment_img_preview">
                    <img src={commentImage} alt="" />
                    <div
                        className="small_white_circle"
                        onClick={() => setCommentImage("")}
                    >
                        <i className="exit_icon"></i>
                    </div>
                </div>
            )}
            {/* <FilterCombobox selectOptions={top100Films}/> */}
        </div>
    )
}
