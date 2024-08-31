import { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import useClickOutside from "../../helpers/clickOutside";
import LeftMenu from "../../components/home/LeftMenu";
import "./style.css";
import CreatePostPopUp from "../../components/createPostPopup";
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import Post from "../../components/post";
import SearchVenue from "../searchVenue";
import Feed from "../../components/post/Feed";
import MyFoodMap from "../myFoodMap";
import FoodEvent from "../foodEvent";
import FoodPromotion from "../foodPromotion";
import PublicFeed from "../../components/post/PublicFeed";
import { useMediaQuery } from "react-responsive";
import MobileBottomNavigation from "../../components/home/BottomNavigation";

export default function Home({ posts }) {
  const userSelector = (state) => state.user;
  const user = useSelector(userSelector);
  const [visible, setVisible] = useState(false);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [page, setPage] = useState("home");

  //Hide the outer scrollbar
  useEffect(() => {
    const mainContainer = document.querySelector('.home');
    if (page === 'searchVenue' || page === 'myFoodMap' || page === 'foodEvent') {
      mainContainer.classList.add('overflow_hidden');
    } else {
      mainContainer.classList.remove('overflow_hidden');
    }

    return () => {
      mainContainer.classList.remove('overflow_hidden');
    };
  }, [page]);

  // const middle = useRef(null);
  // const [height, setHeight] = useState();
  // useEffect(() => {
  //   setHeight(middle.current.clientHeight);
  // }, [height]);

  const width768 = useMediaQuery({
    query: "(max-width:769px)"
  });

  return (
    <div className="home">
      {isPostLoading && (
        <div className="loading-overlay">
          <CircularProgress className="logo_color_text" />
        </div>
      )}
      {visible && <CreatePostPopUp setVisible={setVisible} setIsPostLoading={setIsPostLoading} user={user} />}
      <Header setVisible={setVisible} visible={visible} page={page} />
      <LeftMenu page={page} setPage={setPage} />
      <div className="main_middle">
        {page === "home" && <Feed posts={posts} user={user} />}
        {page === "discover" && <PublicFeed />}
        {/* {page === "searchVenue" && <SearchVenue />} */}
        {/* {page === "myFoodMap" && <MyFoodMap />} */}
        {/* {page === "foodEvent" && <FoodEvent />} */}
        {/* {page === "foodPromotion" && <FoodPromotion />} */}
      </div>
      {width768 && <MobileBottomNavigation/>}
    </div>
  )
}
