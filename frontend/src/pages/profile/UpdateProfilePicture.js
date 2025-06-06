import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../functions/post";
import { updateprofilePicture } from "../../functions/updateProfilePicture";
import getCroppedImg from "../../helpers/getCroppedImg";
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from "js-cookie";
import { uploadMedias } from "../../functions/uploadMedia";
import { useNavigate } from 'react-router-dom'; // Import useHistory
import "./profilePicture.css";
import { toast } from "react-toastify";
import { toggleScroll } from "../../functions/fileUtils";

export default function UpdateProfilePicture({
    setImage,
    image,
    setError,
    setShow,
    pRef,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [description, setDescription] = useState("");
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const slider = useRef(null);
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const zoomIn = () => {
        slider.current.stepUp();
        setZoom(slider.current.value);
    };
    const zoomOut = () => {
        slider.current.stepDown();
        setZoom(slider.current.value);
    };
    const getCroppedImage = useCallback(
        async (show) => {
            try {
                const img = await getCroppedImg(image, croppedAreaPixels);
                if (show) {
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                    setImage(img);
                } else {
                    return img;
                }
            } catch (error) {
                console.log(error);
            }
        },
        [croppedAreaPixels]
    );
    const updateProfilePicture = async () => {
        try {
            setLoading(true);
            let img = await getCroppedImage();
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/profile_pictures`;
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("path", path);

            const res = await uploadMedias(formData, path, user.token);

            if (!res || !Array.isArray(res) || res.length === 0) {
                throw new Error('Media upload failed or returned invalid data.');
            }

            console.log('Uploaded medias response:', res);

            const updated_picture = await updateprofilePicture(
                res[0].url,
                user.token
            );
            if (updated_picture === "ok") {
                setLoading(false);
                setImage("");
                pRef.current.style.backgroundImage = `url(${res[0].url})`;
                toast.success("Profile picture is uploaded successfully!");
                // Set the cookie with the updated user object
                const updatedUser = {
                    ...user,
                    picture: res[0].url,
                };
                Cookies.set("user", JSON.stringify(updatedUser));
                console.log("Updated user cookie:", Cookies.get("user")); // Log to debug

                dispatch({
                    type: "UPDATEPICTURE",
                    payload: res[0].url,
                });
                setShow(false);
            } else {
                setLoading(false);
                toast.error("Failed to upload profile picture: " + updated_picture);
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
            toast.error("Failed to upload profile picture: " + error.message);
        }
    };

    // console.log(user);
    useEffect(() => {
        toggleScroll(true);
        return () => toggleScroll(false); // Re-enable scrolling on cleanup
    }, []);

    return (
        <div className="blur">
            <div className="postBox update_img">
                <div className="box_header">
                    <div className="small_circle" onClick={() => setImage("")}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Update profile picture</span>
                </div>

                <div className="update_center">
                    <div className="crooper">
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            showGrid={false}
                        />
                    </div>
                    <div className="slider">
                        <div className="slider_circle hover_style_1" onClick={() => zoomOut()}>
                            <i className="minus_icon"></i>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.2}
                            ref={slider}
                            value={zoom}
                            onChange={(e) => setZoom(e.target.value)}
                        />
                        <div className="slider_circle hover1" onClick={() => zoomIn()}>
                            <i className="plus_icon"></i>
                        </div>
                    </div>
                </div>

                <div className="flex_p_t">
                    <i className="public_icon"></i>
                    Your profile picture is public
                </div>
                <div className="update_submit_wrap">
                    <button className="white_btn" style={{marginTop: '12px'}}
                        onClick={() => setImage("")}>
                        Cancel
                    </button>
                    <button className="green_btn" disabled={loading} style={{marginTop: '12px'}}
                        onClick={() => updateProfilePicture()}>
                        {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
