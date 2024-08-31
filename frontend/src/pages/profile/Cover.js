import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import AddCoverPhotoMenu from './AddCoverPhotoMenu';
import useClickOutside from '../../helpers/clickOutside';
import { getUserSelector } from '../../helpers/selectors';
import useCropper from '../../functions/useCropper';
import { handleImage } from '../../functions/handleImage';
import Cropper from 'react-easy-crop';
import { toast } from 'react-toastify';
import { updateCover } from '../../functions/updateProfilePicture';
import { uploadMedias } from '../../functions/uploadMedia';
import getCroppedImg from '../../helpers/getCroppedImg';
import PulseLoader from "react-spinners/PulseLoader";

export default function Cover({ visitor, cover }) {
    const [showCoverMneu, setShowCoverMenu] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [coverPicture, setCoverPicture] = useState("");
    const user = useSelector(getUserSelector);
    const menuRef = useRef(null);
    const refInput = useRef(null);
    const cRef = useRef(null);

    const coverRef = useRef(null);

    //Set the cropper according to the cover width
    const [width, setWidth] = useState();
    useEffect(() => {
        setWidth(coverRef.current.clientWidth);
    }, [window.innerWidth]);
    
    useClickOutside(menuRef, [], () => setShowCoverMenu(false));

    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        handleImage(file, setError, setCoverPicture); // Use the imported handleImage function
        // setShow(true);
    };

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const getCroppedImage = useCallback(
        async (show) => {
            try {
                const img = await getCroppedImg(coverPicture, croppedAreaPixels);
                if (show) {
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                    setCoverPicture(img);
                } else {
                    return img;
                }
            } catch (error) {
                console.log(error);
            }
        },
        [croppedAreaPixels]
    );

    const updateCoverPicture = async () => {
        try {
            setLoading(true);
            let img = await getCroppedImage();
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/cover_pictures`;
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("path", path);

            const res = await uploadMedias(formData, path, user.token);

            const updated_picture = await updateCover(
                res[0].url,
                user.token
            );
            if (updated_picture === "ok") {
                setLoading(false);
                setCoverPicture("");
                cRef.current.src = res[0].url;
                toast.success("Cover picture is uploaded successfully!");
            } else {
                setLoading(false);
                toast.error("Failed to upload cover picture: " + updated_picture);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Failed to upload profile picture: " + error.message);
        }
    };

    return (
        <div className="profile_cover" ref={coverRef}>
            {coverPicture && (
                <div className="save_changes_cover">
                    <div className="save_changes_left">
                        <i className="public_icon"></i>
                        Your cover photo is public
                    </div>
                    <div className="save_changes_right">
                        <button
                            className="white_btn"
                            onClick={() => setCoverPicture("")}
                        >
                            Cancel
                        </button>
                        <button className="green_btn " onClick={() => updateCoverPicture()}>
                            {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
                        </button>
                    </div>
                </div>
            )}
            <input
                type="file"
                ref={refInput}
                hidden
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
            />
            {coverPicture && (
                <div className="cover_crooper">
                    <Cropper
                        image={coverPicture}
                        crop={crop}
                        zoom={zoom}
                        aspect={width / 350}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={true}
                        objectFit="horizontal-cover"
                    />
                </div>
            )}
            {cover && !coverPicture && (<img src={cover} className="cover" alt="profile_cover" ref={cRef}></img>)}
            {!visitor && (
                <div className="udpate_cover_wrapper">
                    <div
                        className="open_cover_update"
                        onClick={() => setShowCoverMenu((prev) => !prev)}
                    >
                        <i className="camera_filled_icon"></i>
                        Add Cover Photo
                    </div>
                    {showCoverMneu && (
                        <div className="open_cover_menu" ref={menuRef}>
                            <div
                                className="open_cover_menu_item hover_style_1"
                                onClick={() => refInput.current.click()}
                            >
                                <i className="upload_icon"></i>
                                Upload Photo
                            </div>
                            <div
                                className="open_cover_menu_item hover_style_1"
                                onClick={() => setShow(true)}
                            >
                                <i className="photo_icon"></i>
                                Remove Cover
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
