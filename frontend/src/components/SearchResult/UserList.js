import React from "react";
import "./UserList.css";
import CIcon from "@coreui/icons-react";
import { cilArrowRight } from "@coreui/icons";
import { Link } from "react-router-dom";

const UserList = ({ userlists, title, subtitle, activeTab, setActiveTab }) => {
  const handleShowMore = () => setActiveTab("User");
  return (
    <div className="userlists-section">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2 className="userlists-title">{title}</h2>
          <p className="userlists-subtitle">{subtitle}</p>
        </div>
        {userlists && userlists.length > 10 && (
          <button onClick={handleShowMore} className="show-more-button">
            Show More <CIcon icon={cilArrowRight} className="icon_size_20"></CIcon>
          </button>
        )}
      </div>
      <div className="userlist-cards">
        {userlists && userlists.length > 0 && (
          userlists.map((userlist) => (
            <Link to={`/profile/${userlist.username}`} key={userlist.username}>
              <div className="userlist-card">
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

export default UserList;
