import { Link, useLocation } from "react-router-dom";
import { Dots } from "../../svg";

export default function ProfileMenu({ username }) {
  const location = useLocation();

  // Extract the current path to determine the active menu item
  const currentPath = location.pathname;
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu source-sans-3-bold">
        <Link to={`/profile/${username}/intro`} className={currentPath === `/profile/${username}/intro` ? 'logo_color_text' : 'logo_color_hover'}>
          Intro
        </Link>
        <Link to={`/profile/${username}`} className={currentPath === `/profile/${username}` ? 'logo_color_text' : 'logo_color_hover'}>
          Posts
        </Link>
        <Link to={`/profile/${username}/following`}className={currentPath === `/profile/${username}/following` ? 'logo_color_text' : 'logo_color_hover'}>
          Following
        </Link>
        <Link to={`/profile/${username}/followers`} className={currentPath === `/profile/${username}/followers` ? 'logo_color_text' : 'logo_color_hover'}>
          Followers
        </Link>
        <Link to={`/profile/${username}/photos`} className={currentPath === `/profile/${username}/photos` ? 'logo_color_text' : 'logo_color_hover'}>
          Photos
        </Link>
        <Link to={`/profile/${username}/myFoodMap`} className={currentPath === `/profile/${username}/myFoodMap` ? 'logo_color_text' : 'logo_color_hover'}>
          My Food Map
        </Link>
        <Link to={`/profile/${username}/myVoucher`} className={currentPath === `/profile/${username}/myVoucher` ? 'logo_color_text' : 'logo_color_hover'}>
          Voucher
        </Link>
      </div>
    </div>
  );
}
