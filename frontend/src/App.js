import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoginRoutes from "./routes/LoginRoutes";
import NotLoginRoutes from "./routes/NotLoginRoutes";
import Register from "./pages/register";
import ResetPassword from "./pages/resetPassword";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { postReducer } from "./functions/reducers";
import { ToastContainer } from "react-toastify";
import FoodEvent from "./pages/foodEvent";
import Layout from "./pages/layout";
import Feed from "./components/post/Feed";
import PublicFeed from "./components/post/PublicFeed";
import SearchVenue from "./pages/searchVenue";
import MyFoodMap from "./pages/myFoodMap";
import FoodPromotion from "./pages/foodPromotion";
import EditProfile from "./pages/profile/EditProfile/EditProfileLayout";
import Settings from "./pages/Settings";
import PlaceDetails from "./components/PlaceProfile";
import PasswordSettingsPage from "./pages/Settings/Password/PasswordSettingsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import PlaceDetailsLayout from "./pages/PlaceDetails";
import PlaceProfileOverview from "./components/PlaceProfile/PlaceProfileOverview";
import PlaceProfileReview from "./components/PlaceProfile/PlaceProfileReview";
import PlaceProfilePhotos from "./components/PlaceProfile/PlaceProfilePhotos";
import PlaceProfileFoodMenu from "./components/PlaceProfile/PlaceProfileFoodMenu";
import PlaceProfileRelatedPost from "./components/PlaceProfile/PlaceProfileRelatedPost";
import VisitedPlaceLayout from "./pages/VisitedPlace/VisitedPlaceLayout";
import PostDetailsPage from "./pages/PostDetails";
import EventDetails from "./pages/foodEvent/eventDetails/EventDetails";
import PromotionDetails from "./pages/foodPromotion/PromotionDetails/PromotionDetails";

const useAxios = () => {
  const [isExpired, setIsExpired] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true, // To include cookies in the requests
  });

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === 'TokenExpiredError: jwt expired') {
          setIsExpired(true);
        }
      }
      return Promise.reject(error);
    }
  );

  return { axiosInstance, isExpired, setIsExpired };
};

function App() {
  const userSelector = (state) => state.user;
  const user = useSelector(userSelector);
  const [{ loading, error, posts }, dispatch] = useReducer(postReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    user && getAllPosts();
  }, [user]);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  const { axiosInstance, isExpired, setIsExpired } = useAxios();

  const handleLoginAgain = () => {
    setIsExpired(false);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/login'; // Adjust the route as necessary
  };

  return (
    <div>
      <Routes>
        <Route element={<NotLoginRoutes />}>
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/resetpassword" element={<ResetPassword />} exact />

          {/* <Route path="/place/:tab" element={<PlaceDetails />} /> */}
        </Route>
        <Route element={<LoginRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/post/:id/:initialIndex" element={<PostDetailsPage user={user}/>} exact />
          <Route
            path="/profile/:username"
            element={<Profile />}
            exact
          />
          <Route path="/settings" element={<Settings />}>
            <Route index element={<SettingsPage />} />
            <Route path="password" element={<PasswordSettingsPage />} />
          </Route>
          <Route path="/venue" element={<PlaceDetailsLayout />}>
            <Route index element={<PlaceProfileOverview />} />
            <Route path="reviews" element={<PlaceProfileReview user={user} />} />
            <Route path="photos" element={<PlaceProfilePhotos />} />
            <Route path="menu" element={<PlaceProfileFoodMenu />} />
            <Route path="posts" element={<PlaceProfileRelatedPost user={user} />} />
          </Route>
          <Route path="/" element={<Layout user={user} />}>
            <Route index element={<Feed posts={posts} user={user} />} />
            <Route path="discover" element={<PublicFeed user={user} />} />
            <Route path="searchVenue" element={<SearchVenue user={user}/>} />
            <Route path="myFoodJourney" element={<VisitedPlaceLayout user={user} />} />
            <Route path="myWishlistVenue" element={<MyFoodMap />} />
            <Route path="foodEvent" element={<FoodEvent />} />
            <Route path="foodPromotion" element={<FoodPromotion />} />
          </Route>
          <Route path="/foodEvent/:id/" element={<EventDetails user={user} />} exact />
          <Route path="/foodPromotion/:id/" element={<PromotionDetails user={user} />} exact />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
      {/* {isExpired && <ExpiredPopup onConfirm={handleLoginAgain} />} */}
    </div>);
}

export default App;
