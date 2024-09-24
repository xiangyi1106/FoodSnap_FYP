import Header from "../../components/header";
import Photos from "./Photos";
import ProfilePictureInfo from "./ProfilePictureInfo";
import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { profileReducer } from "../../functions/reducers";
import axios from "axios";
import Cover from "./Cover";
import ProfileMenu from "./ProfileMenu";
import Post from "../../components/post";
import { getUserSelector } from "../../helpers/selectors";
import Intro from "../../components/intro";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);
  const [photos, setPhotos] = useState({});
  var userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName]);

  var visitor = userName === user.username ? false : true;
  const [othername, setOthername] = useState();
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <div className="profile">
      <Header />
      <div className="profile_top">
        <div className="profile_container">
          <Cover visitor={visitor} cover={profile.cover} />
          <ProfilePictureInfo profile={profile} visitor={visitor} user={user} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <div className="profile_grid">
              <div className="profile_left">
                <Intro
                  detailss={profile.details}
                  visitor={visitor}
                  setOthername={setOthername}
                />
                <Photos
                  username={userName}
                  token={user.token}
                  photos={photos}
                />
                <div className="relative_copyright" style={{ display: isMobile ? 'none' : '' }}>
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Cookies</Link> <span>. </span>
                  FoodSnap © 2024
                </div>
              </div>
              <div className="profile_right">
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
