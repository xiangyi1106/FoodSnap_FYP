import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function ProfileSidebar() {
    const location = useLocation();
    
    // Extract the current path to determine the active menu item
    const currentPath = location.pathname;
    const items = [
        { name: 'intro', label: 'Intro', href: '/profile/intro' },
        { name: 'posts', label: 'Posts', href: '/profile' },
        { name: 'photos', label: 'Photos', href: '/profile/photos' },
        { name: 'following', label: 'Following', href: '/profile/following' },
        { name: 'followers', label: 'Followers', href: '/profile/followers' },
        { name: 'myfoodmap', label: 'My Food Map', href: '/profile/myfoodmap' },
    ];
    return (
        <div className='profile_card'>
            <div className='' style={{color: 'gray', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '10px'}}>My Profile</div>
            <div>
                <div className="">
                    <div className="source-sans-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", gap: "20px" }}>
                        {items.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={currentPath === item.href ? 'logo_color_text' : 'logo_color_hover'}
                                style={{fontSize: '0.95rem'}}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
