import React from "react";
import Post from "../post";

const SearchPostList = ({ posts, title, subtitle, user, activeTab, dispatch, setSharesCount, setSelectedPost, setIsFeedCommentVisible, setIsShareVisible, setSelectedSharePost }) => {
    const handleShowFeedComment = (post) => {
        setSelectedPost(post);
        setIsFeedCommentVisible(true);
    };
    return (
        <div className="userlists-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="userlists-title">{title}</h2>
            {<p className="userlists-subtitle">{subtitle}</p>}
            <div className="userlist-cards" >
                {/* <div className="home_middle"> */}
                {posts && posts.length > 0 && (
                    <div className="posts">
                        {posts.map((post) => (
                            <Post key={post._id} post={post} user={user} onShowFeedComment={handleShowFeedComment} dispatch={dispatch} setSharesCount={setSharesCount} setIsShareVisible={setIsShareVisible} setSelectedSharePost={setSelectedSharePost} />
                        ))}
                    </div>
                )}
            </div>
            {posts.length === 0 && <p style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>No posts found.</p>}
        </div>

        // </div>
    );
};

export default SearchPostList;
