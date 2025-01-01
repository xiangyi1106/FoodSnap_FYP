import Header from "../../components/header";
import Photos from "./Photos";
import ProfilePictureInfo from "./ProfilePictureInfo";
import "./style.css";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
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
import ProfileSidebar from "./ProfileSidebar";
import ProfileFoodMapList from "./ProfileContent/ProfileFoodMapList";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ProfileFoodMapAddVenue from "./ProfileContent/ProfileFoodMap/ProfileFoodMapAddVenue";
import { getFoodVenuesMap } from "../../functions/foodVenueMap";
import ProfileSkeleton from "../../components/Skeleton/ProfileSkeleton";
import { HashLoader } from "react-spinners";

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
      console.log(data);
      if (data.ok === false) {
        navigate(`/profile/${userName}`);
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max, user },
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
  const location = useLocation();
  const isMyFoodMap = location.pathname === `/profile/${username}/myFoodMap`; // Check if the route is '/myfoodmap'
  const [visible, setVisible] = useState(false);
  const [foodVenuesMap, setFoodVenuesMap] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchFoodVenues = async () => {
      try {
        if (profile && profile._id) {
          const response = await getFoodVenuesMap(user, profile._id);
          if (response.success) {
            setFoodVenuesMap(response.foodVenues || []);
          }
          console.log(response.foodVenues);
        } else {
          console.log("Profile ID is undefined or missing.");
        }
      } catch (error) {
        console.log("Error fetching food venues for my food map: " + error.message);
        setFoodVenuesMap([]);
      }

    };

    fetchFoodVenues();
  }, [user, profile]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage); // Update the current page
  };

  const paginatedFoodVenues = foodVenuesMap.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div className="profile">
      <Header profile />
      <div className="profile_top">
        <div className="profile_container">
          {visible && <ProfileFoodMapAddVenue setVisible={setVisible} user={user} setFoodVenuesMap={setFoodVenuesMap} />}
          {loading ? <ProfileSkeleton visitor={visitor} /> :
            <>
              <Cover visitor={visitor} cover={profile.cover} />
              <ProfilePictureInfo profile={profile} visitor={visitor} user={user} dispatch={dispatch} />
              {(isMyFoodMap || isMobile) && <ProfileMenu username={username} />}
            </>
          }
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="bottom_container">
            <div className="profile_grid">
              {/* <div className="profile_grid" style={{ gridTemplateColumns: '0.8fr 1fr' }}> */}
              <div className="profile_left">
                {!isMyFoodMap ?
                  <div>
                    {!isMobile && <ProfileSidebar username={username} />}
                    <div className="relative_copyright" style={{ display: isMobile ? 'none' : '' }}>
                      {/* <Link to="/">Privacy </Link>
                      <span>. </span>
                      <Link to="/">Terms </Link>
                      <span>. </span>
                      <Link to="/">Cookies</Link> <span>. </span> */}
                      FoodSnap © 2024
                    </div>
                  </div>
                  :
                  <div className='profile_card'>
                    <div className='profile_card_header'>
                      My Favorite Food Venue List
                    </div>
                    {loading ?
                      <>
                        <div className="skelton_loader">
                          <HashLoader color="#30BFBF" />
                        </div>
                      </> :
                      <ProfileFoodMapList
                        foodVenuesMap={foodVenuesMap}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                      />
                    }
                  </div>
                }
              </div>
              <div className="profile_right">
                <Outlet
                  context={{
                    profile,
                    photos,
                    foodVenuesMap: paginatedFoodVenues,
                    user,
                    dispatch,
                    visitor,
                    loading,
                  }}
                />
              </div>
              {isMyFoodMap && !isVisible &&
                <Fab
                  color="#30BFBF"
                  aria-label="add"
                  variant="extended"
                  style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                  }}
                  onClick={() => setVisible(true)}
                >
                  Add Food Venue <AddIcon />
                </Fab>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
