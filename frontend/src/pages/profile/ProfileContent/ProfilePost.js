import axios from 'axios';
import React from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import Post from '../../../components/post';

export default function ProfilePost({user}) {
    const { profile } = useOutletContext();
    return (
        <div className="posts">
            {profile.posts && profile.posts.length ? (
                profile.posts.map((post) => (
                    <Post post={post} user={user} key={post._id} profile />
                ))
            ) : (
                <div className="no_posts">No posts available</div>
            )}
        </div>
    )
}
