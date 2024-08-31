import React, { useRef, useState } from 'react'
import { handleImage } from '../../functions/handleImage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProfilePicture from './UpdateProfilePicture';

export default function ProfilePictureInfo({ profile, visitor }) {
    const [show, setShow] = useState(false);
    const refInput = useRef(null);
    const pRef = useRef(null);
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        handleImage(file, setError, setImage); // Use the imported handleImage function
        setShow(true);
    };

    return (
        <div className='profile_picture_wrapper'>
            <div className='profile_picture_left'>
                <div className='profile_picture'>
                    {/* <div className='profile_picture_bg' style={{ backgroundSize: "cover", backgroundImage: "url(https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png)" }}> */}
                    <div className='profile_picture_bg' ref={pRef} style={{ backgroundSize: "cover", backgroundImage: `url(${profile.picture})` }}>
                    </div>
                    {!visitor && (
                        <div
                            className="profile_picture_bg_change_circle hover_style_1"
                            onClick={() => {refInput.current.click()}}
                        >
                            <input
                                type="file"
                                ref={refInput}
                                hidden
                                onChange={handleFileChange}
                                accept="image/jpeg,image/png,image/webp"
                            />
                            <i className="camera_filled_icon"></i>
                            {/* {error && (
                                <div className="postError comment_error">
                                {toast.error(error)} 
                              </div>
                            )} */}
                        </div>
                    )}
                </div>
                <div className='profile_col'>
                    <div className='profile_name'>
                        <span>{profile.name}</span>
                        <span>@{profile.username}</span>
                    </div>
                </div>
            </div>
            <div className='profile_picture_right'>
                <div className='profile_info'>
                    <span>{profile.postsCount}</span>
                    <span>Posts</span>
                </div>
                <div className='profile_info'>
                    <span>{profile.followersCount}</span>
                    <span>Followers</span>
                </div>
                <div className='profile_info'>
                    <span>{profile.followingCount}</span>
                    <span>Following</span>
                </div>
            </div>
            {image && show && (
            <UpdateProfilePicture
                setImage={setImage}
                image={image}
                setShow={setShow}
                setError={setError}
                pRef={pRef}
            />
            )}
        </div>

    )
}
