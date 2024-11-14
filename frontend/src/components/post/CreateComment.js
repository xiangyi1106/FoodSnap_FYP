import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import Settings from "@mui/icons-material/Settings";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { ClipLoader } from "react-spinners";
import { uploadMedias } from "../../functions/uploadMedia";
import { addComment } from "../../functions/post";

export default function CreateComment({ user, postId, setComments, setCount, setCommentCount, focusInput }) {
    const [picker, setPicker] = useState(false);
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [commentImage, setCommentImage] = useState("");
    const [cursorPosition, setCursorPosition] = useState(null);
    const [loading, setLoading] = useState(false);
    const textRef = useRef(null);
    const imgInput = useRef(null);

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

    const handleComment = async (e) => {
        if (e.key === "Enter") {
            if (commentImage != "") {
                setLoading(true);
                const img = dataURItoBlob(commentImage);
                const path = `${user.username}/comment_images/${postId}`;
                let formData = new FormData();
                formData.append("path", path);
                formData.append("file", img);
                const imgComment = await uploadMedias(formData, path, user.token);

                const comments = await addComment(
                    postId,
                    user.id,
                    text,
                    imgComment[0].url,
                    user.token
                );
                setComments((prevComments) => [comments, ...prevComments]);
                setCount((prev) => ++prev);
                setCommentCount((prev) => ++prev);
                setLoading(false);
                setText("");
                setCommentImage("");
            } else {
                setLoading(true);

                const comments = await addComment(postId, user.id, text, "", user.token);
                setComments((prevComments) => [comments, ...prevComments]);
                setCommentCount((prev) => ++prev);
                setCount((prev) => ++prev);
                setLoading(false);
                setText("");
                setCommentImage("");
            }
        }
    };

    useEffect(() => {
        if (focusInput) {
            textRef.current.focus();
        }
    }, [focusInput]);
    return (
        <div className="create_comment_wrap">
            <div className="create_comment">
                <img src={user?.picture} alt="" />
                <div className="comment_input_wrap">
                    {picker && (
                        <div className="comment_emoji_picker">
                            <Picker onEmojiClick={handleEmoji} height={300} searchDisabled={true} autoFocusSearch={false} skinTonesDisabled={false} previewConfig={{ showPreview: false }} />
                        </div>
                    )}
                    <input
                        type="file"
                        hidden
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
                    <input
                        type="text"
                        ref={textRef}
                        value={text}
                        placeholder="Write a comment..."
                        onChange={(e) => setText(e.target.value)}
                        onKeyUp={handleComment}
                    />
                    <div
                        className="comment_circle_icon hover_style_2"
                        onClick={() => {
                            setPicker((prev) => !prev);
                            if (!picker) {
                                textRef.current.focus();
                            }
                        }}
                    >
                        <i className="emoji_icon"></i>
                    </div>
                    <div
                        className="comment_circle_icon hover_style_2"
                        onClick={() => { imgInput.current.click(); picker && setPicker(false) }}
                    >
                        <i className="camera_icon"></i>
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
        </div>
    );
}
