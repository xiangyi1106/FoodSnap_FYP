import React, { useState, useEffect, useRef } from 'react';
import './Notifications.css';
import { getNotifications, markNotificationAsRead } from '../../functions/user';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import useClickOutside from '../../helpers/clickOutside';

export default function Notification({
  userId,
  token,
  setNotificationNumber,
  setIsShowNotifications,
  searchIconRef,
  notifications,
  setNotifications
}) {
  const notificationMenu = useRef(null);
  useClickOutside(notificationMenu, [searchIconRef], () => setIsShowNotifications(false));

  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      const res = await markNotificationAsRead(notificationId, token);

      // Update state with the new notification status
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === res._id ? res : n
        )
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  return (
    <div className="notifications" ref={notificationMenu}>
      <h2 className="notifications-title">Notifications</h2>
      <div className="notification-list">
        {notifications && notifications.length > 0 && notifications.map((n) => {
          // If it's a 'new_follower' type notification, wrap it in a Link to the profile
          if (n.type === 'new_follower') {
            return (
              <Link to={`/profile/${n.fromUserId.username}`} key={n._id} className="notification-link">
                <div
                  className={`notification-card ${n.isRead ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(n._id)}
                >
                  <div className="notification-header">
                    <div className="notification-icon">
                      <i className={`icon ${n.isRead ? 'icon-read' : 'icon-unread'}`}></i>
                    </div>
                    <div className="notification-status">
                      {n.isRead ? (
                        <span className="status-read">Read</span>
                      ) : (
                        <span className="status-unread">New</span>
                      )}
                    </div>
                  </div>
                  <div className='notification-section'>
                    <Avatar
                      alt={n.fromUserId.name}
                      src={n.fromUserId.picture}
                      sx={{ width: 30, height: 30 }}
                    />
                    <div className="notification-message">
                      <p>{n.message}</p>
                    </div>
                  </div>
                  <div className="notification-footer">
                    <small>{new Date(n.createdAt).toLocaleString()}</small>
                  </div>
                </div>
              </Link>
            );
          }

          // If it has a postId, wrap it in a Link to the post
          if (n.postId) {
            return (
              <Link to={`/post/${n.postId}`} key={n._id} className="notification-link">
                <div
                  className={`notification-card ${n.isRead ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(n._id)}
                >
                  <div className="notification-header">
                    <div className="notification-icon">
                      <i className={`icon ${n.isRead ? 'icon-read' : 'icon-unread'}`}></i>
                    </div>
                    <div className="notification-status">
                      {n.isRead ? (
                        <span className="status-read">Read</span>
                      ) : (
                        <span className="status-unread">New</span>
                      )}
                    </div>
                  </div>
                  <div className='notification-section'>
                    <Avatar
                      alt={n.fromUserId.name}
                      src={n.fromUserId.picture}
                      sx={{ width: 30, height: 30 }}
                    />
                    <div className="notification-message">
                      <p>{n.message}</p>
                    </div>
                  </div>
                  <div className="notification-footer">
                    <small>{new Date(n.createdAt).toLocaleString()}</small>
                  </div>
                </div>
              </Link>
            );
          }

          // If there's no postId or type 'new_follower', just display the notification without a link
          return (
            <div
              key={n._id}
              className={`notification-card ${n.isRead ? 'read' : 'unread'}`}
              onClick={() => markAsRead(n._id)}
            >
              <div className="notification-header">
                <div className="notification-icon">
                  <i className={`icon ${n.isRead ? 'icon-read' : 'icon-unread'}`}></i>
                </div>
                <div className="notification-status">
                  {n.isRead ? (
                    <span className="status-read">Read</span>
                  ) : (
                    <span className="status-unread">New</span>
                  )}
                </div>
              </div>
              <div className='notification-section'>
                <Avatar
                  alt={n.fromUserId.name}
                  src={n.fromUserId.picture}
                  sx={{ width: 30, height: 30 }}
                />
                <div className="notification-message">
                  <p>{n.message}</p>
                </div>
              </div>
              <div className="notification-footer">
                <small>{new Date(n.createdAt).toLocaleString()}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
