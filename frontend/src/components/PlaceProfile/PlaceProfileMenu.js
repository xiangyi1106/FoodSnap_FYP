import { Link } from 'react-router-dom';

export default function PlaceProfileMenu({ currentActive, setCurrentActive }) {
    return (
        <div className="profile_menu_wrap">
            <div className="profile_menu source-sans-3-bold" style={{ justifyContent: "center", gap: "15px" }}>
                <Link to={`/place/overview`} className={currentActive === 'overview' ? 'profile_menu_active' : 'logo_color_hover'} onClick={() => setCurrentActive("overview")}>
                    Overview
                </Link>
                <Link to={`/place/reviews`} className={currentActive === 'reviews' ? 'profile_menu_active' : 'logo_color_hover'} onClick={() => setCurrentActive("reviews")}>
                    Reviews
                </Link>
                <Link to={`/place/posts`} className={currentActive === 'posts' ? 'profile_menu_active' : 'logo_color_hover'} onClick={() => setCurrentActive("posts")}>
                    Related Posts
                </Link>
                <Link to={`/place/photos`} className={currentActive === 'photos' ? 'profile_menu_active' : 'logo_color_hover'} onClick={() => setCurrentActive("photos")}>
                    Photos
                </Link>
                <Link to={`/place/menu`} className={currentActive === 'menu' ? 'profile_menu_active' : 'logo_color_hover'} onClick={() => setCurrentActive("menu")}>
                    Menu
                </Link>
            </div>
        </div>
    );
}
