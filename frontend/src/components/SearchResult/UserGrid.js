import React from "react";
import "./UserList.css";
import { Link } from "react-router-dom";

const UserGrid = ({ userlists, title, subtitle, activeTab }) => {
    return (
        <div className="userlists-section">
            <h2 className="userlists-title">{title}</h2>
            <p className="userlists-subtitle">{subtitle}</p>
            <div className="usergrid-cards">
                {userlists && userlists.length > 0 && (
                    userlists.map((userlist, index) => (
                        <Link to={`/profile/${userlist.username}`}>
                            <div key={index} className="userlist-card">
                                <img src={userlist.picture} alt={userlist.username} className="userlist-image" />
                                <div className="userlist-info">
                                    <p className="userlist-title">{userlist.name}</p>
                                    <p className="userlist-creator">@{userlist.username}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            {userlists.length === 0 && <p style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>No users found.</p>}
        </div>
    );
};

export default UserGrid;
