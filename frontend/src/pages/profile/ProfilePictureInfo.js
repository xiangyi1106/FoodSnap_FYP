import React, { useEffect, useRef, useState } from 'react';
import { handleImage } from '../../functions/handleImage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProfilePicture from './UpdateProfilePicture';
import Modal from '../../components/Modal/Modal';
import { follow, unfollow } from '../../functions/user'; // Import the follow/unfollow functions
import CIcon from '@coreui/icons-react';
import {
    cilUserFollow, cilThumbUp,
    cilZoomIn,
    cilZoomOut
} from '@coreui/icons';
import { PhotoProvider, PhotoView } from 'react-photo-view';

export default function ProfilePictureInfo({ profile, visitor, user, dispatch }) {
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
        try {
            const res = await follow(profile._id, user.token);
            // Update the local profile state to reflect the following status and increase the followers count
            setProfileData({
                ...profileData,
                follow: { ...profileData.follow, following: true },
                followersCount: profileData.followersCount + 1,
            });

            // dispatch({
            //     type: "UPDATE_FOLLOWERS",
            //     payload: {
            //         follower: res.sender,
            //     },
            // });

        } catch (error) {
            toast.error("Error following user, please try again");
        }

    };

    // Handle the unfollow action
    const handleUnfollow = async () => {
        try {
            await unfollow(profile._id, user.token);
            // Update the local profile state to reflect the unfollow status and decrease the followers count
            setProfileData({
                ...profileData,
                follow: { ...profileData.follow, following: false },
                followersCount: profileData.followersCount - 1,
                followers: profileData.followers?.filter((f) => f._id !== user.id),
            });
        } catch (error) {
            toast.error("Error unfollowing user, please try again");
        }

    };

    return (
        <div className='profile_picture_wrapper'>
            <div className='profile_picture_left'>
                <div className='profile_picture'>
                    <PhotoProvider
                        toolbarRender={({ onScale, scale }) => {
                            return (
                                <div style={{ display: 'flex', gap: '10px', color: '#fff' }}>
                                    {/* Zoom In Button */}
                                    <button
                                        style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                        }}
                                        onClick={() => onScale(scale + 1)}
                                    >
                                        <CIcon icon={cilZoomIn} className="icon_size_20" />

                                    </button>
                                    {/* Zoom Out Button */}
                                    <button
                                        style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                        }}
                                        onClick={() => onScale(scale - 1)}
                                    >
                                        <CIcon icon={cilZoomOut} className="icon_size_20" />
                                    </button>
                                </div>
                            );
                        }}
                    >
                        <PhotoView src={profileData.picture}>
                            <div className='profile_picture_bg'
                                ref={pRef}
                                style={{ backgroundSize: "cover", backgroundImage: `url(${profileData.picture})` }}>
                            </div>
                        </PhotoView>
                    </PhotoProvider>
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
                                    style={{ backgroundColor: '#30BFBF' }}
                                    onClick={() => setVisible(true)}
                                >
                                    <img src="../../../icons/unfollowOutlined.png" alt="" />
                                    Following
                                </div>
                            ) : (
                                <div
                                    className="open_cover_menu_item hover_style_1"
                                    style={{ backgroundColor: '#30BFBF' }}
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
