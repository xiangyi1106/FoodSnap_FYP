import "./style.css";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Picker from "emoji-picker-react";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import TagIcon from '@mui/icons-material/Tag';
import Rating from '@mui/material/Rating';
import StarsIcon from '@mui/icons-material/Stars';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StarIcon from '@mui/icons-material/Star';
import ImagePreview from "./ImagePreview";
import Location from "./Location";
import CIcon from '@coreui/icons-react';
import { cilX, cilSmile, cilImage, cilTag, cilLocationPin, cilStar, cilUserFollow } from '@coreui/icons';
import Tooltip from '@mui/material/Tooltip';
import TagPeople from "./TagPeople";
import { Link } from "react-router-dom";
import MediaPreview from "./MediaPreview";
import EditMedia from "./EditMedia";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classNames from 'classnames';
import PostLoading from "./PostLoading";
import CircularProgress from '@mui/material/CircularProgress';
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadMedias } from "../../functions/uploadMedia";
import { createPost } from "../../functions/post";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostInput from "./PostInput";
import { toggleScroll } from "../../functions/fileUtils";

export default function CreatePostPopUp({ setVisible, isPostLoading, setIsPostLoading, user }) {
    //Display the picker and media preview
    const [isShowPicker, setIsShowPicker] = useState(false);
    const [isShowImage, setIsShowImage] = useState(false);
    const [error, setError] = useState("");
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

    const [medias, setMedias] = useState([]);

    const alertRef = useRef(null);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setVisible(false);
        setOpen(false);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    //Click out and close 
    const emojiPickerRef = useRef(null);
    const emojiPickerIconRef = useRef(null);
    const createPostPopUpRef = useRef(null);

    // useClickOutside(createPostPopUpRef, [createPostPopUpRef, alertRef], () => setVisible(false));

    const [privacy, setPrivacy] = useState("followers");

    const [page, setPage] = useState(0);

    //Set the value at parent component to keep the value even though change page
    //Location page
    const [searchText, setSearchText] = useState("");
    const [location, setLocation] = useState(null);
    const [locationList, setLocationList] = useState([]);
    const [listPlace, setListPlace] = useState([]);

    //Tag name page
    const [users, setUsers] = useState([]);
    const [selectedNames, setSelectedNames] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [activeButtons, setActiveButtons] = useState(new Set());

    const handleButtonClick = (buttonName) => {
        setActiveButtons((prevActiveButtons) => {
            const newActiveButtons = new Set(prevActiveButtons);
            if (newActiveButtons.has(buttonName)) {
                newActiveButtons.delete(buttonName);
            } else {
                newActiveButtons.add(buttonName);
            }
            return newActiveButtons;
        });
    };
    
    // Updated useClickOutside logic to properly update the state
    useClickOutside(emojiPickerRef, [emojiPickerIconRef], () => {
        setIsShowPicker(false);
        setActiveButtons((prevActiveButtons) => {
            const updatedButtons = new Set(prevActiveButtons);
            if (updatedButtons.has('emoji')) {
                updatedButtons.delete('emoji');
            }
            return updatedButtons;
        });
    });

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const postSubmit = async () => {
        setLoading(true);
        if (medias && medias.length) {
            setIsPostLoading(true);
            const postMedias = medias.map((media) => {
                return dataURItoBlob(media.data);
            });
            const path = `${user.username}/post_medias`;
            let formData = new FormData();
            formData.append("path", path);
            postMedias.forEach((media) => {
                formData.append("file", media);
            });
            console.log(formData);
            const response = await uploadMedias(formData, path, user.token);
            // Check if media upload was successful
            if (!response || response.length === 0) {
                throw new Error("Failed to upload media");
            }
            
            // Then, create the post with the uploaded media
            const res = await createPost(
                null,
                text,
                response,
                selectedNames,
                location,
                // rating,
                privacy,
                user.id,
                user.token
            );
            if (res === "ok") {
                setText("");
                setMedias("");
                setVisible(false);
                setSelectedNames([]);
                setLocation([]);
                setLocationList([]);
                setIsPostLoading(false);
                toast.success("Post created successfully!");

            } else {
                setIsPostLoading(false);
                toast.error("Failed to create post: " + response);
            }
        } else if (text) {
            setIsPostLoading(true);
            const response = await createPost(
                null,
                text,
                null,
                selectedNames,
                location,
                // rating,
                privacy,
                user.id,
                user.token
            );
            if (response === "ok") {
                setText("");
                setVisible(false);
                setSelectedNames([]);
                setLocation([]);
                setLocationList([]);
                setIsPostLoading(false);
                toast.success("Post created successfully!");
            } else {
                setIsPostLoading(false);
                toast.error("Failed to create post: " + response);
            }
        } else {
            // console.log("nothing");
            toast.error("Please add content before posting.");
        }
        setLoading(false);
    };

    useEffect(() => {
        toggleScroll(true);
        return () => toggleScroll(false); // Re-enable scrolling on cleanup
    }, []);

    return (
        <div className="blur">
            <div className="create_post_popup_wrapper" ref={createPostPopUpRef}>
                {page === 1 && <Location setPage={setPage} searchText={searchText} setSearchText={setSearchText} listPlace={listPlace} setListPlace={setListPlace} setLocation={setLocation} setLocationList={setLocationList} handleButtonClick={handleButtonClick} activeButtons={activeButtons}
                    isLoading={isLoading} setIsLoading={setIsLoading} />}
                {page === 2 && <TagPeople page={page} setPage={setPage} setText={setText} selectedNames={selectedNames} setSelectedNames={setSelectedNames} filteredUsers={filteredUsers} setFilteredUsers={setFilteredUsers} handleButtonClick={handleButtonClick} activeButtons={activeButtons} users={users} setUsers={setUsers}
                    isLoading={isLoading} setIsLoading={setIsLoading} />}
                {page === 3 && <EditMedia medias={medias} setMedias={setMedias} setPage={setPage} />}
                {page === 0 && <>
                    <div className="create_post_popup_top">
                        <div className="create_post_popup_header">
                            <div><CIcon icon={cilX} className="icon_size_22 icon_button" onClick={handleClickOpen} /></div>
                            <span className="create_post_popup_header_title">Create Post</span>
                            <div className='create_post_popup_submit'>
                                {!loading && <button className="logo_color_text" type="submit" onClick={postSubmit}>Post</button>}
                                {loading && <button className="logo_color_text">Posting <CircularProgress className='logo_color_text' style={{ width: "13px", height: "13px" }} /></button>}
                            </div>
                        </div>
                        {selectedNames.length > 0 &&
                            <div className="selected_names">
                                <CIcon icon={cilUserFollow} style={{ marginRight: '3px', marginTop: "7px" }} className="icon_size_18  logo_color_text" />
                                {selectedNames.map((user) => (
                                    <div key={user._id} className="selected_name">
                                        <Link onClick={() => { setPage(2) }}>{user.name}</Link>
                                    </div>
                                ))}
                            </div>
                        }
                        {location &&
                            <div className="location_selected">
                                <CIcon icon={cilLocationPin} style={{ marginRight: '3px', marginTop: "3px" }} className="icon_size_20  logo_color_text" />
                                <Link onClick={() => { setPage(1); setListPlace(locationList); }}> {location.name} </Link>
                            </div>
                        }
                        <PostInput setText={setText} text={text} isLoading={isLoading} user={user} textRef={textRef} isShowImage={isShowImage}/>
                        {/* <div className="post_content" style={{ minHeight: `${isShowImage ? "110px" : "320px"}` }}>
                            <textarea autoFocus={true} disabled={isLoading} placeholder="Share something..." id="post_input" ref={textRef} maxLength={22000} value={text} style={{ minHeight: `${isShowImage ? "110px" : "320px"}` }} onChange={(e) => setText(e.target.value)} className="post_input" ></textarea>
                        </div> */}
                        {isShowImage && <MediaPreview medias={medias} setMedias={setMedias} setPage={setPage} setIsVisible={setIsVisible} />}

                    </div>
                    <div className="create_post_popup_footer">
                        <div className="create_post_popup_footer_button_set">
                            <div className="emoji_picker" ref={emojiPickerRef} style={{ bottom: isShowImage ? '1rem' : '1rem', left: isShowImage ? '3.5rem': '-18rem' }}>
                                {isShowPicker && <Picker className="picker" onEmojiClick={handleEmojiClick} searchDisabled={true} autoFocusSearch={false} skinTonesDisabled={false} previewConfig={{ showPreview: false }} height={200} />}
                            </div>
                            <Tooltip title="Add Emoji"><CIcon icon={cilSmile} className={classNames("icon_size_22", "icon_button", {
                                "active_color": activeButtons.has('emoji')
                            })} ref={emojiPickerIconRef} onClick={() => { setIsShowPicker((prev) => !prev); handleButtonClick("emoji"); }} /></Tooltip>
                            <Tooltip title="Add Image"><CIcon icon={cilImage} className={classNames("icon_size_22", "icon_button", {
                                "active_color": activeButtons.has('image')
                            // })} onClick={() => { setIsShowImage(!isShowImage); document.getElementById('post_input').focus(); handleButtonClick("image"); }} /></Tooltip>
                            })} onClick={() => { setIsShowImage(prev => !prev); handleButtonClick("image"); }} /></Tooltip>
                            <Tooltip title="Add Location"><CIcon icon={cilLocationPin} className={classNames("icon_size_22", "icon_button", {
                                "active_color": location
                            })} onClick={() => { setPage(1); }} /></Tooltip>
                            <Tooltip title="Tag People"><CIcon icon={cilTag} className={classNames("icon_size_22", "icon_button", {
                                "active_color": selectedNames.length > 0
                            })} onClick={() => { setPage(2); }} /></Tooltip>
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
                }
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                ref={alertRef}
                disableScrollLock
            >
                <DialogTitle id="alert-dialog-title">
                    {"Leaving Post Creation?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to leave? Your changes may not be saved.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleClose} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
