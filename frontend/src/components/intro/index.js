import { useEffect, useState } from "react";
// import Bio from "./Bio";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../helpers/selectors";
import EditProfile from "../../pages/profile/EditProfile/EditProfileLayout";
// import EditDetails from "./EditDetails";
export default function Intro({ detailss, visitor, setOthername }) {
    const user = useSelector(getUserSelector);

    const [details, setDetails] = useState();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setDetails(detailss);
        setInfos(detailss);
    }, [detailss]);
    const initial = {
        about: details?.about ? details.about : "",
        currentCity: details?.currentCity ? details.currentCity : "",
        favouriteFood: details?.favouriteFood ? details.favouriteFood : "",
        facebook: details?.facebook ? details.facebook : "",
        instagram: details?.instagram ? details.instagram : "",
    };
    const [infos, setInfos] = useState(initial);
    const [showBio, setShowBio] = useState(false);
    const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);

    const updateDetails = async () => {
        try {
            console.log("sent");
            //Updating a resource to a specific state.
            const { data } = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
                {
                    infos,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            setShowBio(false);
            setDetails(data);
            setOthername(data.otherName);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfos({ ...infos, [name]: value });
        setMax(100 - e.target.value.length);
    };
    return (
        <div className="profile_card">
            <div className="profile_card_header">Intro</div>
            {/* {details?.about && !showBio && (
                <div className="info_col">
                    <span className="info_text">{details?.about}</span>
                    {!visitor && (
                        <button
                            className="gray_btn hover1"
                            onClick={() => setShowBio(true)}
                        >
                            Edit about
                        </button>
                    )}
                </div>
            )} */}
            {/* {!details?.bio && !showBio && !visitor && (
                <button
                    className="gray_btn hover1 w100"
                    onClick={() => setShowBio(true)}
                >
                    Add Bio
                </button>
            )} */}
            {details?.currentCity && (
                <div className="info_profile">
                    <img src="../../../icons/home.png" alt="" />
                    Lives in {details?.currentCity}
                </div>
            )}
            <div className="info_profile_list">
                <div><img src={`${process.env.PUBLIC_URL}/intro_icons/equality.png`} alt="Icon" /></div>
                <div className="info_profile_list_text">Is a Female</div>
            </div>
            <div className="info_profile_list">
                <div><img src={`${process.env.PUBLIC_URL}/intro_icons/birthday-cake.png`} alt="Icon" /></div>
                <div className="info_profile_list_text">Born at 2002.04.07</div>
            </div>
            <div className="info_profile_list">
                <div><img src={`${process.env.PUBLIC_URL}/intro_icons/village.png`} alt="Icon" /></div>
                <div className="info_profile_list_text">Lives in Johor</div>
            </div>
            <div className="info_profile_list">
                <div><img src={`${process.env.PUBLIC_URL}/intro_icons/diet.png`} alt="Icon" /></div>
                <div className="info_profile_list_text">Likes Chocolate</div>
            </div>
            <div className="info_profile_list">
                <div><img src={`${process.env.PUBLIC_URL}/intro_icons/facebook.png`} alt="Icon" /></div>
                <div className="info_profile_list_text">Amy Chang</div>
            </div>
            <div className="info_profile_list">
                <div><img src={`${process.env.PUBLIC_URL}/intro_icons/instagram.png`} alt="Icon" /></div>
                <div className="info_profile_list_text">AmyChang_0407</div>
            </div>
            {details?.favouriteFood && (
                <div className="info_profile">
                    <img src="../../../icons/home.png" alt="" />
                    From {details?.favouriteFood}
                </div>
            )}
            {details?.facebook && (
                <div className="info_profile">
                    <img src="../../../icons/instagram.png" alt="" />
                    <a
                        href={`https://www.instagram.com/${details?.facebook}`}
                        target="_blank"
                    >
                        {details?.facebook}
                    </a>
                </div>
            )}

            {details?.instagram && (
                <div className="info_profile">
                    <img src="../../../icons/instagram.png" alt="" />
                    <a
                        href={`https://www.instagram.com/${details?.instagram}`}
                        target="_blank"
                    >
                        {details?.instagram}
                    </a>
                </div>
            )}
            {!visitor && (
                <button
                    className="green_btn hover1 w100"
                    onClick={() => setVisible(true)}
                >
                    Edit Details
                </button>
            )}
            {/* {visible && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )} */}
            {visible && <EditProfile setVisible={setVisible} />}
        </div>
    );
}
