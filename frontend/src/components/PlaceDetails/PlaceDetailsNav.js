import { Link, useLocation } from 'react-router-dom';

export default function PlaceDetailsNav({ items }) {
    const location = useLocation();
    
    // Extract the current path to determine the active menu item
    const currentPath = location.pathname;

    return (
        <div className="profile_menu_wrap">
            <div className="profile_menu source-sans-3-bold" style={{ justifyContent: "center", gap: "20px" }}>
                {items.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={currentPath === item.href ? 'profile_menu_active' : 'logo_color_hover'}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
