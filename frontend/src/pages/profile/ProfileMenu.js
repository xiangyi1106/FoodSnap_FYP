import { Link } from "react-router-dom";
import { Dots } from "../../svg";

export default function ProfileMenu() {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu source-sans-3-bold">
        <Link to="/" className="profile_menu_active">
          Posts
        </Link>
        <Link to="/" className="logo_color_hover">
          Following/Followers
        </Link>
        <Link to="/" className="logo_color_hover">
          Photos
        </Link>
        <Link to="/" className="logo_color_hover">
          Videos
        </Link>
        <Link to="/" className="logo_color_hover">
          Food Map
        </Link>
      </div>
    </div>
  );
}
