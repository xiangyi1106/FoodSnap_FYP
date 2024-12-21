import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import Post from '../../../components/post';

export default function ProfileSavedPost({user}) {
    const [isFeedCommentVisible, setIsFeedCommentVisible] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const handleShowFeedComment = (post) => {
        setSelectedPost(post);
        setIsFeedCommentVisible(true);
    };
    const { profile } = useOutletContext();
     // Provide a fallback for savedPosts
     const savedPosts = profile?.savedPosts || [];

    return (
        <div className="posts">
            {savedPosts.length > 0 ? (
                savedPosts.map((saved) => (
                    <Post post={saved.post} user={user} key={saved.post?._id} profile onShowFeedComment={handleShowFeedComment}/>
                ))
            ) : (
                <div className="no_posts">No posts available</div>
            )}
        </div>
    )
}
