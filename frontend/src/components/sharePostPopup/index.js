import { useEffect, useReducer, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Picker from "emoji-picker-react";
import CIcon from '@coreui/icons-react';
import { cilX, cilSmile, cilImage, cilTag, cilLocationPin, cilStar, cilUserFollow } from '@coreui/icons';
import Tooltip from '@mui/material/Tooltip';
import classNames from 'classnames';
import CircularProgress from '@mui/material/CircularProgress';
import { createPost } from "../../functions/post";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import PostInput from "../createPostPopup/PostInput";
import PostTextArea from "../createPostPopup/PostTextArea";
import { postReducer } from "../../functions/reducers";

export default function SharePostPopUp({ setVisible, user, post }) {
    //Display the picker and media preview
    const [isShowPicker, setIsShowPicker] = useState(false);
    //Keep the cursor to the next of the text after typing emoji
    const [text, setText] = useState("");
    const textRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState();
    useEffect(() => {
        if (textRef.current) {
            textRef.current.selectionEnd = cursorPosition;
        }
    }, [cursorPosition]);

    const handleEmojiClick = ({ emoji }) => {
        setText((prevText) => {
            const ref = textRef.current;
            const startText = prevText.substring(0, ref.selectionStart);
            const endText = prevText.substring(ref.selectionStart);
            const newText = startText + emoji + endText;
            ref.focus();
            return newText;
        });
    }

    const alertRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleClickClose = () => {
        setVisible(false);
    };

    //Click out and close 
    const emojiPickerRef = useRef(null);
    const emojiPickerIconRef = useRef(null);
    const createPostPopUpRef = useRef(null);

    useClickOutside(emojiPickerRef, [emojiPickerIconRef], () => { setIsShowPicker(false); });

    const [privacy, setPrivacy] = useState("followers");

    // const [shareText, setShareText] = useState("");

    const [{ loading, error }, dispatch] = useReducer(postReducer, {
        loading: false,
        // posts: [],
        error: "",
    });

    const handleSharePost = async () => {
        try {
            // Send a request to share the post using axios
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/posts/share/${post._id}`,
                {
                    text: text,
                    privacy: privacy,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Include the token if needed
                    },
                }
            );

            // Handle the server response
            setVisible(false);
            console.log(response.data); // Log the result from the server
            toast.success(response.data.message);
            // Log before dispatch to check if it's being called
            console.log("Dispatching POST_ADDED with payload:", response.data.post);
            // Dispatch the new post to the reducer
            dispatch({
                type: "ADD_POST",
                payload: response.data.post,
            });
            // setComments((prevComments) => [comments, ...prevComments]);


        } catch (error) {
            // Handle any errors that occur during the request
            console.error("Failed to share the post:", error.message);
            toast.error("Failed to share the post:", error.message);

        }
    };

    return (
        <div className="blur">
            <div className="create_post_popup_wrapper" ref={createPostPopUpRef}>
                <>
                    <div className="create_post_popup_top">
                        <div className="create_post_popup_header">
                            <div><CIcon icon={cilX} className="icon_size_22 icon_button" onClick={handleClickClose} /></div>
                            <span className="create_post_popup_header_title">Share Post</span>
                            <div className='create_post_popup_submit'>
                                {!isLoading && <button className="logo_color_text" type="submit" onClick={handleSharePost}>Share</button>}
                                {isLoading && <button className="logo_color_text">Sharing <CircularProgress className='logo_color_text' style={{ width: "13px", height: "13px" }} /></button>}
                            </div>
                        </div>
                        {/* <div className="post_content" style={{ minHeight: "320px" }}>
                            <textarea autoFocus={true} disabled={isLoading} placeholder="Share something..." id="post_input" ref={textRef} maxLength={22000} value={text} style={{ minHeight: "320px" }} onChange={(e) => setText(e.target.value)} className="post_input" ></textarea>
                        </div> */}
                        <PostInput setText={setText} text={text} isLoading={isLoading} user={user} textRef={textRef} />
                        {/* <PostTextArea setText={setText} text={text} isLoading={isLoading} user={user}/> */}
                    </div>
                    <div className="create_post_popup_footer">
                        <div className="create_post_popup_footer_button_set">
                            <div className="emoji_picker" ref={emojiPickerRef} style={{ bottom: '1rem', left: '-18rem' }}>
                                {isShowPicker && <Picker className="picker" onEmojiClick={handleEmojiClick} searchDisabled={true} autoFocusSearch={false} skinTonesDisabled={false} previewConfig={{ showPreview: false }} height={200} />}
                            </div>
                            <Tooltip title="Add Emoji"><CIcon icon={cilSmile} className={classNames("icon_size_22", "icon_button",
                            )} ref={emojiPickerIconRef} onClick={() => { setIsShowPicker((prev) => !prev); }} /></Tooltip>
                        </div>
                        <div className="create_post_popup_footer_privacy">
                            <select name="select"
                                onChange={(e) => {
                                    setPrivacy(e.target.value); // Update the local state
                                }}>
                                <option value="followers">Followers</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>
                </>

            </div>
        </div>
    )
}
