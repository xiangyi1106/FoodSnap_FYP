import React, { useEffect, useRef, useState } from 'react';
import { handleImage } from '../../functions/handleImage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProfilePicture from './UpdateProfilePicture';
import Modal from '../../components/Modal/Modal';
import { follow, unfollow } from '../../functions/user'; // Import the follow/unfollow functions
import CIcon from '@coreui/icons-react';
import { cilUserFollow, cilThumbUp
} from '@coreui/icons';

export default function ProfilePictureInfo({ profile, visitor, user }) {
    const [show, setShow] = useState(false);
    const refInput = useRef(null);
    const pRef = useRef(null);
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [profileData, setProfileData] = useState(profile); // Use profileData to manage local profile state
    const [visible, setVisible] = useState(false);

     // Sync profile data with props if they change
     useEffect(() => {
        if (profile) {
            setProfileData(profile);
        }
    }, [profile]);

    // Handle the image file change
    const handleFileChange = (e) => {
        let file = e.target.files[0];
        handleImage(file, setError, setImage); // Handle image upload
        setShow(true);
    };

    // Handle the follow action
    const handleFollow = async () => {
        await follow(profile._id, user.token);
        // Update the local profile state to reflect the following status and increase the followers count
        setProfileData({
            ...profileData,
            follow: { ...profileData.follow, following: true },
            followersCount: profileData.followersCount + 1,
        });
    };

    // Handle the unfollow action
    const handleUnfollow = async () => {
        await unfollow(profile._id, user.token);
        // Update the local profile state to reflect the unfollow status and decrease the followers count
        setProfileData({
            ...profileData,
            follow: { ...profileData.follow, following: false },
            followersCount: profileData.followersCount - 1,
        });
    };

    return (
        <div className='profile_picture_wrapper'>
            <div className='profile_picture_left'>
                <div className='profile_picture'>
                    <div className='profile_picture_bg' ref={pRef} style={{ backgroundSize: "cover", backgroundImage: `url(${profileData.picture})` }}></div>
                    {!visitor && (
                        <div
                            className="profile_picture_bg_change_circle hover_style_1"
                            onClick={() => { refInput.current.click(); }}
                        >
                            <input
                                type="file"
                                ref={refInput}
                                hidden
                                onChange={handleFileChange}
                                accept="image/jpeg,image/png,image/webp"
                            />
                            <i className="camera_filled_icon"></i>
                        </div>
                    )}
                </div>
                <div className='profile_col'>
                    <div className='profile_name'>
                        <span>{profileData.name}</span>
                        <span>@{profileData.username}</span>
                        {visitor && (
                            profileData?.follow?.following ? (
                                <div
                                    className="open_cover_menu_item hover_style_1"
                                    onClick={() => setVisible(true)}
                                >
                                    <img src="../../../icons/unfollowOutlined.png" alt="" />
                                    Following
                                </div>
                            ) : (
                                <div
                                    className="open_cover_menu_item hover_style_1"
                                    onClick={() => handleFollow()}
                                >
                                    <CIcon icon={cilUserFollow} className="icon_size_20" />
                                    <img src="../../../icons/followOutlined.png" alt="" />
                                    Follow
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className='profile_picture_right'>
                <div className='profile_info'>
                    <span>{profileData.postsCount}</span>
                    <span>Posts</span>
                </div>
                <div className='profile_info'>
                    <span>{profileData.followersCount}</span>
                    <span>Followers</span>
                </div>
                <div className='profile_info'>
                    <span>{profileData.followingCount}</span>
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
            {/* Unfollow confirmation modal */}
            <Modal
                title={'Unfollow'}
                content={`Are you sure you want to unfollow ${profileData.name}?`}
                btn1={'Cancel'}
                btn2={'Yes'}
                setVisible={setVisible}
                visible={visible}
                onConfirm={handleUnfollow} // Trigger unfollow when confirmed
            />
        </div>
    );
}
