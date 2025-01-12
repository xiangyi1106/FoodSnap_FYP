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
import ProfilePost from "./pages/profile/ProfileContent/ProfilePost";
import ProfileIntroCarousel from "./pages/profile/ProfileContent/ProfileIntro";
import ProfilePhoto from "./pages/profile/ProfileContent/ProfilePhoto";
import ProfileFollowing from "./pages/profile/ProfileContent/ProfileFollowing";
import ProfileFollower from "./pages/profile/ProfileContent/ProfileFollower";
import ProfileFoodMap from "./pages/profile/ProfileContent/ProfileFoodMap";
import ProfileVoucher from "./pages/profile/ProfileContent/ProfileVoucher";
import SearchResult from "./pages/searchResult/SearchResult";
import PlaceProfileEvents from "./components/PlaceProfile/PlaceProfileEvents";
import PlaceProfilePromotions from "./components/PlaceProfile/PlaceProfilePromotions";
import WishlistPlaceDetailsLayout from "./pages/PlaceDetails/WishlistPlaceDetailsLayout";
import FeedComment from "./components/post/FeedComment";
import PostPopup from "./components/post/PostPopup";
import ProfileSavedPost from "./pages/profile/ProfileContent/ProfileSavedPost";

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

  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true);

  const [{ loading, error, posts }, dispatch] = useReducer(postReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    if (user) {
      getAllPosts(page); // Fetch posts for the current page
    }
  }, [page]);

  useEffect(() => {
    if (user) {
      dispatch({ type: 'RESET_POSTS' });
      getAllPosts(page); // Fetch posts for the current page
    }
  }, [user, user?.id]);


  const getAllPosts = async (currentPage) => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        // `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Sort posts by createdAt after fetching
      const sortedPosts = currentPage === 1
        ? data // if it's the first page, just take the posts as they are
        : [...posts, ...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // sort on subsequent pages

      dispatch({
        type: "POSTS_SUCCESS",
        // payload: currentPage === 1 ? data : [...posts, ...data], // Append new posts
        payload: sortedPosts, // Pass the sorted posts
      });
      // if (data.length === 0 || data.length < 10) {
      //   setHasMore(false); // Stop fetching when there are no more posts
      // }

      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message || 'Error fetching posts',
      });
    }
  };
  
  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1); // Fetch next page when user scrolls down
    console.log('Page', page)
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
        </Route>
        <Route element={<LoginRoutes />}>
          <Route path="/post/:id/:mediaIndex" element={<PostDetailsPage user={user} dispatch={dispatch} />} exact />
          <Route path="/post/:id" element={<PostPopup user={user} />} />
          <Route
            path="/profile/:username"
            element={<Profile />}
          >
            <Route index element={<ProfilePost user={user} dispatch={dispatch} />} />
            <Route path="intro" element={<ProfileIntroCarousel />} />
            <Route path="photos" element={<ProfilePhoto />} />
            <Route path="following" element={<ProfileFollowing />} />
            <Route path="followers" element={<ProfileFollower />} />
            <Route path="myFoodMap" element={<ProfileFoodMap />} />
            <Route path="myVoucher" element={<ProfileVoucher />} />
            <Route path="savedPost" element={<ProfileSavedPost user={user}/>} />
          </Route>

          <Route path="/settings" element={<Settings />}>
            <Route index element={<SettingsPage user={user} />} />
            <Route path="password" element={<PasswordSettingsPage />} />
          </Route>
          <Route path="/foodVenue/:id" element={<PlaceDetailsLayout user={user} />}>
            <Route index element={<PlaceProfileOverview />} />
            <Route path="reviews" element={<PlaceProfileReview user={user} />} />
            <Route path="photos" element={<PlaceProfilePhotos user={user} />} />
            <Route path="menu" element={<PlaceProfileFoodMenu />} />
            <Route path="posts" element={<PlaceProfileRelatedPost user={user} />} />
            <Route path="events" element={<PlaceProfileEvents user={user} />} />
            <Route path="promotions" element={<PlaceProfilePromotions user={user} />} />
          </Route>
          <Route path="/foodVenueWishlist/:id" element={<WishlistPlaceDetailsLayout user={user} />}>
            <Route index element={<PlaceProfileOverview />} />
            <Route path="reviews" element={<PlaceProfileReview user={user} />} />
            <Route path="photos" element={<PlaceProfilePhotos user={user} />} />
            <Route path="menu" element={<PlaceProfileFoodMenu />} />
            <Route path="posts" element={<PlaceProfileRelatedPost user={user} />} />
            <Route path="events" element={<PlaceProfileEvents user={user} />} />
            <Route path="promotions" element={<PlaceProfilePromotions user={user} />} />
          </Route>
          <Route path="/" element={<Layout user={user} />}>
            {/* <Route index element={<Feed posts={posts} user={user} />} /> */}
            <Route index element={<Feed posts={posts} user={user} fetchMorePosts={fetchMorePosts} hasMore={hasMore} dispatch={dispatch} />} />
            <Route path="discover" element={<PublicFeed user={user} dispatch={dispatch} />} />
            <Route path="searchVenue" element={<SearchVenue user={user} />} />
            <Route path="myFoodJourney" element={<VisitedPlaceLayout user={user} dispatch={dispatch} />} />
            <Route path="foodVenueWishlist" element={<MyFoodMap user={user} />} />
            <Route path="foodEvent" element={<FoodEvent user={user} />} />
            <Route path="foodPromotion" element={<FoodPromotion user={user} />} />
            <Route path="searchResult/:term" element={<SearchResult user={user} dispatch={dispatch} />} />
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
