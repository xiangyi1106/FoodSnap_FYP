import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DiscoverPostList from "../../pages/Discover/DiscoverPostList";
import { useLocation } from "react-router-dom";

export default function PublicFeed({ user, dispatch }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getPublicPosts`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const rawPosts = response.data;

        // Process posts to add `hasLiked` property
        const processedPosts = rawPosts.map((post) => ({
          ...post,
          hasLiked: post.likes.some((like) => like._id === user.id),
        }));

        setPosts(processedPosts);
      } catch (error) {
        toast.error("Error fetching posts: " + error.message);
      }
    };

    fetchPosts();
  }, []);

  const location = useLocation();

  // Extract the current path to determine the active menu item
  const currentPath = location.pathname;

  return (
    <div className="feed_middle" style={{ minHeight: "100vh" }}>
      <div className="public_feed_middle" style={{ overflowY: "auto" }}>
        <DiscoverPostList
          posts={posts}
          user={user}
          setPosts={setPosts}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}
